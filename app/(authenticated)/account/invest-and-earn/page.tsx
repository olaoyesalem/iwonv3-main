import React from "react";
import Investments from "./Investments";
import Profits from "./Profits";
import { redirect } from "next/navigation";
import getServerSideUser from "@/lib/getServerSideUser";
import UserInvestments from "./UserInvestments";

export default async function page() {
  const user = await getServerSideUser();
  if (!user) return redirect("/login");

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <Investments user={user} />
        <Profits user={user} />
      </div>

      <UserInvestments user={user} />
    </div>
  );
}
