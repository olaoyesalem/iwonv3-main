"use client";

import React from "react";
import Link from "next/link";
import useThemeFixedClasses from "@/components/hooks/useThemeFixedClasses";
import ThemeToggle from "../ThemeToggle";
import useTheme from "../hooks/useTheme";

export default function AuthHeader() {
  const { classes } = useThemeFixedClasses();
  const { mode } = useTheme();
  return (
    <header className={`${classes()} w-full flex items-center justify-between`}>
      <nav
        className={`w-full h-20 px-4 lg:px-6 flex flex-wrap justify-between items-center mx-auto max-w-screen-xl`}
      >
        <Link href="/" className="h-full flex items-center">
          <img
            src={
              mode === "dark"
                ? "/logo-white-landscape.png"
                : "/logo-black-landscape.png"
            }
            alt="logo"
            className="w-32"
          />
        </Link>
        <div className="flex items-center lg:order-2">
          <ThemeToggle />
        </div>
        <div
          className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <Link
                href="/"
                className="block py-2 pr-4 pl-3 rounded lg:bg-transparent lg:p-0 hover:text-blue-600"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block py-2 pr-4 pl-3 rounded lg:bg-transparent lg:p-0 hover:text-blue-600"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block py-2 pr-4 pl-3 rounded lg:bg-transparent lg:p-0 hover:text-blue-600"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
