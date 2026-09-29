/**
 * Small WebAudio engine for system sounds.
 *
 * Bundled samples always win when present (drop files into public/assets/):
 *   - startup.mp3|wav   the real Mac startup chime
 *   - facetime-ring     one ring cycle of the FaceTime ringtone
 *   - facetime-connect  the pickup pop
 *   - facetime-end      the end-call tone
 * Anything missing falls back to a hand-tuned WebAudio synthesis so the
 * experience never goes silent.
 *
 * Browsers only allow audio after a user gesture, so the context is created
 * lazily on the first interaction and unlocked explicitly from the lock
 * screen (where the first click/keypress happens).
 */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let systemVolume = 0.7;

function ensureContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext || (window as any).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) {
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = systemVolume;
    master.connect(ctx.destination);
  }
  return ctx;
}

export function unlockAudio() {
  const context = ensureContext();
  if (context && context.state === "suspended") {
    context.resume().catch(() => {});
  }
}

export function setSystemVolume(v: number) {
  systemVolume = Math.min(1, Math.max(0, v));
  if (master && ctx) {
    master.gain.setTargetAtTime(systemVolume, ctx.currentTime, 0.02);
  }
}

export function getSystemVolume() {
  return systemVolume;
}

/** Access to the shared AudioContext + master gain for apps that synthesize
 *  their own instruments (Beat Lab). Created lazily; may be null before the
 *  first user gesture — call unlockAudio() from a gesture handler first. */
export function getAudioContext() {
  return ensureContext();
}

export function getMasterGain() {
  return master;
}

// ---------------------------------------------------------------------------
// Bundled-sample loader (shared by every sound below)
// ---------------------------------------------------------------------------

const sampleCache = new Map<string, AudioBuffer | null>();
const pendingSamples = new Map<string, Promise<AudioBuffer | null>>();

function fetchSample(name: string): Promise<AudioBuffer | null> {
  if (sampleCache.has(name)) return Promise.resolve(sampleCache.get(name)!);
  const inflight = pendingSamples.get(name);
  if (inflight) return inflight;

  const promise = (async () => {
    const context = ensureContext();
    if (!context) return null;
    // Any bundled format the browser can decode (mp3, wav, m4a, ogg…).
    for (const ext of ["mp3", "m4a", "wav"]) {
      try {
        const res = await fetch(`./assets/${name}.${ext}`, { cache: "force-cache" });
        if (!res.ok) continue;
        const ct = res.headers.get("content-type") ?? "";
        if (ct.includes("text/html")) continue; // SPA fallback page, not audio
        const buf = await res.arrayBuffer();
        const decoded = await context.decodeAudioData(buf.slice(0));
        sampleCache.set(name, decoded);
        return decoded;
      } catch {
        // try the next extension
      }
    }
    sampleCache.set(name, null);
    return null;
  })();
  pendingSamples.set(name, promise);
  return promise;
}

/** Fire-and-forget: kick off downloads so later plays are instant. */
export function preloadSamples(names: string[]) {
  names.forEach((n) => {
    fetchSample(n).catch(() => {});
  });
}

async function playSample(name: string): Promise<boolean> {
  const context = ensureContext();
  if (!context || !master) return false;
  const buffer = await fetchSample(name);
  if (!buffer) return false;
  const src = context.createBufferSource();
  src.buffer = buffer;
  src.connect(master);
  src.start();
  return true;
}

// ---------------------------------------------------------------------------
// Startup chime — the real Mac sound when the bundled sample exists.
// ---------------------------------------------------------------------------

