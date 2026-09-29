import React, { createContext, useContext } from "react";

/**
 * Lets apps (Finder, Terminal) launch other apps without the Desktop
 * prop-drilling through every component tree.
 */
const WindowContext = createContext<{ launchApp: (id: string) => void }>({
  launchApp: () => {},
});

export const WindowProvider = WindowContext.Provider;

export const useLauncher = () => useContext(WindowContext);
