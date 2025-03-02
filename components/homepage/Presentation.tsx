"use client";

import useScreenWidth from "@/hooks/useScreenWidth";
import React, { useEffect } from "react";

export default function Presentation() {
  const { screenWidth } = useScreenWidth();
  useEffect(() => {}, []);
  return (
    <div className="w-full">
      <iframe
        title="presentatioin"
        src="https://docs.google.com/presentation/d/127-MasVvqTxdKUQgfubZ5eVpBp48kTktZHZh2yjqRGA/embed?slide=id.g3272167998f_2_145"
        className="w-full"
        height={(screenWidth / 12) * (screenWidth > 1000 ? 6 : 9)}
      />
    </div>
  );
}
