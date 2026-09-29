import type { ReactNode } from "react";

export type SystemPhase = "BOOT" | "LOGIN" | "DESKTOP";

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  /** Geometry from before a zoom, so un-maximize restores it. */
  restore?: { position: { x: number; y: number }; size: { width: number; height: number } };
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  windowType: "standard" | "unified";
}

export interface AppConfig {
  id: string;
  title: string;
  icon: ReactNode;
  component: ReactNode;
  defaultWidth: number;
  defaultHeight: number;
  minWidth?: number;
  minHeight?: number;
  windowType: "standard" | "unified";
  /** Show on the desktop as an icon (all apps remain launchable from Finder). */
  onDesktop?: boolean;
  /** Show in the dock (all apps are launchable from Finder/spotlight regardless). */
  inDock?: boolean;
  /** Set on apps whose own keyboard handling must win over the desktop's
   *  global shortcuts (Escape to close, M to minimize). */
  ownsKeyboard?: boolean;
}
