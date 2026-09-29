import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { RotateCcw, Volume2, VolumeX, Clock3, AlignLeft } from "lucide-react";
import { playKeyClick } from "../../lib/sounds";

/**
 * Typo — a monkeytype-style typing test that lives on Safari's start page.
 * Type the stream, watch WPM climb, chill.
 */

// Common English words (subset, frequency ordered-ish) — plenty of variety
// without shipping a dictionary.
const WORDS = `the be to of and a in that have I it for not on with he as you do at this but his by from they we say her she or an will my one all would there their what so up out if about who get which go me when make can like time no just him know take people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us is are was were been has had said each tell does set three still small large point end read need land home hand large must big high such follow act why ask men change went light kind off need house picture try us again animal mother world near build self earth father head stand own page should country found answer school grow study still learn plant cover food sun four state keep eye never last let thought city tree cross farm hard start might story saw far sea draw left late run press close night real life few north open seem together next white children begin got walk example ease paper often always music those both mark book letter until mile river car feet care second group carry took rain eat room friend began idea fish mountain stop once base hear horse cut sure watch color face wood main enough plain girl usual young ready above ever red list though feel talk bird soon body dog family direct leave song measure door product black short numeral class wind question happen complete ship area half rock order fire south problem piece told knew pass since top whole king space heard best hour better true during hundred five remember step early hold west ground interest reach fast verb sing listen table travel less morning ten simple several vowel toward war lay against pattern slow center love person money serve appear road map science rule govern pull cold notice voice fall power town fine certain fly unit lead cry dark machine note wait plan figure star box noun field rest correct able pound done beauty drive stood contain front teach week final gave green oh quick develop sleep warm free minute strong special mind behind clear tail produce fact street inch lot nothing course stay wheel full force blue object decide surface deep moon island foot yet busy test record boat common gold possible plane age dry wonder laugh thousand ago ran check game shape yes hot miss brought heat snow bed bring sit perhaps fill east weight language among`.split(/\s+/);

interface Char {
  char: string;
  state: "pending" | "correct" | "incorrect";
}

type Mode = "time" | "words";

const TIME_OPTIONS = [15, 30, 60];
const WORD_OPTIONS = [10, 25, 50];

function randomWords(count: number): string[] {
  const out: string[] = [];
  let last = "";
  for (let i = 0; i < count; i++) {
    let w = WORDS[Math.floor(Math.random() * WORDS.length)];
    while (w === last) w = WORDS[Math.floor(Math.random() * WORDS.length)];
    last = w;
    out.push(w);
  }
  return out;
}

interface Results {
  wpm: number;
  raw: number;
  accuracy: number;
  chars: { correct: number; incorrect: number; extra: number; missed: number };
}

