/**
 * Tiny cross-app system state (kept deliberately simple — no context plumbing
 * through the window manager). Settings writes, the menu bar listens.
 */

type Listener = (v: boolean) => void;

let lowPower = false;
const listeners = new Set<Listener>();

export function getLowPower() {
  return lowPower;
}

export function setSystemLowPower(v: boolean) {
  lowPower = v;
  listeners.forEach((l) => l(v));
}

export function subscribeLowPower(fn: Listener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
