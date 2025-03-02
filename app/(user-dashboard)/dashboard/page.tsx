import React from "react";
import { redirect } from "next/navigation";
import getServerSideUser from "@/lib/getServerSideUser";

import CopyIconButton from "@/components/common/CopyIconButton";
import Referrals from "./Referrals";
import User from "@/models/User";
import BalanceCards from "./modals/BalanceCards";
import MistakeMessage from "./MistakeMessage";

export default async function page() {
  const user = await getServerSideUser();
  if (!user) return redirect("/login");

  const userId = user?._id;

  const referrals = await User.find({ refUsername: user?.username });

  return (
    <div className="w-full space-y-6">
      {user?.note_message ? (
        <p className="mb-2 text-base text-yellow-800 bg-yellow-50 p-3 rounded max-w-3xl">
          {user?.note_message}
        </p>
      ) : null}

      {userId?.toString() === "6765e4bf310d87982288f121" ||
      userId?.toString()?.includes("6765e4bf310d87982288f121") ? (
        <MistakeMessage />
      ) : null}

      <BalanceCards user={user} />

      <div>
        <h2 className="text-xl font-bold my-3">
          Your Friends <small> ({referrals?.length}) </small>
        </h2>
        <div className="bg-gray-100 p-3 rounded shadow-sm">
          <div className="text-gray-900">Invite Friends.</div>
          <CopyIconButton value={`https://iwon.vc/register/${user?.username}`}>
            <span className="text-blue-600">
              {`https://iwon.vc/register/${user?.username}`}
            </span>
          </CopyIconButton>
        </div>
      </div>

      <Referrals referrals={referrals} />
    </div>
  );
}
