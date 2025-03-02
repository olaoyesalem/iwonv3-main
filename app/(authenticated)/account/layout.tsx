import Navbar from "@/components/authenticated/home/Navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col py-3 md:py-0 pb-8 gap-3 sm:gap-6 w-full">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
