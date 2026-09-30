import React, { useEffect, useState } from "react";
import {
  Wifi,
  Moon,
  RotateCcw,
  Power,
  Fingerprint,
} from "lucide-react";
import {
  USER_NAME,
  USER_AVATAR,
  WALLPAPER_URL,
} from "../constants";
import { unlockAudio, playTick } from "../lib/sounds";

interface LoginScreenProps {
  onUnlock: () => void;
  onSleep: () => void;
  onRestart: () => void;
  onShutDown: () => void;
}

const AppleMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 384 512" className={className} fill="currentColor" aria-hidden="true">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" />
  </svg>
);

/**
 * Lock screen, laid out like macOS: the big clock sits at the top, the user
 * cluster is centered in the remaining space, power controls rest at the
 * bottom. One flex column owns the flow so nothing can overlap.
 */
const LoginScreen: React.FC<LoginScreenProps> = ({
  onUnlock,
  onSleep,
  onRestart,
  onShutDown,
}) => {
  const [now, setNow] = useState(new Date());
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const handleUnlock = () => {
    if (leaving) return;
    setLeaving(true);
    unlockAudio();
    // The startup chime itself is played once by App on phase change.
    setTimeout(onUnlock, 650);
  };

  // Any keypress unlocks — like tapping a key on a real Mac.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.repeat) return;
      handleUnlock();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const clock = `${hh}:${mm}`;

  const powerButtons = [
    { key: "sleep", label: "Sleep", icon: <Moon size={19} strokeWidth={2} />, fn: onSleep },
    { key: "restart", label: "Restart", icon: <RotateCcw size={19} strokeWidth={2} />, fn: onRestart },
    { key: "shutdown", label: "Shut Down", icon: <Power size={19} strokeWidth={2} />, fn: onShutDown },
  ];

  return (
    <div
      className={`fixed inset-0 z-[90] overflow-hidden transition-opacity duration-700 ease-out ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      onPointerDown={handleUnlock}
    >
      {/* Wallpaper + blur */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: `url(${WALLPAPER_URL})`,
        }}
      />
      <div className="absolute inset-0 backdrop-blur-2xl bg-black/25" />

      {/* Top status bar */}
      <div className="absolute top-0 left-0 right-0 h-9 flex items-center justify-between px-4 md:px-6 text-white/90 z-10">
        <AppleMark className="w-4 h-4 opacity-90" />
        <div className="flex items-center gap-3">
          <Wifi size={15} strokeWidth={2.2} />
          <span className="text-[12px] font-medium tracking-wide border border-white/40 rounded-[5px] px-1.5 py-[1px] bg-white/10">
            US
          </span>
        </div>
      </div>

      <div className="relative z-10 h-full flex flex-col items-center px-6 pt-[clamp(24px,6vh,64px)] pb-[clamp(12px,3vh,32px)]">
        {/* Clock — top, like macOS. Sized from the smaller of vh/vw so it
            never clips on short or narrow windows. */}
        <div className="shrink-0 flex flex-col items-center text-white select-none animate-fade-in">
          <div
            className="font-clock leading-none drop-shadow-lg"
            style={{ fontSize: "min(15.5vh, 17vw, 124px)" }}
          >
            {clock}
          </div>
          <div className="mt-1 md:mt-2 text-[clamp(13px,2vh,19px)] font-medium tracking-wide opacity-95 drop-shadow">
            {dateStr}
          </div>
        </div>

        {/* User cluster — centered in the space between clock and power */}
        <div className="flex-1 min-h-0 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center animate-fade-in-up">
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-full border border-white/35 bg-white/10 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.35)]" />
              <img
                src={USER_AVATAR}
                alt={USER_NAME}
                draggable={false}
                className="relative w-[clamp(64px,12vh,112px)] h-[clamp(64px,12vh,112px)] rounded-full object-cover shadow-xl"
              />
            </div>
            <h1 className="mt-2 md:mt-3 text-white text-[clamp(16px,2.6vh,22px)] font-semibold tracking-tight drop-shadow-md">
              {USER_NAME}
            </h1>
            <button
              onPointerDown={(e) => {
                e.stopPropagation();
                handleUnlock();
              }}
              className="mt-2.5 md:mt-4 group flex items-center gap-2 pl-4 pr-5 py-1.5 md:py-2 rounded-full bg-white/15 hover:bg-white/25 active:scale-[0.97] border border-white/30 backdrop-blur-xl text-white text-[12.5px] md:text-[13px] font-medium shadow-lg transition-all"
            >
              <Fingerprint size={16} className="opacity-90" />
              <span>Touch ID or Click to Unlock</span>
            </button>
          </div>
        </div>

        {/* Power controls — bottom */}
        <div className="shrink-0 flex items-start justify-center gap-[clamp(18px,4vw,44px)]">
          {powerButtons.map((b) => (
            <button
              key={b.key}
              onPointerDown={(e) => {
                e.stopPropagation();
                unlockAudio();
                playTick();
                b.fn();
              }}
              className="group flex flex-col items-center gap-1.5 md:gap-2"
              aria-label={b.label}
            >
              <span className="w-[clamp(38px,7vh,56px)] h-[clamp(38px,7vh,56px)] rounded-full bg-white/15 border border-white/30 backdrop-blur-xl flex items-center justify-center text-white shadow-[0_6px_24px_rgba(0,0,0,0.3)] transition-all group-hover:bg-white/30 group-hover:scale-105 group-active:scale-95">
                {b.icon}
              </span>
              <span className="text-white/90 text-[10.5px] md:text-xs font-medium drop-shadow">
                {b.label}
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default LoginScreen;
