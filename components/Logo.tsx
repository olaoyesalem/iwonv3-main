"use client";
import React from "react";
import useTheme from "./hooks/useTheme";
import { useRouter } from "next/navigation";
import useCompany from "./hooks/useCompany";

interface LogoProps {
  home?: boolean;
  onClick?: () => void;
}

const Logo = ({}: LogoProps) => {
  const { mode } = useTheme();
  const router = useRouter();
  const goHome = () => {
    router.push("/");
  };

  return (
    <>
      <img
        onClick={goHome}
        src={
          mode === "dark"
            ? "/logo-white-landscape.png"
            : "/logo-black-landscape.png"
        }
        alt="logo"
        className="sm:w-32 w-28"
      />
    </>
  );
};

export default Logo;
