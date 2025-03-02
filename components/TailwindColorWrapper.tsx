"use client";
import React from "react";
import useTheme from "./hooks/useTheme";

const TailwindColorWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { mode } = useTheme();
  return (
    <main className={`${mode === "dark" ? "!text-white" : "!text-gray-800"}`}>
      {children}
    </main>
  );
};

export default TailwindColorWrapper;
