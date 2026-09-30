import React, { useState, useRef, useEffect, useCallback } from "react";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import WindowView, { ResizeDir } from "./Window";
import { WindowProvider } from "./WindowContext";
import { WindowState, AppConfig } from "../types";
import { WALLPAPER_URL, USER_NAME } from "../constants";
import { playTick } from "../lib/sounds";

import {
  FinderIcon,
  SafariIcon,
  TerminalIcon,
  CalculatorIcon,
  MusicIcon,
  MailIcon,
  SettingsIcon,
  GitHubIcon,
  FolderIcon,
  CVIcon,
  NotesIcon,
  TrashIcon,
  GameIcon,
  FaceTimeIcon,
  ProjectsIcon,
  ExperienceIcon,
  EducationIcon,
  SkillsIcon,
  CertificationsIcon,
  LanguagesIcon,
  HonorsIcon,
  BeatLabIcon,
} from "./icons/AppIcons";

import FinderApp from "./apps/FinderApp";
import BrowserApp from "./apps/BrowserApp";
import ProjectsApp from "./apps/ProjectsApp";
import ExperienceApp from "./apps/ExperienceApp";
import EducationApp from "./apps/EducationApp";
import SkillsApp from "./apps/SkillsApp";
import CertificationsApp from "./apps/CertificationsApp";
import LanguagesApp from "./apps/LanguagesApp";
import HonorsApp from "./apps/HonorsApp";
import BeatLabApp from "./apps/BeatLabApp";
import TerminalApp from "./apps/TerminalApp";
import CalculatorApp from "./apps/CalculatorApp";
import NotesApp from "./apps/NotesApp";
import TrashApp from "./apps/TrashApp";
import ContactApp from "./apps/ContactApp";
import TicTacToeApp from "./apps/TicTacToeApp";
import MusicApp from "./apps/MusicApp";
import FaceTimeApp from "./apps/FaceTimeApp";
import SettingsApp from "./apps/SettingsApp";
import CVApp from "./apps/CVApp";
import GitHubApp from "./apps/GitHubApp";

interface DesktopProps {
  onLock: () => void;
  onRestart: () => void;
  onShutDown: () => void;
  isAsleep: boolean;
  onWake: () => void;
}

const MENUBAR_H = 26;

