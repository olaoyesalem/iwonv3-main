"use cliet";

import { useEffect, useState } from "react";

export default function useScreenWidth() {
  const [screenWidth, setScreenWidth] = useState(1920);

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  return { screenWidth, setScreenWidth };
}