export function playStartupChime() {
  const context = ensureContext();
  if (!context || !master) return;
  if (context.state === "suspended") {
    context.resume().catch(() => {});
  }

  playSample("startup").then((played) => {
    if (played) return;

    // Fallback: struck-string partial model of the classic chime — a bright
    // C-major chord spread across four octaves, struck together and decaying
    // like a piano with the pedal down.
    const c = ensureContext();
    if (!c || !master) return;
    const now = c.currentTime;

    const tones = [130.81, 196.0, 261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 1046.5];
    tones.forEach((f, i) => {
      const partials = [
        { mult: 1.0, amp: i < 3 ? 0.11 : 0.05, decay: 2.6 + i * 0.12, type: "sine" as OscillatorType },
        { mult: 2.756, amp: (i < 3 ? 0.11 : 0.05) * 0.24, decay: 1.1, type: "sine" as OscillatorType },
        { mult: 5.404, amp: (i < 3 ? 0.11 : 0.05) * 0.09, decay: 0.5, type: "sine" as OscillatorType },
      ];
      partials.forEach((p) => {
        [-3, 3].forEach((cents) => {
          const osc = c.createOscillator();
          const gain = c.createGain();
          osc.type = p.type;
          osc.frequency.value = f * p.mult * Math.pow(2, cents / 1200);
          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.linearRampToValueAtTime(p.amp, now + 0.012);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);
          osc.connect(gain);
          gain.connect(master!);
          osc.start(now);
          osc.stop(now + p.decay + 0.1);
        });
      });
    });

    // The strummed-string pick transient.
    const click = c.createOscillator();
    const clickGain = c.createGain();
    click.type = "triangle";
    click.frequency.setValueAtTime(3200, now);
    click.frequency.exponentialRampToValueAtTime(1000, now + 0.025);
    clickGain.gain.setValueAtTime(0.06, now);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
    click.connect(clickGain);
    clickGain.connect(master!);
    click.start(now);
    click.stop(now + 0.05);
  });
}

/** Short click/tick used by the UI (dock, buttons). */
export function playTick() {
  const context = ensureContext();
  if (!context || !master) return;
  const now = context.currentTime;
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(1800, now);
  osc.frequency.exponentialRampToValueAtTime(900, now + 0.05);
  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
  osc.connect(gain);
  gain.connect(master);
  osc.start(now);
  osc.stop(now + 0.08);
}

// ---------------------------------------------------------------------------
// Typing-game keystroke: a soft mechanical "thock" (space = deeper).
// ---------------------------------------------------------------------------

export function playKeyClick(space = false) {
  const context = ensureContext();
  if (!context || !master) return;
  const t = context.currentTime;

  // Body: filtered noise burst.
  const len = Math.floor(context.sampleRate * 0.035);
  const buffer = context.createBuffer(1, len, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < len; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.4);
  }
  const noise = context.createBufferSource();
  noise.buffer = buffer;
  const filter = context.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = space ? 1400 : 2400;
  filter.Q.value = 1.1;
  const ng = context.createGain();
  ng.gain.setValueAtTime(space ? 0.16 : 0.11, t);
  ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
  noise.connect(filter);
  filter.connect(ng);
  ng.connect(master);
  noise.start(t);

  // Pitch: tiny sine tick for the "click" transient.
  const osc = context.createOscillator();
  const g = context.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(space ? 130 : 190, t);
  osc.frequency.exponentialRampToValueAtTime(space ? 70 : 110, t + 0.03);
  g.gain.setValueAtTime(space ? 0.05 : 0.035, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
  osc.connect(g);
  g.connect(master);
  osc.start(t);
  osc.stop(t + 0.05);
}

/** Deep power-down sweep for Shut Down / Sleep. */
export function playPowerSound(direction: "down" | "up" = "down") {
  const context = ensureContext();
  if (!context || !master) return;
  const now = context.currentTime;
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.type = "sine";
  if (direction === "down") {
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.9);
  } else {
    osc.frequency.setValueAtTime(70, now);
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.9);
  }
  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);
  osc.connect(gain);
  gain.connect(master);
  osc.start(now);
  osc.stop(now + 1.1);
}

// ---------------------------------------------------------------------------
// FaceTime call sounds: the ringing cadence, pickup pop and end-call descent.
// Sample files override the synthesis when bundled.
// ---------------------------------------------------------------------------

let ringTimer: number | null = null;
let ringGeneration = 0;
const RING_PERIOD_MS = 3200;

