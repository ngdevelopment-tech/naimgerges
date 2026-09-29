import React, { useState, useRef, useCallback, useEffect } from "react";
import { getAudioContext, unlockAudio } from "../../lib/sounds";

/**
 * Beat Lab — a free-play drum kit, built to be understood in one glance.
 *
 * Four large pads, each labeled with its drum and its color: Kick, Snare,
 * Hi-Hat, Clap. Tap them in any rhythm you like — every hit plays instantly
 * with a subtle scale animation, like tapping a real pad controller.
 * Keyboard: A S D F play the four pads.
 *
 * A metronome (optional, 70–170 BPM) helps first-timers keep time.
 * Every sound is synthesized live with WebAudio — no samples.
 */

type Track = "kick" | "snare" | "hat" | "clap";

const PADS: { id: Track; label: string; hint: string; color: string; glow: string; key: string }[] = [
  { id: "kick", label: "Kick", hint: "the deep one", color: "from-[#ff6b60] to-[#d93025]", glow: "shadow-[0_0_0_4px_rgba(255,107,96,0.35)]", key: "A" },
  { id: "snare", label: "Snare", hint: "the sharp one", color: "from-[#ffd76e] to-[#e0a010]", glow: "shadow-[0_0_0_4px_rgba(255,215,110,0.35)]", key: "S" },
  { id: "hat", label: "Hi-Hat", hint: "the tick", color: "from-[#6db5ff] to-[#1f7ae0]", glow: "shadow-[0_0_0_4px_rgba(109,181,255,0.35)]", key: "D" },
  { id: "clap", label: "Clap", hint: "hands together", color: "from-[#63e07f] to-[#1fa04a]", glow: "shadow-[0_0_0_4px_rgba(99,224,127,0.35)]", key: "F" },
];

function playVoice(ctx: AudioContext, master: GainNode, track: Track, when: number, vel = 1) {
  const g = ctx.createGain();
  g.connect(master);

  if (track === "kick") {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(150, when);
    osc.frequency.exponentialRampToValueAtTime(42, when + 0.12);
    g.gain.setValueAtTime(0.95 * vel, when);
    g.gain.exponentialRampToValueAtTime(0.001, when + 0.34);
    osc.connect(g);
    osc.start(when);
    osc.stop(when + 0.36);
  } else if (track === "snare") {
    const len = Math.floor(ctx.sampleRate * 0.18);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 1.6);
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 1400;
    g.gain.setValueAtTime(0.5 * vel, when);
    g.gain.exponentialRampToValueAtTime(0.001, when + 0.18);
    noise.connect(hp);
    hp.connect(g);
    noise.start(when);
    const osc = ctx.createOscillator();
    const og = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(190, when);
    og.gain.setValueAtTime(0.24 * vel, when);
    og.gain.exponentialRampToValueAtTime(0.001, when + 0.1);
    osc.connect(og);
    og.connect(master);
    osc.start(when);
    osc.stop(when + 0.12);
  } else if (track === "hat") {
    const len = Math.floor(ctx.sampleRate * 0.06);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.4);
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 7500;
    g.gain.setValueAtTime(0.3 * vel, when);
    g.gain.exponentialRampToValueAtTime(0.001, when + 0.055);
    noise.connect(hp);
    hp.connect(g);
    noise.start(when);
  } else {
    [0, 0.012, 0.026].forEach((off, i) => {
      const len = Math.floor(ctx.sampleRate * 0.09);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let j = 0; j < len; j++) d[j] = (Math.random() * 2 - 1) * Math.pow(1 - j / len, 3);
      const noise = ctx.createBufferSource();
      noise.buffer = buf;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 1100;
      bp.Q.value = 1.4;
      const cg = ctx.createGain();
      cg.gain.setValueAtTime((i === 2 ? 0.42 : 0.22) * vel, when + off);
      cg.gain.exponentialRampToValueAtTime(0.001, when + off + 0.09);
      noise.connect(bp);
      bp.connect(cg);
      cg.connect(master);
      noise.start(when + off);
    });
  }
}

function playMetronomeTick(ctx: AudioContext, master: GainNode, when: number, accent: boolean) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = accent ? 1600 : 1100;
  g.gain.setValueAtTime(accent ? 0.14 : 0.08, when);
  g.gain.exponentialRampToValueAtTime(0.001, when + 0.05);
  osc.connect(g);
  g.connect(master);
  osc.start(when);
  osc.stop(when + 0.06);
}

