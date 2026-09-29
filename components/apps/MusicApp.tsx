import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Volume1,
  VolumeX,
  Heart,
  Search,
} from "lucide-react";

/**
 * Track audio uses Apple's public 90-second preview URLs (openly accessible,
 * no key required). Artwork is rendered as inline SVG gradients with a
 * duotone treatment so covers NEVER fail to load — even fully offline.
 */

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  url: string;
  colors: [string, string, string];
}

const SONGS: Song[] = [
  {
    id: 1,
    title: "GOOD TIMES",
    artist: "Jungle",
    album: "Volcano",
    duration: 168,
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/0a/70/6c/0a706c51-193e-880b-dfd2-647d0dedd722/mzaf_13429811639487631943.plus.aac.p.m4a",
    colors: ["#ff6a3d", "#f7b267", "#2a1a3a"],
  },
  {
    id: 2,
    title: "Technologic",
    artist: "Daft Punk",
    album: "Human After All",
    duration: 215,
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/c5/65/a9/c565a958-f8e3-3a00-d99a-fb42df50dca8/mzaf_13181546683551457895.plus.aac.p.m4a",
    colors: ["#3d348b", "#7678ed", "#0d0c1d"],
  },
  {
    id: 3,
    title: "Born to Be Wild",
    artist: "Steppenwolf",
    album: "Steppenwolf",
    duration: 184,
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/79/1f/26/791f26bf-abc4-d9fc-4dd1-f93a27533059/mzaf_7059983360387846257.plus.aac.p.m4a",
    colors: ["#8b0000", "#e05a00", "#1a0f0a"],
  },
  {
    id: 4,
    title: "Purple Haze",
    artist: "Jimi Hendrix",
    album: "Are You Experienced",
    duration: 240,
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b7/80/2b/b7802b0e-3f41-19eb-5d39-84a3cfb4f3e3/mzaf_6077720049875644704.plus.aac.p.m4a",
    colors: ["#6a0dad", "#c77dff", "#12081f"],
  },
];

