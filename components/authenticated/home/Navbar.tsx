"use client";
import React from "react";
import NavbarItem from "./NavbarItem";
import useTheme from "@/components/hooks/useTheme";

import WhiteImageIcon from "@/components/common/WhiteImageIcon";
import { FaCog } from "react-icons/fa";

const Navbar = () => {
  const { mode } = useTheme();
  return (
    <div
      className={`${mode === "dark" ? "bg-black border border-gray-800 border-opacity-60" : "bg-gray-50 border border-gray-100"} flex items-center justify-between px-3 sm:px-10 shadow-sm py-3 rounded`}
    >
      <NavbarItem exact_path link="/account">
        <WhiteImageIcon src="/assets/img/icon/wallet.png" />
        Wallet
      </NavbarItem>
      <NavbarItem exact_path link="/account/invest-and-earn">
        <WhiteImageIcon src="/assets/img/icon/invest.png" />
        <span className="hidden sm:inline-block"> </span> Earnings
      </NavbarItem>
      <NavbarItem exact_path link="/account/settings">
        <FaCog size={17} />
        Settings
      </NavbarItem>
    </div>
  );
};

export default Navbar;
