import React from "react";
import { redirect } from "next/navigation";
import getServerSideUser from "@/lib/getServerSideUser";

import TransactionsTable from "./TransactionsTable";
import Transaction from "@/models/Transaction";

export default async function page() {
  const user = await getServerSideUser();
  if (!user) return redirect("/login");

  const data = await Transaction.find({ userId: user?._id });

  return (
    <div className="w-full space-y-6">
      <TransactionsTable data={data} />
    </div>
  );
}
