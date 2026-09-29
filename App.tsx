import React, { useState, useEffect, useRef, useCallback } from "react";
import BootScreen from "./components/BootScreen";
import LoginScreen from "./components/LoginScreen";
import Desktop from "./components/Desktop";
import { playStartupChime, playPowerSound, unlockAudio, preloadSamples } from "./lib/sounds";

type Phase = "BOOT" | "LOGIN" | "DESKTOP" | "SHUTDOWN";

const App: React.FC = () => {
  const [phase, setPhase] = useState<Phase>("BOOT");
  const [isAsleep, setIsAsleep] = useState(false);
  const bootedOnce = useRef(false);

  // Start fetching the bundled sound files (chime + call sounds) right away;
  // plays before the fetch resolves simply fall back to synthesis.
  useEffect(() => {
    preloadSamples(["startup", "facetime-ring", "facetime-connect", "facetime-end"]);
  }, []);

  const handleBootDone = useCallback(() => {
    setPhase("LOGIN");
  }, []);

  const handleUnlock = useCallback(() => {
    unlockAudio();
    playStartupChime();
    setPhase("DESKTOP");
  }, []);

  const handleSleep = useCallback(() => {
    playPowerSound("down");
    setIsAsleep(true);
  }, []);

  const handleWake = useCallback(() => {
    setIsAsleep(false);
  }, []);

  const handleRestart = useCallback(() => {
    playPowerSound("down");
    setIsAsleep(false);
    setPhase("BOOT");
  }, []);

  const handleShutDown = useCallback(() => {
    playPowerSound("down");
    setPhase("SHUTDOWN");
  }, []);

  useEffect(() => {
    if (phase === "SHUTDOWN") {
      // Screen goes black; a short press of any key powers it back on,
      // mirroring a real Mac's power button.
      const handler = () => {
        playPowerSound("up");
        setPhase("LOGIN");
      };
      window.addEventListener("keydown", handler);
      window.addEventListener("pointerdown", handler, { once: true });
      return () => {
        window.removeEventListener("keydown", handler);
        window.removeEventListener("pointerdown", handler);
      };
    }
  }, [phase]);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {phase === "BOOT" && <BootScreen onDone={handleBootDone} />}

      {phase === "LOGIN" && (
        <LoginScreen
          onUnlock={handleUnlock}
          onSleep={handleSleep}
          onRestart={handleRestart}
          onShutDown={handleShutDown}
        />
      )}

      {phase === "DESKTOP" && (
        <Desktop
          onLock={handleSleep}
          onRestart={handleRestart}
          onShutDown={handleShutDown}
          isAsleep={isAsleep}
          onWake={handleWake}
        />
      )}

      {phase === "SHUTDOWN" && (
        <div className="fixed inset-0 bg-black" aria-hidden="true" />
      )}

      {/* Sleep is rendered on top of the desktop so state is preserved */}
      {phase === "DESKTOP" && isAsleep && (
        <div
          className="fixed inset-0 z-[10000] bg-black cursor-pointer"
          onPointerDown={handleWake}
        >
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white/30 text-sm font-light animate-pulse">
              Click anywhere to wake
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
