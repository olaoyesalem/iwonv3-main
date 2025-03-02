import React from "react";
import DashboardSidebar from "./DashboardSidebar";

export default function layout({ children }: any) {
  return (
    <div className="w-full min-h-screen lg:flex items-start bg-white text-gray-900 pt-[88px] relative">
      <DashboardSidebar />
      <div className="px-3 sm:p-5 w-full">{children}</div>
    </div>
  );
}
