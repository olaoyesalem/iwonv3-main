import React from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  sizes?: string;
}

export default function WhiteImageIcon({ sizes, ...all }: Props) {
  return (
    <div
      className={`${sizes ? sizes : "w-7 h-7"} rounded-full bg-white flex items-center justify-center p-[2px]`}
    >
      <img
        className={`max-w-full max-h-full ${all.className}`}
        {...all}
        alt=""
      />
    </div>
  );
}
