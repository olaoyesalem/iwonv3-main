import React from "react";
import { redirect } from "next/navigation";
import getServerSideUser from "@/lib/getServerSideUser";

import Account from "@/components/authenticated/home/account";

export default async function page() {
  const user = await getServerSideUser();
  if (!user) return redirect("/login");

  return (
    <div className="w-full space-y-6">
      <Account user={user} />
    </div>
  );
}