/** Shared airy tail — a short feedback delay that gives every call sound the
 *  gentle room echo the real FaceTime audio has. Created once, reused. */
let ambience: DelayNode | null = null;
function getAmbience(c: AudioContext): DelayNode | null {
  if (!master) return null;
  if (!ambience) {
    ambience = c.createDelay(1.0);
    ambience.delayTime.value = 0.16;
    const fb = c.createGain();
    fb.gain.value = 0.32;
    const dampen = c.createBiquadFilter();
    dampen.type = "lowpass";
    dampen.frequency.value = 3200;
    const wet = c.createGain();
    wet.gain.value = 0.22;
    ambience.connect(fb);
    fb.connect(dampen);
    dampen.connect(ambience);
    ambience.connect(wet);
    wet.connect(master);
  }
  return ambience;
}

/** One plucked marimba-like tone — the core of the real FaceTime ringtone:
 *  a bright fundamental with soft inharmonic overtones and a fast attack. */
function pluck(c: AudioContext, t0: number, freq: number, amp: number) {
  const bus = c.createGain();
  bus.gain.value = 1;
  bus.connect(master!);
  const amb = getAmbience(c);
  if (amb) bus.connect(amb);

  [
    { mult: 1.0, amp: 1.0, decay: 0.55 },
    { mult: 4.0, amp: 0.22, decay: 0.18 },   // two octaves up, marimba partial
    { mult: 9.2, amp: 0.06, decay: 0.07 },   // strike shimmer
  ].forEach((p) => {
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "sine";
    osc.frequency.value = freq * p.mult;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.linearRampToValueAtTime(amp * p.amp, t0 + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + p.decay);
    osc.connect(gain);
    gain.connect(bus);
    osc.start(t0);
    osc.stop(t0 + p.decay + 0.05);
  });
}

/**
 * The FaceTime ring: the recognizable bubbly cadence of iOS "Reflection" —
 * a quick ascending three-note figure (A5 → C#6 → E6), repeated twice per
 * cycle with a soft breath transient before each burst.
 */
function synthRingCycle() {
  const c = ensureContext();
  if (!c || !master) return;
  const t = c.currentTime + 0.02;

  const burst = (t0: number, amp: number) => {
    // breath transient
    const len = Math.floor(c.sampleRate * 0.02);
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    const noise = c.createBufferSource();
    noise.buffer = buf;
    const hp = c.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 5000;
    const ng = c.createGain();
    ng.gain.setValueAtTime(amp * 0.35, t0);
    ng.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.03);
    noise.connect(hp);
    hp.connect(ng);
    ng.connect(master!);
    noise.start(t0);

    // the three-note figure
    pluck(c, t0 + 0.05, 880.0, amp);          // A5
    pluck(c, t0 + 0.17, 1108.73, amp * 0.85); // C#6
    pluck(c, t0 + 0.29, 1318.51, amp * 0.7);  // E6
  };

  burst(t, 0.09);
  burst(t + 0.62, 0.065);
}

export function startRingtone() {
  const context = ensureContext();
  if (!context) return;
  if (context.state === "suspended") context.resume().catch(() => {});
  stopRingtone();

  const generation = ++ringGeneration;

  // Bundled FaceTime ring sample loops if present.
  fetchSample("facetime-ring").then((buffer) => {
    if (generation !== ringGeneration || !buffer) return;
    const loop = () => {
      if (generation !== ringGeneration) return;
      playSample("facetime-ring");
    };
    loop();
    ringTimer = window.setInterval(loop, Math.max(2500, buffer.duration * 1000 + 900));
  });

  // Synth cadence runs in parallel — whichever the sample loader resolves
  // with, the first cycle is audible immediately.
  const first = () => {
    if (generation !== ringGeneration) return;
    if (!sampleCache.has("facetime-ring")) synthRingCycle();
  };
  first();
  if (ringTimer === null) {
    ringTimer = window.setInterval(first, RING_PERIOD_MS);
  }
}

