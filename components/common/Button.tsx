"use client";
import classNames from "classnames";
import { useEffect, useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children?: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "responsive" | "custom";
  selected?: boolean;
  color?:
    | "blue"
    | "gray"
    | "white"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "tear"
    | "cyan"
    | "sky"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose"
    | "primary"
    | "custom";
}

const Button = ({
  size,
  color,
  loading,
  selected,
  children,
  ...rest
}: ButtonProps) => {
  const [dynamicClasses, setDynamicClass] = useState<any>();

  useEffect(() => {
    setDynamicClass(
      classNames({
        "px-1 py-1 text-xs font-normal": size === "xs",
        "px-1 py-1.5 text-xs font-normal": size === "sm",
        "px-3 py-[7px] text-xs font-normal": size === "md",
        "px-[10px] py-[8px]": size === "lg" || !size,
        "px-5 py-3": size === "xl",
        "px-0.5 py-2 text-xs sm:px-2.5 sm:py-2.5 sm:text-base":
          size === "responsive",
        " ": size === "custom",

        "hover:bg-blue-600 bg-primary text-white":
          color === "primary" || !color,
        "hover:bg-gray-600 bg-gray-500 text-white": color === "gray",
        "hover:bg-red-600 bg-red-500 text-white": color === "red",
        "hover:bg-orange-600 bg-orange-500 text-white": color === "orange",
        "hover:bg-amber-600 bg-amber-500 text-white": color === "amber",
        "hover:bg-yellow-600 bg-yellow-500 text-white": color === "yellow",
        "hover:bg-lime-600 bg-lime-500 text-white": color === "lime",
        "hover:bg-green-700 bg-green-600 text-white": color === "green",
        "hover:bg-tear-600 bg-tear-500 text-white": color === "tear",
        "hover:bg-cyan-600 bg-cyan-500 text-white": color === "cyan",
        "hover:bg-sky-600 bg-sky-500 text-white": color === "sky",
        "hover:bg-indigo-600 bg-indigo-500 text-white": color === "indigo",
        "hover:bg-violet-600 bg-violet-500 text-white": color === "violet",
        "hover:bg-purple-600 bg-purple-500 text-white": color === "purple",
        "hover:bg-fuchsia-600 bg-fuchsia-500 text-white": color === "fuchsia",
        "hover:bg-pink-600 bg-pink-500 text-white": color === "pink",
        "hover:bg-rose-600 bg-rose-500 text-white": color === "rose",
        "hover:bg-gray-100 bg-white text-gray-900": color === "white",
        "hover:bg-blue-600 bg-blue-500 text-white": color === "blue",
        "": color === "custom",
        ring: selected,
      })
    );
  }, [size]);

  return (
    <button
      {...rest}
      type={rest.type || "button"}
      disabled={rest.disabled || loading}
      className={`w-full inline-flex justify-center items-center gap-2 rounded border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:cursor-not-allowed !cursor-pointer ${dynamicClasses} ${rest.className} disabled:cursor-not-allowed disabled:!bg-opacity-80`}
    >
      <span></span>
      <div className="flex items-center gap-x-0.5 sm:gap-x-1 whitespace-nowrap">
        {children}
      </div>

      {loading ? (
        <span className="block ml-1.5 sm:ml-4 w-4 h-4 sm:w-6 sm:h-6 rounded-full animate-spin border-[3px] sm:border-4 border-r-transparent"></span>
      ) : (
        <span> </span>
      )}
    </button>
  );
};

export default Button;
