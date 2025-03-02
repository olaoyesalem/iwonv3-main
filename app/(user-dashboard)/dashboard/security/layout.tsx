import React from "react";

export default function layout({ children }: any) {
  return (
    <div className="w-full md:max-w-[500px] mx-auto py-12 space-y-6">
      {children}
    </div>
  );
}
