"use client";
import React from "react";
import useTheme from "./hooks/useTheme";
import Sun from "./icons/Sun";
import Moon from "./icons/Moon";

const ThemeToggle = () => {
  const { mode, onLightMode, onDarkMode } = useTheme();

  return (
    <>
      {mode === "dark" && <Sun onClick={onLightMode} />}

      {mode === "light" && <Moon onClick={onDarkMode} />}
    </>
  );
};

export default ThemeToggle;