/** Inline SVG album art — deterministic per song, zero network. */
const CoverArt: React.FC<{ song: Song; className?: string }> = ({ song, className }) => (
  <svg
    viewBox="0 0 200 200"
    className={className}
    preserveAspectRatio="xMidYMid slice"
    aria-label={`${song.album} artwork`}
  >
    <defs>
      <linearGradient id={`g-${song.id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={song.colors[0]} />
        <stop offset="0.55" stopColor={song.colors[1]} />
        <stop offset="1" stopColor={song.colors[2]} />
      </linearGradient>
      <radialGradient id={`r-${song.id}`} cx="0.3" cy="0.2" r="1">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="200" fill={`url(#g-${song.id})`} />
    <rect width="200" height="200" fill={`url(#r-${song.id})`} />
    {[78, 62, 46].map((r) => (
      <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="1.5" />
    ))}
    <circle cx="100" cy="100" r="26" fill="#00000055" />
    <circle cx="100" cy="100" r="4" fill="#ffffff" opacity="0.85" />
    <text
      x="100"
      y="182"
      textAnchor="middle"
      fill="#ffffff"
      fillOpacity="0.9"
      fontSize="11"
      fontWeight="700"
      letterSpacing="2"
      style={{ textTransform: "uppercase" }}
    >
      {song.artist.toUpperCase()}
    </text>
  </svg>
);

const fmt = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const MusicApp: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [query, setQuery] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const song = SONGS[index];

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
    if (playing) {
      a.play().catch(() => setPlaying(false));
    } else {
      a.pause();
    }
  }, [playing, index, volume]);

  const onTimeUpdate = () => {
    const a = audioRef.current;
    if (a && a.duration) setProgress(a.currentTime);
  };

  const onEnded = useCallback(() => {
    setIndex((i) => (i + 1) % SONGS.length);
    setProgress(0);
  }, []);

  const seek = (e: React.PointerEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    a.currentTime = ratio * a.duration;
    setProgress(a.currentTime);
  };

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % SONGS.length);
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    const a = audioRef.current;
    if (a && a.currentTime > 3) {
      a.currentTime = 0;
      setProgress(0);
      return;
    }
    setIndex((i) => (i - 1 + SONGS.length) % SONGS.length);
    setProgress(0);
  }, []);

  const toggleLike = (id: number) => {
    setLiked((p) => {
      const n = new Set(p);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  const filtered = SONGS.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.artist.toLowerCase().includes(query.toLowerCase())
  );

  const VolIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className="h-full flex bg-white text-gray-900 select-none">
      <audio ref={audioRef} src={song.url} onTimeUpdate={onTimeUpdate} onEnded={onEnded} preload="metadata" />

      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex w-56 shrink-0 flex-col bg-[#f5f5f7] border-r border-black/5 pt-11">
        <div className="px-3 pb-4">
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full pl-8 pr-2 py-1.5 rounded-md bg-white border border-black/5 text-[13px] outline-none focus:ring-2 focus:ring-[#fa2b56]/25"
            />
          </div>
        </div>
        <div className="px-3 space-y-0.5">
          <div className="text-[11px] font-bold text-gray-400 px-2 mb-1 uppercase tracking-wide">Library</div>
          <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-md bg-black/5 text-[13px] font-medium text-[#fa2b56]">
            <Heart size={15} className="fill-current" /> Listen Now
          </div>
          <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] text-gray-600">
            <Volume2 size={15} className="text-gray-400" /> {SONGS.length} tracks
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-y-auto px-4 md:px-8 pt-[44px] md:pt-12 pb-28">
          {/* Hero banner — pure SVG, cannot fail */}
          <div className="rounded-2xl overflow-hidden relative shadow-lg mb-6 md:mb-8">
            <svg viewBox="0 0 800 220" className="w-full h-auto block" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="hero" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#fa2b56" />
                  <stop offset="0.5" stopColor="#ff6a3d" />
                  <stop offset="1" stopColor="#8b1e4f" />
                </linearGradient>
                <radialGradient id="heror" cx="0.25" cy="0.2" r="1.1">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0.3" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="800" height="220" fill="url(#hero)" />
              <rect width="800" height="220" fill="url(#heror)" />
              {[40, 80, 120, 160, 200, 240, 280, 320].map((x, i) => (
                <rect
                  key={x}
                  x={x}
                  y={150 - ((i * 37) % 90)}
                  width="26"
                  height={30 + ((i * 53) % 90)}
                  rx="6"
                  fill="#ffffff"
                  fillOpacity={0.14 + (i % 3) * 0.05}
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7 text-white">
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.12em] text-white/80">
                Featured Playlist
              </span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-1">Studio Selections</h2>
              <p className="text-white/85 text-[12px] md:text-sm mt-1">
                Four tracks on rotation — previews via Apple Music.
              </p>
            </div>
          </div>

          <h3 className="text-lg md:text-xl font-bold mb-4">Top Picks</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((s) => {
              const songIndex = SONGS.indexOf(s);
              const isCurrent = songIndex === index;
              return (
                <div
                  key={s.id}
                  className="group cursor-pointer"
                  onClick={() => {
                    if (isCurrent) {
                      setPlaying((p) => !p);
                    } else {
                      setIndex(songIndex);
                      setProgress(0);
                      setPlaying(true);
                    }
                  }}
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-md bg-gray-100">
                    <CoverArt song={s} className="absolute inset-0 w-full h-full" />
                    <div
                      className={`absolute inset-0 bg-black/35 flex items-center justify-center transition-opacity ${
                        isCurrent && playing ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      {isCurrent && playing ? (
                        <div className="flex items-end gap-[3px] h-5">
                          {[0, 1, 2, 3].map((i) => (
                            <span
                              key={i}
                              className="w-[3px] bg-white rounded-full animate-pulse"
                              style={{ height: `${8 + ((i * 7) % 12)}px`, animationDelay: `${i * 120}ms` }}
                            />
                          ))}
                        </div>
                      ) : (
                        <span className="w-11 h-11 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center">
                          <Play size={18} className="fill-white text-white ml-0.5" />
                        </span>
                      )}
                    </div>
                  </div>
                  <h4 className={`mt-2 text-[13px] font-semibold truncate ${isCurrent ? "text-[#fa2b56]" : ""}`}>
                    {s.title}
                  </h4>
                  <p className="text-[11.5px] text-gray-500 truncate">{s.artist}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mini player */}
        <div className="absolute bottom-0 left-0 right-0 h-[76px] md:h-[84px] border-t border-black/5 bg-[#fafafc]/95 backdrop-blur-xl flex items-center px-3 md:px-5 gap-3 md:gap-5 z-10">
          <div className="flex items-center gap-3 min-w-0 w-[38%] md:w-1/3">
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-lg overflow-hidden shadow-sm shrink-0">
              <CoverArt song={song} className="w-full h-full" />
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-semibold truncate">{song.title}</div>
              <div className="text-[11.5px] text-gray-500 truncate">{song.artist}</div>
            </div>
            <button
              onClick={() => toggleLike(song.id)}
              className={`ml-1 hidden sm:block transition-colors ${
                liked.has(song.id) ? "text-[#fa2b56]" : "text-gray-300 hover:text-gray-500"
              }`}
              aria-label="Like"
            >
              <Heart size={16} className={liked.has(song.id) ? "fill-current" : ""} />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center min-w-0">
            <div className="flex items-center gap-5 md:gap-7">
              <button
                onClick={prev}
                className="text-gray-500 hover:text-gray-900 active:scale-95 transition-transform"
                aria-label="Previous"
              >
                <SkipBack size={19} className="fill-current" />
              </button>
              <button
                onClick={() => setPlaying((p) => !p)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center active:scale-95 transition-all"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  <Pause size={18} className="fill-gray-900 text-gray-900" />
                ) : (
                  <Play size={18} className="fill-gray-900 text-gray-900 ml-0.5" />
                )}
              </button>
              <button
                onClick={next}
                className="text-gray-500 hover:text-gray-900 active:scale-95 transition-transform"
                aria-label="Next"
              >
                <SkipForward size={19} className="fill-current" />
              </button>
            </div>
            <div className="w-full max-w-[340px] flex items-center gap-2 mt-1">
              <span className="text-[10px] text-gray-400 w-8 text-right tabular-nums">{fmt(progress)}</span>
              <div className="flex-1 h-1 rounded-full bg-gray-200 relative cursor-pointer group/scrub" onPointerDown={seek}>
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-gray-400 group-hover/scrub:bg-[#fa2b56] transition-colors"
                  style={{ width: `${Math.min(100, (progress / song.duration) * 100)}%` }}
                />
              </div>
              <span className="text-[10px] text-gray-400 w-8 tabular-nums">{fmt(song.duration)}</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 w-1/3 justify-end">
            <VolIcon size={15} className="text-gray-400" />
            <div
              className="w-24 h-1 rounded-full bg-gray-200 relative cursor-pointer"
              onPointerDown={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setVolume(Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)));
              }}
            >
              <div className="absolute left-0 top-0 h-full rounded-full bg-gray-500" style={{ width: `${volume * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicApp;
