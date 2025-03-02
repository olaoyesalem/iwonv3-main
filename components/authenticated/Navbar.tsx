"use client";
import React from "react";
import Logo from "../Logo";
import useTheme from "../hooks/useTheme";
import ThemeToggle from "../ThemeToggle";
import NavbarItem from "./home/NavbarItem";

const Navbar = () => {
  const { mode } = useTheme();

  return (
    <nav
      className={`shadow-sm flex justify-between 
    items-center px-4 sm:px-10 fixed 
    w-full py-3 z-30
     top-0 transition-colors duration-500
    ${mode === "light" ? "bg-gray-50" : "bg-gray-900"}`}
    >
      <Logo />

      <div className="flex items-center gap-x-4 md:gap-x-10">
        <ThemeToggle />
        <NavbarItem link="/dashboard"> Dashboard </NavbarItem>

        <NavbarItem link="/profile">Profile</NavbarItem>
      </div>
    </nav>
  );
};

export default Navbar;