const TypingGameApp: React.FC = () => {
  const [mode, setMode] = useState<Mode>("time");
  const [timeLimit, setTimeLimit] = useState(30);
  const [wordLimit, setWordLimit] = useState(25);
  const [target, setTarget] = useState<string[]>(() => randomWords(60));
  const [typed, setTyped] = useState<string[]>([""]); // per-word buffers
  const [wordIndex, setWordIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [results, setResults] = useState<Results | null>(null);
  const [soundOn, setSoundOn] = useState(true);
  const [best, setBest] = useState<number>(() => {
    const v = parseFloat(localStorage.getItem("typing-best-wpm") ?? "");
    return isNaN(v) ? 0 : v;
  });

  const hiddenInput = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef<number | null>(null);
  const keyCounts = useRef({ correct: 0, incorrect: 0, extra: 0 });

  const totalTypedWords = typed.length;
  const targetForRound = useMemo(
    () => (mode === "words" ? target.slice(0, wordLimit) : target),
    [mode, target, wordLimit]
  );

  const reset = useCallback(
    (newWords = true) => {
      if (newWords) setTarget(randomWords(80));
      setTyped([""]);
      setWordIndex(0);
      setRunning(false);
      setTimeLeft(mode === "time" ? timeLimit : wordLimit);
      setResults(null);
      startedAt.current = null;
      keyCounts.current = { correct: 0, incorrect: 0, extra: 0 };
      requestAnimationFrame(() => {
        const el = scrollRef.current;
        if (el) el.scrollTop = 0;
        hiddenInput.current?.focus();
      });
    },
    [mode, timeLimit, wordLimit]
  );

  // Reset when the mode/limit changes.
  useEffect(() => {
    reset(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, timeLimit, wordLimit]);

  // Timer
  useEffect(() => {
    if (!running || mode !== "time") return;
    const id = window.setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, mode]);

  // Finish when the clock runs out.
  useEffect(() => {
    if (mode === "time" && running && timeLeft === 0) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, running, mode]);

  const finish = useCallback(() => {
    setRunning(false);
    const elapsedSec = startedAt.current ? (performance.now() - startedAt.current) / 1000 : 1;
    const allTyped = typed.slice(0, wordIndex + 1).join(" ");
    const kc = keyCounts.current;
    const minutes = Math.max(elapsedSec, 1) / 60;
    const wpm = Math.max(0, Math.round(kc.correct / 5 / minutes));
    const raw = Math.round((kc.correct + kc.incorrect + kc.extra) / 5 / minutes);
    const total = kc.correct + kc.incorrect;
    const accuracy = total === 0 ? 100 : Math.round((kc.correct / total) * 100);

    setResults({ wpm, raw, accuracy, chars: { ...kc, missed: 0 } });
    if (wpm > best) {
      setBest(wpm);
      localStorage.setItem("typing-best-wpm", String(wpm));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typed, wordIndex, best]);

  // Words mode: finish when the last word is confirmed via space.
  const maybeFinishWords = useCallback(
    (nextTyped: string[], nextIndex: number) => {
      if (mode !== "words") return;
      if (nextIndex >= targetForRound.length) finish();
    },
    [mode, targetForRound.length, finish]
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (results) {
      if (e.key === "Enter") reset(true);
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      reset(true);
      return;
    }

    const word = targetForRound[wordIndex] ?? "";
    const buf = typed[wordIndex] ?? "";

    if (e.key === " ") {
      e.preventDefault();
      if (!running) start();
      if (buf.length === 0) return; // no empty-word skips
      if (soundOn) playKeyClick(true);
      const nextBufs = [...typed];
      nextBufs[wordIndex] = buf;
      const nextIndex = wordIndex + 1;
      if (nextIndex >= nextBufs.length) nextBufs.push("");
      setTyped(nextBufs);
      setWordIndex(nextIndex);
      maybeFinishWords(nextBufs, nextIndex);
      return;
    }

    if (e.key === "Backspace") {
      e.preventDefault();
      if (buf.length > 0) {
        const nextBufs = [...typed];
        nextBufs[wordIndex] = buf.slice(0, -1);
        setTyped(nextBufs);
      } else if (wordIndex > 0) {
        // step back into the previous word (monkeytype allows this)
        setWordIndex(wordIndex - 1);
      }
      return;
    }

    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      if (!running) start();
      if (soundOn) playKeyClick(false);
      const nextBufs = [...typed];
      const next = buf + e.key;
      nextBufs[wordIndex] = next;
      setTyped(nextBufs);
      // count correctness for accuracy stats
      const pos = buf.length;
      if (pos >= word.length) keyCounts.current.extra += 1;
      else if (word[pos] === e.key) keyCounts.current.correct += 1;
      else keyCounts.current.incorrect += 1;
      // words mode: typing the last letter of the last word finishes
      if (mode === "words" && wordIndex === targetForRound.length - 1 && next === word) {
        finish();
      }
    }
  };

  const start = () => {
    setRunning(true);
    startedAt.current = performance.now();
  };

  // Keep the active line centered while typing.
  useEffect(() => {
    const el = activeLineRef.current;
    const box = scrollRef.current;
    if (el && box) {
      const lineTop = el.offsetTop;
      const targetScroll = lineTop - box.clientHeight / 2 + el.clientHeight / 2;
      box.scrollTo({ top: Math.max(0, targetScroll), behavior: "smooth" });
    }
  }, [wordIndex]);

  // Focus the hidden input on mount; the container's onClick re-focuses.
  useEffect(() => {
    hiddenInput.current?.focus();
  }, []);

  const currentTime = mode === "time" ? timeLeft : `${totalTypedWords > wordIndex ? wordIndex + 1 : wordIndex}/${wordLimit}`;

  const liveWpm = useMemo(() => {
    if (!running || !startedAt.current) return 0;
    const minutes = (performance.now() - startedAt.current) / 60000;
    if (minutes <= 0) return 0;
    return Math.round(keyCounts.current.correct / 5 / minutes);
  }, [running, wordIndex, typed]);

  const renderWords = () => {
    const out: React.ReactNode[] = [];
    targetForRound.forEach((word, wi) => {
      const buf = wi < typed.length ? typed[wi] : "";
      const isDone = wi < wordIndex;
      const isActive = wi === wordIndex;
      const chars: Char[] = [];
      for (let i = 0; i < Math.max(word.length, buf.length); i++) {
        const expected = word[i];
        const got = buf[i];
        let state: Char["state"] = "pending";
        if (got !== undefined) {
          state = expected === got ? "correct" : "incorrect";
        }
        chars.push({ char: expected ?? got, state });
      }
      const nodes = chars.map((c, ci) => (
        <span
          key={ci}
          className={
            c.state === "correct"
              ? "text-[#e6b800]"
              : c.state === "incorrect"
              ? "text-[#ff5f57] underline decoration-[#ff5f57]/50"
              : "text-[#6b7280]"
          }
        >
          {c.char}
        </span>
      ));
      // Inline block caret: sits in the text flow at the typing position.
      if (isActive) {
        nodes.splice(
          Math.min(buf.length, nodes.length),
          0,
          <span
            key="caret"
            aria-hidden="true"
            className="caret-blink w-[2.5px] shrink-0 rounded-full bg-[#e6b800] self-stretch"
          />
        );
      }
      const hadError = isDone && buf !== word;
      out.push(
        <div
          key={wi}
          ref={isActive ? activeLineRef : undefined}
          className="inline-flex items-stretch mr-[0.9ch] mb-1.5 relative"
        >
          {nodes}
          {hadError && <span className="absolute -bottom-[3px] left-0 right-0 h-[2px] bg-[#ff5f57]/40 rounded" />}
        </div>
      );
    });
    return out;
  };

  return (
    <div
      className="h-full w-full bg-[#111213] text-[#d1d0c9] overflow-hidden relative select-none"
      onClick={() => hiddenInput.current?.focus()}
    >
      {/* Hidden input captures typing (mobile keyboards included) */}
      <input
        ref={hiddenInput}
        onKeyDown={onKeyDown}
        className="absolute opacity-0 pointer-events-none -z-10"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-label="Typing input"
      />

      <div className="h-full flex flex-col items-center overflow-y-auto px-6 md:px-10 py-4">
        <div className="w-full max-w-3xl m-auto">
          {/* Header: tagline */}
          <div className="flex items-center gap-2 mb-6 text-[#e6b800]">
            <span className="text-[15px] font-medium tracking-wide">
              Escape time by practicing typing here
            </span>
          </div>

          {/* Top bar: mode + live stats */}
          <div className="flex items-center justify-between mb-5 text-[13px]">
            <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
              <button
                onClick={() => setMode("time")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors ${
                  mode === "time" ? "bg-[#e6b800] text-[#111213]" : "text-[#6b7280] hover:text-[#d1d0c9]"
                }`}
              >
                <Clock3 size={13} /> time
              </button>
              <button
                onClick={() => setMode("words")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors ${
                  mode === "words" ? "bg-[#e6b800] text-[#111213]" : "text-[#6b7280] hover:text-[#d1d0c9]"
                }`}
              >
                <AlignLeft size={13} /> words
              </button>
            </div>

            <div className="flex items-center gap-3 tabular-nums">
              {running && (
                <span className="text-[#e6b800] font-semibold text-[15px]">{liveWpm} wpm</span>
              )}
              <span className="text-[#6b7280]">
                {mode === "time" ? `${currentTime}s` : `${currentTime}`}
              </span>
              {best > 0 && <span className="text-[#6b7280]/70 text-[12px]">best {best}</span>}
              <button
                onClick={() => setSoundOn((s) => !s)}
                className="text-[#6b7280] hover:text-[#d1d0c9] transition-colors"
                aria-label={soundOn ? "Mute keystroke sounds" : "Enable keystroke sounds"}
                title="Keystroke sounds"
              >
                {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
              </button>
              <button
                onClick={() => reset(true)}
                className="text-[#6b7280] hover:text-[#d1d0c9] transition-colors"
                aria-label="Restart test"
                title="Restart (Tab)"
              >
                <RotateCcw size={15} />
              </button>
            </div>
          </div>

          {/* Mode options */}
          <div className="flex items-center gap-2 mb-6 text-[12.5px] text-[#6b7280]">
            {mode === "time"
              ? TIME_OPTIONS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeLimit(t)}
                    className={`px-2 py-0.5 rounded-md transition-colors ${
                      timeLimit === t ? "text-[#e6b800] font-semibold" : "hover:text-[#d1d0c9]"
                    }`}
                  >
                    {t}
                  </button>
                ))
              : WORD_OPTIONS.map((w) => (
                  <button
                    key={w}
                    onClick={() => setWordLimit(w)}
                    className={`px-2 py-0.5 rounded-md transition-colors ${
                      wordLimit === w ? "text-[#e6b800] font-semibold" : "hover:text-[#d1d0c9]"
                    }`}
                  >
                    {w}
                  </button>
                ))}
          </div>

          {/* Words area / results */}
          <div className="relative min-h-[190px] md:min-h-[220px]">
            {results ? (
              <div className="animate-fade-in flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
                <div>
                  <div className="text-[13px] text-[#6b7280]">wpm</div>
                  <div className="text-[56px] md:text-[64px] leading-none font-bold text-[#e6b800] tabular-nums">
                    {results.wpm}
                  </div>
                  <div className="text-[13px] text-[#6b7280] mt-2">
                    raw {results.raw} · acc {results.accuracy}%
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-[13px] text-[#6b7280] tabular-nums pb-1">
                  <span>characters</span>
                  <span className="text-[#d1d0c9] text-right">
                    {results.chars.correct}/{results.chars.incorrect}/{results.chars.extra}
                  </span>
                  <span>correct</span>
                  <span className="text-[#d1d0c9] text-right">{results.chars.correct}</span>
                  <span>errors</span>
                  <span className="text-[#ff5f57] text-right">{results.chars.incorrect + results.chars.extra}</span>
                  {results.wpm >= best && results.wpm > 0 && (
                    <>
                      <span className="text-[#e6b800]">new best!</span>
                      <span className="text-right text-[#e6b800]">★</span>
                    </>
                  )}
                </div>
                <div className="md:ml-auto flex items-center gap-2 pb-1">
                  <button
                    onClick={() => reset(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#e6b800] text-[#111213] text-[13px] font-semibold hover:brightness-110 active:scale-95 transition-all"
                  >
                    <RotateCcw size={13} /> again
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* caret positioned after the active word's typed chars */}
                <div
                  ref={scrollRef}
                  className="overflow-hidden relative font-mono text-[19px] md:text-[23px] leading-[1.9]"
                  style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)" }}
                >
                  <div className="flex flex-wrap">
                    {renderWords()}
                  </div>
                </div>
                {!running && (
                  <div className="absolute -bottom-9 left-0 right-0 text-center text-[12px] text-[#6b7280] animate-pulse">
                    start typing to begin · Tab to restart
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingGameApp;
