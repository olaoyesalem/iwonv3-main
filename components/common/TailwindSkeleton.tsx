import React from "react";
import useTheme from "../hooks/useTheme";
interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function TailwindSkeleton({ className, ...all }: Props) {
  const { mode } = useTheme();
  return (
    <div
      {...all}
      className={`${mode === "dark" ? "from-gray-700 to-gray-800" : "from-gray-200 to-gray-300"}  w-full h-full bg-gradient-to-tr animate-pulse ${className}`}
    ></div>
  );
}
