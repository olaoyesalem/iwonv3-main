"use client";

import { useState, useEffect } from "react";
import Icon from "./FontawesomeIcon";
import UseSticky from "../hooks/UseSticky";

const ScrollToTop = () => {
  const { sticky }: { sticky: boolean } = UseSticky();

  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [checkScrollTop]);

  return (
    <>
      <div
        onClick={scrollTop}
        className={`progress-wrap style-2 ${sticky ? "active-progress" : ""}`}
      >
        <Icon icon="chevron-up" />
      </div>
    </>
  );
};

export default ScrollToTop;
