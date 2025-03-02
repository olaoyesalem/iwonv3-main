"use client";

import React, { useState } from "react";
import menu_data from "@/data/MenuData";
import Icon from "@/components/common/FontawesomeIcon";
import { usePathname } from "next/navigation";
import Link from "next/link";

const MobileMenus = ({ setIsActive }: any) => {
  const [navTitle, setNavTitle] = useState("");
  const currentRoute = usePathname();

  const isMenuItemActive = (menuLink: any) => {
    return currentRoute === menuLink;
  };

  const isSubMenuItemActive = (subMenuLink: any) => {
    return currentRoute === subMenuLink;
  };

  const closeSidebar = () => {
    setIsActive(false);
  };

  //openMobileMenu
  const openMobileMenu = (menu: any) => {
    if (navTitle === menu) {
      setNavTitle("");
    } else {
      setNavTitle(menu);
    }
  };

  return (
    <>
      <ul id="mobile-menu-active">
        {menu_data
          .filter((items) => items.page === "home_1")
          .map((menu, i) => (
            <React.Fragment key={i}>
              {menu.has_dropdown && (
                <li
                  onClick={() => openMobileMenu(menu.title)}
                  className={`${menu.has_dropdown ? "dropdown" : ""}`}
                >
                  <Link
                    href={menu.link}
                    className={` ${
                      isMenuItemActive(menu.link) ||
                      (menu.sub_menus &&
                        menu.sub_menus.some(
                          (sub_m) =>
                            sub_m.link && isSubMenuItemActive(sub_m.link)
                        ))
                        ? "active"
                        : ""
                    }`}
                  >
                    <span>{menu.title}</span>
                  </Link>
                  <div
                    className={`dropdown-btn ${
                      navTitle === menu.title ? "open" : ""
                    }`}
                    onClick={() => openMobileMenu(menu.title)}
                  >
                    <Icon icon="angle-down" />
                  </div>
                  {menu.sub_menus && menu.sub_menus.length > 0 && (
                    <ul
                      className="sub-menu"
                      style={{
                        display: navTitle === menu.title ? "block" : "none",
                      }}
                    >
                      {menu.sub_menus.map((sub, index) => (
                        <li key={index}>
                          <Link
                            href={sub.link}
                            className={
                              sub.link && isSubMenuItemActive(sub.link)
                                ? "active"
                                : ""
                            }
                          >
                            {sub.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )}
              {!menu.has_dropdown && (
                <li onClick={closeSidebar}>
                  <Link
                    href={menu.link}
                    className={`${currentRoute === menu.link ? "active" : ""}`}
                  >
                    {menu.title}
                  </Link>
                </li>
              )}
            </React.Fragment>
          ))}
      </ul>
    </>
  );
};

export default MobileMenus;
