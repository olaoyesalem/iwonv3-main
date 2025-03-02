import React from "react";
import { redirect } from "next/navigation";
import getServerSideUser from "@/lib/getServerSideUser";

import DepositsTable from "./DepositsTable";
import Deposit from "@/models/Deposit";

export default async function page() {
  const user = await getServerSideUser();
  if (!user) return redirect("/login");

  const data = await Deposit.find({ userId: user?._id });

  return (
    <div className="w-full space-y-6">
      <DepositsTable data={data} />
    </div>
  );
}
