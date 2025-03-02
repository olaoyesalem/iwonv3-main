import React from "react";
import useTheme from "../hooks/useTheme";
interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export default function Text({ children, ...all }: Props) {
  const { mode } = useTheme();

  return (
    <span
      {...all}
      className={`${mode === "dark" ? "!text-gray-100" : "!text-gray-800"}`}
    >
      {children}
    </span>
  );
}
