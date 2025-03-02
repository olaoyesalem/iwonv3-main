"use client";

import { useState } from "react";

import NavMenuThree from "./Menu/NavMenuThree";
import Sidebar from "./Menu/Sidebar";

import Link from "next/link";
import UseSticky from "../hooks/UseSticky";
import Button from "../Button";
import Icon from "../common/FontawesomeIcon";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Header = () => {
  const { data: session } = useSession();
  const { sticky } = UseSticky();
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      <header className="site-header header--transparent ico-header">
        <div
          className={`header__main-wrap stricky  ${
            sticky ? "sticky-menu" : ""
          }`}
        >
          <div className="container">
            <div className="header__main ul_li_between">
              <div className="header__left ul_li">
                <div className="header__logo">
                  <Link href="/">
                    <img
                      src={"/logo-white-landscape.png"}
                      alt="logo"
                      className="sm:w-32 w-28"
                    />
                  </Link>
                </div>
              </div>
              <div className="main-menu__wrap ul_li navbar navbar-expand-xl">
                <nav className="main-menu collapse lg:visible navbar-collapse">
                  <NavMenuThree />
                </nav>
              </div>
              <div className="header__action ul_li">
                <div className="d-xl-none">
                  <div className="flex items-center">
                    {session?.user ? (
                      <Link className="w-full" href={"/dashboard"}>
                        <button className="px-3 py-2 rounded bg-white text-black focus:ring">
                          <Icon
                            className="hidden sm:inline-block mr-1"
                            icon="user-cog"
                          />
                          Dashboard
                        </button>
                      </Link>
                    ) : (
                      <Link className="w-full" href={"/login"}>
                        <button className="px-6 py-2.5 rounded bg-white text-black focus:ring">
                          <Icon icon="user" /> Login
                        </button>
                      </Link>
                    )}
                    <a
                      onClick={() => setIsActive(true)}
                      className="header__bar hamburger_menu"
                      style={{ cursor: "pointer" }}
                    >
                      <div className="header__bar-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="d-none d-xl-block">
                  {session?.user ? (
                    <Link className="w-full" href={"/dashboard"}>
                      <button
                        style={{ padding: "8px 16px" }}
                        className="rounded bg-white text-black focus:ring"
                      >
                        <Icon icon="user-cog" /> Dashboard
                      </button>
                    </Link>
                  ) : (
                    <Link className="w-full" href={"/login"}>
                      <button className="px-6 py-2.5 rounded bg-white text-black focus:ring">
                        <Icon icon="user" /> Login / Register
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Sidebar isActive={isActive} setIsActive={setIsActive} style_2={true} />
    </>
  );
};

export default Header;
