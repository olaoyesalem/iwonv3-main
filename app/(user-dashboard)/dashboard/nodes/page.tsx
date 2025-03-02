import React from "react";
import { redirect } from "next/navigation";
import getServerSideUser from "@/lib/getServerSideUser";
import UserNode from "@/models/UserNode";
import MyNodes from "./MyNodes";
import PurchaseNodeArea from "./PurchaseNodeArea";
import Node from "@/models/Node";
export default async function page() {
  const user = await getServerSideUser();

  if (!user) return redirect("/login");

  const nodes = (await Node.find()) as nodeTypes[];
  const node = nodes[0];
  const user_nodes = await UserNode.find({ userId: user?._id });

  return (
    <div>
      <div className="w-full lg:w-[800px] mx-auto space-y-6">
        <PurchaseNodeArea user={user} node={node} />

        <MyNodes user_nodes={user_nodes} />
      </div>
    </div>
  );
}
