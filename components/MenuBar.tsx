import React, { useState, useEffect, useRef } from "react";
import { Wifi, BatteryFull, BatteryCharging, Search, SlidersHorizontal } from "lucide-react";
import { USER_SHORT_NAME } from "../constants";
import { getLowPower, subscribeLowPower } from "../lib/systemState";

interface MenuBarProps {
  activeApp: string;
  onLock: () => void;
  onRestart: () => void;
  onShutDown: () => void;
  onOpenApp: (id: string) => void;
}

const AppleMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 384 512" className={className} fill="currentColor" aria-hidden="true">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" />
  </svg>
);

const MenuBar: React.FC<MenuBarProps> = ({ activeApp, onLock, onRestart, onShutDown, onOpenApp }) => {
  const [now, setNow] = useState(new Date());
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [lowPower, setLowPowerState] = useState(getLowPower());
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => subscribeLowPower(setLowPowerState), []);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  const menus: Record<string, { label: string; action?: () => void; sep?: boolean }[]> = {
    apple: [
      { label: "About This Mac", action: () => onOpenApp("settings") },
      { label: "sep1", sep: true },
      { label: "System Settings…", action: () => onOpenApp("settings") },
      { label: "sep2", sep: true },
      { label: "Sleep", action: onLock },
      { label: "Restart…", action: onRestart },
      { label: "Shut Down…", action: onShutDown },
      { label: "sep3", sep: true },
      { label: "Lock Screen", action: onLock },
      { label: `Log Out ${USER_SHORT_NAME}…`, action: onLock },
    ],
    app: [
      { label: "About " + activeApp, action: () => {} },
      { label: "sep", sep: true },
      { label: "Hide " + activeApp, action: () => {} },
      { label: "Quit " + activeApp, action: () => {} },
    ],
  };

  const MenuButton: React.FC<{ id: string; children: React.ReactNode; bold?: boolean }> = ({
    id,
    children,
    bold,
  }) => (
    <button
      onPointerDown={(e) => {
        e.stopPropagation();
        setOpenMenu(openMenu === id ? null : id);
      }}
      onPointerEnter={() => openMenu && setOpenMenu(id)}
      className={`h-[22px] px-2.5 rounded-[5px] text-[13px] ${
        bold ? "font-semibold" : "font-normal"
      } ${openMenu === id ? "bg-white/25" : "hover:bg-white/15"} text-white/95`}
    >
      {children}
    </button>
  );

  const Dropdown: React.FC<{ id: string; items: { label: string; action?: () => void; sep?: boolean }[] }> = ({
    id,
    items,
  }) =>
    openMenu === id ? (
      <div className="absolute top-[26px] left-0 min-w-[220px] rounded-[10px] bg-[#f6f6f8ee] backdrop-blur-2xl border border-black/10 shadow-2xl py-1 text-[13px] text-[#1d1d1f] z-[600]">
        {items.map((item) =>
          item.sep ? (
            <div key={item.label} className="my-1 mx-2.5 h-px bg-black/10" />
          ) : (
            <button
              key={item.label}
              onClick={() => {
                setOpenMenu(null);
                item.action?.();
              }}
              className="w-full text-left px-3 py-[5px] mx-0 hover:bg-[#0a66ff] hover:text-white rounded-none"
            >
              {item.label}
            </button>
          )
        )}
      </div>
    ) : null;

  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div
      ref={barRef}
      className="absolute top-0 left-0 right-0 h-[26px] z-[600] flex items-center justify-between px-2 bg-black/25 backdrop-blur-xl text-white text-[13px] select-none"
    >
      <div className="flex items-center gap-0.5 relative">
        <div className="relative">
          <MenuButton id="apple" bold>
            <AppleMark className="w-[15px] h-[15px] mt-[1px]" />
          </MenuButton>
          <Dropdown id="apple" items={menus.apple} />
        </div>
        <div className="relative">
          <MenuButton id="app" bold>
            {activeApp.split("—")[0].trim()}
          </MenuButton>
          <Dropdown id="app" items={menus.app} />
        </div>
        <span className="hidden md:inline-block h-[22px] px-2.5 leading-[22px] text-white/90 cursor-default">File</span>
        <span className="hidden md:inline-block h-[22px] px-2.5 leading-[22px] text-white/90 cursor-default">Edit</span>
        <span className="hidden md:inline-block h-[22px] px-2.5 leading-[22px] text-white/90 cursor-default">View</span>
        <span className="hidden md:inline-block h-[22px] px-2.5 leading-[22px] text-white/90 cursor-default">Window</span>
        <span className="hidden md:inline-block h-[22px] px-2.5 leading-[22px] text-white/90 cursor-default">Help</span>
      </div>

      <div className="flex items-center gap-1">
        <span
          className="h-[22px] px-2 flex items-center rounded-[5px] hover:bg-white/15 cursor-default"
          aria-label={lowPower ? "Battery — Low Power Mode on" : "Battery"}
          title={lowPower ? "Low Power Mode: on" : undefined}
        >
          {lowPower ? (
            <BatteryCharging size={17} strokeWidth={1.8} className="text-[#ffd60a]" />
          ) : (
            <BatteryFull size={17} strokeWidth={1.8} className="text-white" />
          )}
        </span>
        <span className="h-[22px] px-2 flex items-center rounded-[5px] hover:bg-white/15 cursor-default">
          <Wifi size={15} strokeWidth={2} />
        </span>
        <span className="hidden sm:flex h-[22px] px-2 items-center rounded-[5px] hover:bg-white/15 cursor-default">
          <Search size={14} strokeWidth={2} />
        </span>
        <span className="h-[22px] px-2 flex items-center rounded-[5px] hover:bg-white/15 cursor-default">
          <SlidersHorizontal size={15} strokeWidth={2} />
        </span>
        <span className="h-[22px] px-2 flex items-center gap-2 rounded-[5px] hover:bg-white/15 cursor-default">
          <span className="hidden sm:inline">{dateStr}</span>
          <span className="tabular-nums">{timeStr}</span>
        </span>
      </div>
    </div>
  );
};

export default MenuBar;
