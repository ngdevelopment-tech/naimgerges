import React, { useState, useRef } from "react";
import { AppConfig } from "../types";
import { TrashIcon } from "./icons/AppIcons";
import { playTick } from "../lib/sounds";

interface DockProps {
  apps: AppConfig[];
  openIds: string[];
  onLaunch: (id: string) => void;
}

const Dock: React.FC<DockProps> = ({ apps, openIds, onLaunch }) => {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const dockApps = apps.filter((a) => a.inDock);
  const baseSize = 52;

  const computeScale = (el: HTMLElement | null, mx: number | null): number => {
    if (!el || mx === null) return 1;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const d = Math.abs(mx - center);
    const range = 140;
    if (d > range) return 1;
    // cosine magnification
    return 1 + 0.42 * Math.pow(Math.cos((d / range) * (Math.PI / 2)), 2.2);
  };

  const iconStyle = (el: HTMLButtonElement | null, mx: number | null): React.CSSProperties => {
    const s = computeScale(el, mx);
    return {
      width: baseSize * s,
      height: baseSize * s,
      transition: "width 90ms ease-out, height 90ms ease-out",
    };
  };

  const handleMove = (e: React.PointerEvent) => {
    setMouseX(e.clientX);
  };

  const handleLeave = () => setMouseX(null);

  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-center z-[500] pointer-events-none pb-1.5">
      <div
        ref={dockRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className="pointer-events-auto max-w-[calc(100vw-16px)] overflow-x-auto no-scrollbar rounded-[20px] bg-white/25 backdrop-blur-2xl border border-white/35 shadow-[0_10px_40px_rgba(0,0,0,0.35)] px-2.5 pb-1.5 pt-2 flex items-end gap-1.5"
      >
        {dockApps.map((app) => (
          <DockItem
            key={app.id}
            appId={app.id}
            title={app.title}
            icon={app.icon}
            open={openIds.includes(app.id)}
            mouseX={mouseX}
            iconStyle={iconStyle}
            onLaunch={onLaunch}
          />
        ))}

        <div className="w-px self-stretch my-1 bg-black/15 border-l border-white/30 mx-1" />

        <DockItem
          appId="trash"
          title="Trash"
          icon={<TrashIcon />}
          open={openIds.includes("trash")}
          mouseX={mouseX}
          iconStyle={iconStyle}
          onLaunch={onLaunch}
        />
      </div>
    </div>
  );
};

const DockItem: React.FC<{
  appId: string;
  title: string;
  icon: React.ReactNode;
  open: boolean;
  mouseX: number | null;
  iconStyle: (el: HTMLButtonElement | null, mx: number | null) => React.CSSProperties;
  onLaunch: (id: string) => void;
}> = ({ appId, title, icon, open, mouseX, iconStyle, onLaunch }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [hover, setHover] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      {hover && (
        <div className="absolute -top-[46px] left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#f5f5f7ee] text-[#1d1d1f] text-[12px] font-medium px-2.5 py-1 rounded-md border border-black/10 shadow-lg">
          {title}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#f5f5f7ee] border-r border-b border-black/10" />
        </div>
      )}
      <button
        ref={ref}
        style={iconStyle(ref.current, mouseX)}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        onPointerDown={() => playTick()}
        onClick={() => onLaunch(appId)}
        className="flex items-end justify-center focus:outline-none active:translate-y-[1px]"
        aria-label={`Open ${title}`}
      >
        <span className="block w-full h-full drop-shadow-[0_3px_8px_rgba(0,0,0,0.3)]">{icon}</span>
      </button>
      <span
        className={`mt-[3px] w-[4px] h-[4px] rounded-full bg-black/70 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default Dock;
