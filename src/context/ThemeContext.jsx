import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setModeState] = useState(
    () => localStorage.getItem("themeMode") || "auto"
  );

  const computedMode =
    mode === "auto"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : mode;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", computedMode === "dark");
    localStorage.setItem("themeMode", mode);
  }, [computedMode, mode]);

  const setMode = (newMode) => setModeState(newMode);
  const toggleMode = () =>
    setModeState((prev) =>
      prev === "light" ? "dark" : prev === "dark" ? "auto" : "light"
    );
  const clearMode = () => setModeState("auto");

  const value = { mode, computedMode, setMode, toggleMode, clearMode };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeContext);