const BeatLabApp: React.FC = () => {
  const [hit, setHit] = useState<Track | null>(null);
  const [lastLabel, setLastLabel] = useState<string | null>(null);
  const [metroOn, setMetroOn] = useState(false);
  const [tempo, setTempo] = useState(100);
  const [beat, setBeat] = useState(0);

  const outBusRef = useRef<{ ctx: AudioContext; gain: GainNode } | null>(null);
  const metroTimer = useRef<number | null>(null);
  const hitTimers = useRef<number[]>([]);

  const getOutBus = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return null;
    if (!outBusRef.current || outBusRef.current.ctx !== ctx) {
      const gain = ctx.createGain();
      gain.gain.value = 0.85;
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -10;
      comp.knee.value = 24;
      comp.ratio.value = 4;
      comp.attack.value = 0.003;
      comp.release.value = 0.18;
      gain.connect(comp);
      comp.connect(ctx.destination);
      outBusRef.current = { ctx, gain };
    }
    return outBusRef.current;
  }, []);

  const strike = useCallback(
    (track: Track, velocity = 1) => {
      unlockAudio();
      const ctx = getAudioContext();
      const bus = getOutBus();
      if (!ctx || !bus) return;
      playVoice(ctx, bus.gain, track, ctx.currentTime + 0.001, velocity);
      setHit(track);
      setLastLabel(PADS.find((p) => p.id === track)?.label ?? null);
      const t = window.setTimeout(() => setHit(null), 130);
      hitTimers.current.push(t);
      if (hitTimers.current.length > 8) hitTimers.current.shift();
    },
    [getOutBus]
  );

  // keyboard: A S D F
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const map: Record<string, Track> = { a: "kick", s: "snare", d: "hat", f: "clap" };
      const t = map[e.key.toLowerCase()];
      if (t) {
        e.preventDefault();
        strike(t);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [strike]);

  useEffect(
    () => () => {
      hitTimers.current.forEach((t) => window.clearTimeout(t));
      if (metroTimer.current) window.clearInterval(metroTimer.current);
    },
    []
  );

  // metronome
  useEffect(() => {
    if (!metroOn) {
      if (metroTimer.current) window.clearInterval(metroTimer.current);
      metroTimer.current = null;
      setBeat(0);
      return;
    }
    unlockAudio();
    const ctx = getAudioContext();
    const bus = getOutBus();
    if (!ctx || !bus) return;
    let count = 0;
    let next = ctx.currentTime + 0.1;
    const stepMs = 60000 / tempo / 2; // eighth notes
    const tick = () => {
      while (next < ctx.currentTime + 0.15) {
        const c = count % 4;
        playMetronomeTick(ctx, bus.gain, next, c === 0);
        const delay = Math.max(0, (next - ctx.currentTime) * 1000);
        const t = window.setTimeout(() => setBeat(c), delay);
        hitTimers.current.push(t);
        next += stepMs;
        count++;
      }
    };
    tick();
    metroTimer.current = window.setInterval(tick, 40);
    return () => {
      if (metroTimer.current) window.clearInterval(metroTimer.current);
      metroTimer.current = null;
    };
  }, [metroOn, tempo, getOutBus]);

  return (
    <div className="h-full flex flex-col bg-[#17181c] text-gray-200 overflow-hidden select-none">
      <div className="h-9 shrink-0" />

      {/* simple header */}
      <div className="shrink-0 px-4 md:px-6 pb-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-[17px] font-bold text-white leading-tight">Beat Lab</h1>
          <p className="text-[12px] text-gray-400">Tap the pads. Make a rhythm.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setMetroOn((m) => !m)}
            className={`px-3 py-1.5 rounded-full text-[11.5px] font-semibold transition-colors ${
              metroOn ? "bg-[#4da3ff] text-black" : "bg-white/[0.08] text-gray-300 hover:bg-white/[0.15]"
            }`}
          >
            Metronome {metroOn ? "on" : "off"}
          </button>
          {metroOn && (
            <div className="flex items-center gap-1.5 bg-white/[0.06] rounded-full px-3 py-1.5">
              <input
                type="range"
                min={70}
                max={170}
                value={tempo}
                onChange={(e) => setTempo(Number(e.target.value))}
                className="w-20 md:w-28 accent-[#4da3ff]"
              />
              <span className="text-[11.5px] tabular-nums text-gray-300 w-8">{tempo}</span>
            </div>
          )}
        </div>
      </div>

      {/* four big pads */}
      <div className="flex-1 min-h-0 px-4 md:px-6 pb-2 flex items-center justify-center">
        <div className="w-full max-w-xl grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
          {PADS.map((p) => (
            <button
              key={p.id}
              onPointerDown={(e) => {
                e.preventDefault();
                strike(p.id);
              }}
              aria-label={`${p.label} drum pad`}
              className={`relative aspect-square rounded-2xl bg-gradient-to-b ${p.color} text-white
                shadow-[0_10px_28px_rgba(0,0,0,0.45)] active:scale-[0.96] active:brightness-110
                transition-[transform,box-shadow,filter] duration-75 flex flex-col items-center justify-center
                ${hit === p.id ? `${p.glow} scale-[0.96] brightness-125` : ""}`}
            >
              <span className="text-[17px] md:text-[19px] font-extrabold tracking-tight drop-shadow">
                {p.label}
              </span>
              <span className="text-[10.5px] md:text-[11px] font-medium text-white/80 mt-0.5">
                {p.hint}
              </span>
              <span className="mt-2.5 w-7 h-7 rounded-lg bg-black/25 border border-white/25 flex items-center justify-center text-[11px] font-bold">
                {p.key}
              </span>
              {metroOn && beat === PADS.findIndex((x) => x.id === p.id) * 0 ? null : null}
            </button>
          ))}
        </div>
      </div>

      {/* bottom strip: what you're playing + tip */}
      <div className="shrink-0 px-4 md:px-6 pb-4 flex items-center justify-between gap-3">
        <span className="text-[12px] text-gray-400 truncate">
          {lastLabel ? (
            <>
              <span className="text-white font-semibold">{lastLabel}</span> just played
            </>
          ) : (
            "Hit a pad — or press A S D F on your keyboard"
          )}
        </span>
        <span className="text-[11px] text-gray-500 hidden sm:block">
          Every sound is synthesized live, in code
        </span>
      </div>
    </div>
  );
};

export default BeatLabApp;