const Desktop: React.FC<DesktopProps> = ({ onLock, onRestart, onShutDown, isAsleep, onWake }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [wallpaper, setWallpaper] = useState<string>(WALLPAPER_URL);
  const nextZ = useRef(10);

  const dragState = useRef<{
    id: string;
    offX: number;
    offY: number;
  } | null>(null);
  const resizeState = useRef<{
    id: string;
    dir: ResizeDir;
    startX: number;
    startY: number;
    startW: number;
    startH: number;
    startL: number;
    startT: number;
    minW: number;
    minH: number;
  } | null>(null);
  const [interactionActive, setInteractionActive] = useState(false);

  const takeZ = () => ++nextZ.current;

  // ---- App registry -------------------------------------------------------
  const apps: AppConfig[] = [
    {
      id: "finder",
      title: "Finder",
      icon: <FinderIcon />,
      component: <FinderApp />,
      defaultWidth: 880,
      defaultHeight: 560,
      minWidth: 560,
      minHeight: 380,
      windowType: "unified",
      inDock: true,
    },
    {
      id: "cv",
      title: "Naim_Gerges_CV.pdf",
      icon: <CVIcon />,
      component: <CVApp />,
      defaultWidth: 760,
      defaultHeight: 640,
      minWidth: 420,
      minHeight: 420,
      windowType: "unified",
      inDock: true,
    },
    {
      id: "projects",
      title: "Projects",
      icon: <ProjectsIcon />,
      component: <ProjectsApp />,
      defaultWidth: 980,
      defaultHeight: 660,
      minWidth: 560,
      minHeight: 420,
      windowType: "unified",
      inDock: true,
    },
    {
      id: "experience",
      title: "Experience",
      icon: <ExperienceIcon />,
      component: <ExperienceApp />,
      defaultWidth: 960,
      defaultHeight: 640,
      minWidth: 560,
      minHeight: 420,
      windowType: "unified",
      inDock: false,
    },
    {
      id: "education",
      title: "Education",
      icon: <EducationIcon />,
      component: <EducationApp />,
      defaultWidth: 960,
      defaultHeight: 640,
      minWidth: 560,
      minHeight: 420,
      windowType: "unified",
      inDock: false,
    },
    {
      id: "skills",
      title: "Skills",
      icon: <SkillsIcon />,
      component: <SkillsApp />,
      defaultWidth: 960,
      defaultHeight: 640,
      minWidth: 560,
      minHeight: 420,
      windowType: "unified",
      inDock: false,
    },
    {
      id: "certifications",
      title: "Licenses & Certifications",
      icon: <CertificationsIcon />,
      component: <CertificationsApp />,
      defaultWidth: 960,
      defaultHeight: 640,
      minWidth: 560,
      minHeight: 420,
      windowType: "unified",
      inDock: false,
    },
    {
      id: "languages",
      title: "Languages",
      icon: <LanguagesIcon />,
      component: <LanguagesApp />,
      defaultWidth: 640,
      defaultHeight: 520,
      minWidth: 420,
      minHeight: 380,
      windowType: "unified",
      inDock: false,
    },
    {
      id: "honors",
      title: "Honors & Awards",
      icon: <HonorsIcon />,
      component: <HonorsApp />,
      defaultWidth: 680,
      defaultHeight: 540,
      minWidth: 420,
      minHeight: 380,
      windowType: "unified",
      inDock: false,
    },
    {
      id: "beatlab",
      title: "Beat Lab",
      icon: <BeatLabIcon />,
      component: <BeatLabApp />,
      defaultWidth: 780,
      defaultHeight: 560,
      minWidth: 560,
      minHeight: 440,
      windowType: "standard",
      inDock: false,
      ownsKeyboard: true,
    },
    {
      id: "calculator",
      title: "Calculator",
      icon: <CalculatorIcon />,
      component: <CalculatorApp />,
      defaultWidth: 340,
      defaultHeight: 540,
      minWidth: 300,
      minHeight: 460,
      windowType: "standard",
      inDock: true,
      ownsKeyboard: true,
    },
    {
      id: "github",
      title: "GitHub — ngdevelopment-tech",
      icon: <GitHubIcon />,
      component: <GitHubApp />,
      defaultWidth: 960,
      defaultHeight: 660,
      minWidth: 520,
      minHeight: 400,
      windowType: "unified",
      inDock: false,
    },
    {
      id: "safari",
      title: "Safari",
      icon: <SafariIcon />,
      component: <BrowserApp />,
      defaultWidth: 1040,
      defaultHeight: 700,
      minWidth: 520,
      minHeight: 400,
      windowType: "unified",
      inDock: true,
      ownsKeyboard: true,
    },
    {
      id: "contact",
      title: "Contact",
      icon: <MailIcon />,
      component: <ContactApp />,
      defaultWidth: 520,
      defaultHeight: 560,
      minWidth: 360,
      minHeight: 460,
      windowType: "unified",
      inDock: true,
    },
    {
      id: "terminal",
      title: "Terminal — zsh",
      icon: <TerminalIcon />,
      component: <TerminalApp />,
      defaultWidth: 680,
      defaultHeight: 440,
      minWidth: 420,
      minHeight: 300,
      windowType: "standard",
      inDock: false,
    },
    {
      id: "music",
      title: "Music",
      icon: <MusicIcon />,
      component: <MusicApp />,
      defaultWidth: 940,
      defaultHeight: 640,
      minWidth: 560,
      minHeight: 480,
      windowType: "unified",
      inDock: false,
    },
    {
      id: "notes",
      title: "Notes",
      icon: <NotesIcon />,
      component: <NotesApp />,
      defaultWidth: 780,
      defaultHeight: 520,
      minWidth: 480,
      minHeight: 360,
      windowType: "unified",
      inDock: false,
    },
    {
      id: "facetime",
      title: "FaceTime",
      icon: <FaceTimeIcon />,
      component: <FaceTimeApp />,
      defaultWidth: 420,
      defaultHeight: 620,
      minWidth: 340,
      minHeight: 480,
      windowType: "unified",
      inDock: false,
      ownsKeyboard: true,
    },
    {
      id: "tictactoe",
      title: "Tic Tac Toe",
      icon: <GameIcon />,
      component: <TicTacToeApp />,
      defaultWidth: 380,
      defaultHeight: 560,
      minWidth: 320,
      minHeight: 460,
      windowType: "unified",
      inDock: false,
    },
    {
      id: "settings",
      title: "System Settings",
      icon: <SettingsIcon />,
      component: <SettingsApp wallpaper={wallpaper} onWallpaperChange={setWallpaper} />,
      defaultWidth: 900,
      defaultHeight: 620,
      minWidth: 520,
      minHeight: 420,
      windowType: "unified",
      inDock: true,
    },
    {
      id: "trash",
      title: "Trash",
      icon: <TrashIcon />,
      component: <TrashApp />,
      defaultWidth: 720,
      defaultHeight: 480,
      minWidth: 460,
      minHeight: 360,
      windowType: "unified",
      inDock: false,
    },
  ];

  const appMap = useRef(new Map(apps.map((a) => [a.id, a])));
  appMap.current = new Map(apps.map((a) => [a.id, a]));

  // ---- Launch / close / focus --------------------------------------------
  const clampRect = useCallback((w: number, h: number, x: number, y: number) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxW = Math.min(w, vw - 24);
    const maxH = Math.min(h, vh - MENUBAR_H - 24);
    const x2 = Math.min(Math.max(x, 12), Math.max(12, vw - maxW - 12));
    const y2 = Math.min(Math.max(y, MENUBAR_H + 6), Math.max(MENUBAR_H + 6, vh - Math.min(maxH, vh - 120) - 90));
    return { maxW, maxH, x: x2, y: y2 };
  }, []);

  const launchApp = useCallback(
    (id: string) => {
      const app = appMap.current.get(id);
      if (!app) return;
      playTick();
      setWindows((prev) => {
        const existing = prev.find((w) => w.id === id);
        if (existing) {
          setActiveId(id);
          return prev.map((w) =>
            w.id === id ? { ...w, isMinimized: false, zIndex: takeZ() } : w
          );
        }

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const isSmall = vw < 768;
        // On mobile leave a visible margin so the title bar stays grabbable.
        const margin = isSmall ? 12 : 24;
        const maxW = vw - margin * 2;
        const maxH = vh - MENUBAR_H - margin - (isSmall ? 92 : 100);
        const width = Math.min(app.defaultWidth, maxW);
        const height = Math.min(app.defaultHeight, maxH);

        const stagger = (prev.filter((w) => !w.isMinimized).length % 5) * 26;
        const rawX = (vw - width) / 2 + stagger - 52;
        const rawY = MENUBAR_H + 18 + stagger;
        const rect = clampRect(width, height, rawX, rawY);

        const win: WindowState = {
          id: app.id,
          title: app.title,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          position: { x: rect.x, y: rect.y },
          size: { width: rect.maxW, height: rect.maxH },
          zIndex: takeZ(),
          windowType: app.windowType,
        };
        setActiveId(id);
        return [...prev, win];
      });
    },
    [clampRect]
  );

  const closeWindow = (id: string) => {
    playTick();
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setActiveId((cur) => (cur === id ? null : cur));
  };

  const minimizeWindow = (id: string) => {
    playTick();
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)));
    setActiveId((cur) => (cur === id ? null : cur));
  };

  const toggleZoom = (id: string) => {
    playTick();
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        if (w.isMaximized) {
          const r = w.restore!;
          return { ...w, isMaximized: false, position: r.position, size: r.size };
        }
        return {
          ...w,
          isMaximized: true,
          restore: { position: w.position, size: w.size },
          position: { x: 0, y: MENUBAR_H },
          size: { width: window.innerWidth, height: window.innerHeight - MENUBAR_H },
        };
      })
    );
  };

  const focusWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: takeZ() } : w))
    );
    setActiveId(id);
  };

  // ---- Drag & resize with global pointer listeners -------------------------
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (dragState.current) {
        const { id, offX, offY } = dragState.current;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const x = e.clientX - offX;
        const y = e.clientY - offY;
        setWindows((prev) =>
          prev.map((w) => {
            if (w.id !== id) return w;
            const titleH = w.windowType === "unified" ? 36 : 40;
            return {
              ...w,
              position: {
                x: Math.min(Math.max(x, -w.size.width + 90), vw - 90),
                y: Math.min(Math.max(y, MENUBAR_H), vh - titleH - 8),
              },
            };
          })
        );
      } else if (resizeState.current) {
        const rs = resizeState.current;
        const dx = e.clientX - rs.startX;
        const dy = e.clientY - rs.startY;
        setWindows((prev) =>
          prev.map((w) => {
            if (w.id !== rs.id) return w;
            let width = rs.startW;
            let height = rs.startH;
            let x = rs.startL;
            let y = rs.startT;
            if (rs.dir.includes("e")) width = Math.max(rs.minW, rs.startW + dx);
            if (rs.dir.includes("s")) height = Math.max(rs.minH, rs.startH + dy);
            if (rs.dir.includes("w")) {
              width = Math.max(rs.minW, rs.startW - dx);
              x = rs.startL + (rs.startW - width);
            }
            if (rs.dir.includes("n")) {
              height = Math.max(rs.minH, rs.startH - dy);
              y = rs.startT + (rs.startH - height);
            }
            return { ...w, position: { x, y }, size: { width, height } };
          })
        );
      }
    };

    const onUp = () => {
      if (dragState.current || resizeState.current) {
        dragState.current = null;
        resizeState.current = null;
        setInteractionActive(false);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const handleDragStart = (id: string, e: React.PointerEvent) => {
    if (e.button !== undefined && e.button !== 0) return;
    const win = windows.find((w) => w.id === id);
    if (!win || win.isMaximized) return;
    focusWindow(id);
    dragState.current = { id, offX: e.clientX - win.position.x, offY: e.clientY - win.position.y };
    setInteractionActive(true);
  };

  const handleResizeStart = (id: string, e: React.PointerEvent, dir: ResizeDir) => {
    if (e.button !== undefined && e.button !== 0) return;
    const win = windows.find((w) => w.id === id);
    if (!win || win.isMaximized) return;
    e.stopPropagation();
    focusWindow(id);
    const app = appMap.current.get(id);
    resizeState.current = {
      id,
      dir,
      startX: e.clientX,
      startY: e.clientY,
      startW: win.size.width,
      startH: win.size.height,
      startL: win.position.x,
      startT: win.position.y,
      minW: app?.minWidth ?? 320,
      minH: app?.minHeight ?? 240,
    };
    setInteractionActive(true);
  };

  // ---- Keyboard shortcuts --------------------------------------------------
  // Apps that own their keyboard (Calculator, FaceTime, Safari's typing game)
  // suppress the global Escape/M shortcuts so they never fight the app.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
      const activeApp = activeId ? appMap.current.get(activeId) : null;
      if (activeApp?.ownsKeyboard) return;
      if (e.key === "Escape" && activeId) closeWindow(activeId);
      if ((e.key === "m" || e.key === "M") && activeId) minimizeWindow(activeId);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  // ---- Desktop icons -------------------------------------------------------
  const desktopIcons: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: "cv", label: "Naim_Gerges_CV.pdf", icon: <CVIcon /> },
    { id: "projects", label: "Projects", icon: <FolderIcon /> },
    { id: "experience", label: "Experience", icon: <ExperienceIcon /> },
    { id: "education", label: "Education", icon: <EducationIcon /> },
    { id: "skills", label: "Skills", icon: <SkillsIcon /> },
    { id: "certifications", label: "Certifications", icon: <CertificationsIcon /> },
    { id: "languages", label: "Languages", icon: <LanguagesIcon /> },
    { id: "honors", label: "Honors & Awards", icon: <HonorsIcon /> },
    { id: "terminal", label: "Terminal", icon: <TerminalIcon /> },
    { id: "beatlab", label: "Beat Lab", icon: <BeatLabIcon /> },
    { id: "github", label: "GitHub", icon: <GitHubIcon /> },
    { id: "notes", label: "Notes", icon: <NotesIcon /> },
    { id: "facetime", label: "FaceTime", icon: <FaceTimeIcon /> },
    { id: "tictactoe", label: "Tic Tac Toe", icon: <GameIcon /> },
    { id: "music", label: "Music", icon: <MusicIcon /> },
  ];

  const openWindows = windows.filter((w) => w.isOpen);

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      onPointerDown={(e) => {
        // wake from sleep on any desktop interaction
        if (isAsleep) onWake();
      }}
    >
      {/* Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-[background-image] duration-500"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />

      {/* Desktop icons */}
      <div
        className="absolute top-[34px] left-2 md:left-3 grid grid-flow-col grid-rows-3 gap-x-1 gap-y-2 z-[1]"
        onDoubleClick={(e) => e.stopPropagation()}
      >
        {desktopIcons.map((icon) => (
          <button
            key={icon.id}
            onClick={() => launchApp(icon.id)}
            className="group flex flex-col items-center w-[86px] md:w-[92px] rounded-lg p-1.5 hover:bg-white/10 active:bg-white/20 transition-colors focus:outline-none"
          >
            <span className="w-[52px] h-[52px] md:w-[56px] md:h-[56px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
              {icon.icon}
            </span>
            <span className="mt-1 max-w-full truncate text-[11px] leading-tight text-white font-medium px-1.5 py-[1px] rounded group-hover:bg-[#0a66ff] group-active:bg-[#0a66ff]">
              {icon.label}
            </span>
          </button>
        ))}
      </div>

      <MenuBar
        activeApp={windows.find((w) => w.id === activeId)?.title ?? "Finder"}
        onLock={onLock}
        onRestart={onRestart}
        onShutDown={onShutDown}
        onOpenApp={launchApp}
      />

      {/* Windows */}
      {openWindows.map((win) =>
        win.isMinimized ? null : (
          <WindowView
            key={win.id}
            win={win}
            isActive={activeId === win.id}
            onFocus={() => focusWindow(win.id)}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onToggleZoom={() => toggleZoom(win.id)}
            onDragStart={(e) => handleDragStart(win.id, e)}
            onResizeStart={(e, dir) => handleResizeStart(win.id, e, dir)}
          >
            <WindowProvider value={{ launchApp }}>
              {appMap.current.get(win.id)?.component}
            </WindowProvider>
          </WindowView>
        )
      )}

      <Dock apps={apps} openIds={openWindows.map((w) => w.id)} onLaunch={launchApp} />

      {/* Invisible pointer shield: keeps embedded frames from swallowing
          pointer events mid-drag or mid-resize. */}
      {interactionActive && (
        <div className="fixed inset-0 z-[9999] cursor-inherit" style={{ touchAction: "none" }} />
      )}
    </div>
  );
};

export default Desktop;
