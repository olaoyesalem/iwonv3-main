"use client";
import React, { useEffect } from "react";
import useTheme from "../hooks/useTheme";
import useDynamicClasses from "../hooks/useDynamicClasses";

const Container = ({ children }: { children: React.ReactNode }) => {
  const { mode } = useTheme();
  const { dynamicClasses } = useDynamicClasses();

  return (
    <div
      className={`flex items-center 
    justify-center min-h-[calc(100vh-80px)] ${
      mode === "light"
        ? "bg-white"
        : " bg-[#121212] transition-colors duration-500"
    }`}
    >
      <div
        className={`${dynamicClasses("lg:bg-[#191919] bg-opacity-5", "lg:bg-gray-100")} lg:bg-opacity-50 lg:px-6 lg:py-9 rounded lg:shadow w-[500px] max-w-[90%] flex flex-col items-center gap-10`}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
