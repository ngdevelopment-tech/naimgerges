import React from "react";
import { WindowState } from "../types";

export type ResizeDir = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

interface WindowProps {
  win: WindowState;
  isActive: boolean;
  children: React.ReactNode;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleZoom: () => void;
  onDragStart: (e: React.PointerEvent) => void;
  onResizeStart: (e: React.PointerEvent, dir: ResizeDir) => void;
}

const CURSORS: Record<ResizeDir, string> = {
  n: "ns-resize",
  s: "ns-resize",
  e: "ew-resize",
  w: "ew-resize",
  ne: "nesw-resize",
  sw: "nesw-resize",
  nw: "nwse-resize",
  se: "nwse-resize",
};

const TrafficLights: React.FC<{
  onClose: () => void;
  onMinimize: () => void;
  onToggleZoom: () => void;
}> = ({ onClose, onMinimize, onToggleZoom }) => (
  <div className="flex items-center gap-2 group/tl" onPointerDown={(e) => e.stopPropagation()}>
    <button
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      aria-label="Close window"
      className="w-[12px] h-[12px] rounded-full bg-[#ff5f57] border border-[#e0443e] flex items-center justify-center text-transparent hover:text-[#7d0000]/80 group-hover/tl:text-[#7d0000]/80 active:brightness-90 shadow-[inset_0_0_1px_rgba(255,255,255,0.6)] transition-colors"
    >
      <svg width="7" height="7" viewBox="0 0 8 8">
        <path d="M2 2 L6 6 M6 2 L2 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </button>
    <button
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onMinimize();
      }}
      aria-label="Minimize window"
      className="w-[12px] h-[12px] rounded-full bg-[#febc2e] border border-[#d89e24] flex items-center justify-center text-transparent hover:text-[#985705]/80 group-hover/tl:text-[#985705]/80 active:brightness-90 shadow-[inset_0_0_1px_rgba(255,255,255,0.6)] transition-colors"
    >
      <svg width="8" height="8" viewBox="0 0 8 8">
        <path d="M1.5 4 H6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </button>
    <button
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onToggleZoom();
      }}
      aria-label="Zoom window"
      className="w-[12px] h-[12px] rounded-full bg-[#28c840] border border-[#1aab29] flex items-center justify-center text-transparent hover:text-[#0b5500]/80 group-hover/tl:text-[#0b5500]/80 active:brightness-90 shadow-[inset_0_0_1px_rgba(255,255,255,0.6)] transition-colors"
    >
      <svg width="8" height="8" viewBox="0 0 8 8">
        <path d="M4.6 1.4 H6.6 V3.4 M3.4 6.6 H1.4 V4.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      </svg>
    </button>
  </div>
);

const Window: React.FC<WindowProps> = ({
  win,
  isActive,
  children,
  onFocus,
  onClose,
  onMinimize,
  onToggleZoom,
  onDragStart,
  onResizeStart,
}) => {
  const isUnified = win.windowType === "unified";

  return (
    <div
      className={`absolute flex flex-col rounded-[11px] overflow-hidden will-change-transform ${
        isUnified ? "bg-white" : "bg-white"
      } ${
        isActive
          ? "shadow-[0_22px_70px_rgba(0,0,0,0.45),0_0_0_0.5px_rgba(0,0,0,0.25)]"
          : "shadow-[0_10px_40px_rgba(0,0,0,0.28),0_0_0_0.5px_rgba(0,0,0,0.2)]"
      }`}
      style={{
        left: win.position.x,
        top: win.position.y,
        width: win.size.width,
        height: win.size.height,
        zIndex: win.zIndex,
        transition: win.isMaximized
          ? "left .28s cubic-bezier(.32,.72,0,1), top .28s cubic-bezier(.32,.72,0,1), width .28s cubic-bezier(.32,.72,0,1), height .28s cubic-bezier(.32,.72,0,1)"
          : "box-shadow .2s ease",
      }}
      onPointerDown={onFocus}
    >
      {/* Standard title bar */}
      {!isUnified && (
        <div
          className="relative h-10 shrink-0 select-none flex items-center px-3.5 border-b border-black/10 bg-gradient-to-b from-[#f6f6f6] to-[#ececec]"
          onPointerDown={onDragStart}
          onDoubleClick={onToggleZoom}
        >
          <TrafficLights onClose={onClose} onMinimize={onMinimize} onToggleZoom={onToggleZoom} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className={`text-[13px] font-semibold ${isActive ? "text-[#3c3c3e]" : "text-[#9a9a9e]"}`}>
              {win.title}
            </span>
          </div>
        </div>
      )}

      {/* Unified overlay strip: traffic lights + invisible drag region */}
      {isUnified && (
        <>
          <div
            className="absolute top-0 left-0 right-0 h-9 z-50 pointer-events-none"
            onPointerDown={onDragStart}
            onDoubleClick={onToggleZoom}
            style={{ pointerEvents: "none" }}
          >
            {/* the strip itself ignores pointer events; inner drag pad catches them */}
            <div className="absolute left-0 right-0 top-0 h-8 pointer-events-auto" style={{ pointerEvents: "auto" }} />
          </div>
          <div className="absolute top-0 left-0 right-0 h-9 z-50 flex items-center px-3.5 pointer-events-none">
            <div className="pointer-events-auto">
              <TrafficLights onClose={onClose} onMinimize={onMinimize} onToggleZoom={onToggleZoom} />
            </div>
          </div>
        </>
      )}

      {/* Content */}
      <div className="flex-1 min-h-0 relative overflow-hidden">{children}</div>

      {/* Resize handles */}
      {!win.isMaximized &&
        (Object.keys(CURSORS) as ResizeDir[]).map((dir) => {
          const isCorner = dir.length === 2;
          const base: React.CSSProperties = { position: "absolute", zIndex: 40, touchAction: "none" };
          const style: React.CSSProperties = { ...base, cursor: CURSORS[dir] };
          if (dir.includes("n")) {
            style.top = isCorner ? 0 : 0;
            style.left = dir === "nw" ? 0 : dir === "ne" ? undefined : 12;
            style.right = dir === "ne" ? 0 : undefined;
            style.height = isCorner ? 10 : 5;
            if (isCorner) style.width = 12;
          }
          if (dir.includes("s")) {
            style.bottom = 0;
            style.left = dir === "sw" ? 0 : dir === "se" ? undefined : 12;
            style.right = dir === "se" ? 0 : undefined;
            style.height = isCorner ? 12 : 6;
            if (isCorner) style.width = 14;
          }
          if (dir.includes("e")) {
            style.right = 0;
            style.top = dir === "ne" ? 0 : dir === "se" ? undefined : 12;
            style.bottom = dir === "se" ? 0 : undefined;
            style.width = isCorner ? 12 : 6;
            if (isCorner) style.height = 14;
          }
          if (dir.includes("w")) {
            style.left = 0;
            style.top = dir === "nw" ? 0 : dir === "sw" ? undefined : 12;
            style.bottom = dir === "sw" ? 0 : undefined;
            style.width = isCorner ? 12 : 6;
            if (isCorner) style.height = 14;
          }
          return (
            <div
              key={dir}
              style={style}
              onPointerDown={(e) => onResizeStart(e, dir)}
              className="hidden md:block"
            />
          );
        })}
    </div>
  );
};

export default Window;