export function stopRingtone() {
  ringGeneration++;
  if (ringTimer !== null) {
    window.clearInterval(ringTimer);
    ringTimer = null;
  }
}

/** FaceTime pickup: the connection "bloom" — a soft pop that blossoms into
 *  a rising major third, with a touch of room ambience. */
export function playConnectBlip() {
  playSample("facetime-connect").then((played) => {
    if (played) return;
    const c = ensureContext();
    if (!c || !master) return;
    const t = c.currentTime;
    const amb = getAmbience(c);

    // Pop: quick filtered noise + sine drop.
    const len = Math.floor(c.sampleRate * 0.06);
    const buffer = c.createBuffer(1, len, c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2);
    const noise = c.createBufferSource();
    noise.buffer = buffer;
    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 950;
    bp.Q.value = 2;
    const ng = c.createGain();
    ng.gain.setValueAtTime(0.13, t);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
    noise.connect(bp);
    bp.connect(ng);
    ng.connect(master!);
    if (amb) ng.connect(amb);
    noise.start(t);

    // Rise: G4 → C5 plucked pair, bright and warm.
    const bus = c.createGain();
    bus.gain.value = 1;
    bus.connect(master!);
    if (amb) bus.connect(amb);
    [
      { f: 392.0, s: 0.06 },
      { f: 523.25, s: 0.16 },
    ].forEach(({ f, s }) => {
      [
        { mult: 1.0, amp: 0.075, decay: 0.4 },
        { mult: 4.0, amp: 0.014, decay: 0.12 },
      ].forEach((p) => {
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = "sine";
        osc.frequency.value = f * p.mult;
        const st = t + s;
        gain.gain.setValueAtTime(0.0001, st);
        gain.gain.linearRampToValueAtTime(p.amp, st + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, st + p.decay);
        osc.connect(gain);
        gain.connect(bus);
        osc.start(st);
        osc.stop(st + p.decay + 0.05);
      });
    });
  });
}

/** FaceTime hang-up: the descending double-blip "buh-bye" cadence. */
export function playEndBlip() {
  playSample("facetime-end").then((played) => {
    if (played) return;
    const c = ensureContext();
    if (!c || !master) return;
    const t = c.currentTime;
    // Descending minor-third pair with a soft square edge, like the real end
    // of a call, plus a low "line dropped" thud.
    [
      { f: 622.25, s: 0, amp: 0.055, decay: 0.32 },
      { f: 493.88, s: 0.13, amp: 0.05, decay: 0.4 },
    ].forEach((n) => {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = "sine";
      osc.frequency.value = n.f;
      const s = t + n.s;
      gain.gain.setValueAtTime(0.0001, s);
      gain.gain.linearRampToValueAtTime(n.amp, s + 0.014);
      gain.gain.exponentialRampToValueAtTime(0.0001, s + n.decay);
      osc.connect(gain);
      gain.connect(master!);
      osc.start(s);
      osc.stop(s + n.decay + 0.05);

      const sub = c.createOscillator();
      const subGain = c.createGain();
      sub.type = "triangle";
      sub.frequency.value = n.f / 2;
      subGain.gain.setValueAtTime(0.0001, s);
      subGain.gain.linearRampToValueAtTime(n.amp * 0.35, s + 0.014);
      subGain.gain.exponentialRampToValueAtTime(0.0001, s + n.decay * 0.8);
      sub.connect(subGain);
      subGain.connect(master!);
      sub.start(s);
      sub.stop(s + n.decay);
    });

    const thud = c.createOscillator();
    const thudGain = c.createGain();
    thud.type = "sine";
    thud.frequency.setValueAtTime(180, t + 0.26);
    thud.frequency.exponentialRampToValueAtTime(60, t + 0.5);
    thudGain.gain.setValueAtTime(0.07, t + 0.26);
    thudGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
    thud.connect(thudGain);
    thudGain.connect(master!);
    const amb2 = getAmbience(c);
    if (amb2) thudGain.connect(amb2);
    thud.start(t + 0.26);
    thud.stop(t + 0.6);
  });
}
