import React from "react";

interface Props {
  title: string;
  desc: string;
  children: React.ReactNode;
}
export default function ContentTitleAndDes({ title, desc, children }: Props) {
  return (
    <div className="gap-mb-40">
      <div>
        <h3 className="text-xl md:text-2xl font-semibold gap-mb-40 sm:max-w-[856px] w-full text-gray-200">
          {title}
        </h3>
        <br />
        <p className="my-text-16 text-foundation-blue-30 mb-4 font-medium text-gray-300">
          {desc}
        </p>
        {children}
      </div>
    </div>
  );
}
