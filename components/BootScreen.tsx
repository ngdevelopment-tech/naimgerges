import React, { useEffect, useRef, useState } from "react";

interface BootScreenProps {
  onDone: () => void;
}

const AppleLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 384 512" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" />
  </svg>
);

const BootScreen: React.FC<BootScreenProps> = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const DURATION = 4000;
    const start = performance.now();
    let raf = 0;

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      // ease-in-out so the bar feels like real EFI progress
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setProgress(eased);
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else if (!doneRef.current) {
        doneRef.current = true;
        setFading(true);
        setTimeout(onDone, 900); // fade out, then hand over
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-[900ms] ease-out"
      style={{ opacity: fading ? 0 : 1 }}
      aria-hidden="true"
    >
      <AppleLogo className="w-[68px] h-[68px] text-white mb-14 opacity-95" />
      <p className="mb-5 text-[12px] font-light tracking-wide text-white/45 select-none">
        Built from scratch. Every pixel, every sound, every app.
      </p>
      <div className="w-[180px] h-[5px] rounded-full bg-white/20 overflow-hidden">
        <div
          className="h-full rounded-full bg-white/90"
          style={{ width: `${Math.round(progress * 100)}%`, transition: "width 80ms linear" }}
        />
      </div>
    </div>
  );
};

export default BootScreen;
