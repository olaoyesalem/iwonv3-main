import Node from "@/models/Node";
import React from "react";
import NodeDetails from "./NodeDetails";
import UserNodes from "./UserNodes";
import UserNode from "@/models/UserNode";

const Page = async () => {
  const nodes = (await Node.find()) as nodeTypes[];
  const user_nodes = (await UserNode.find().populate(
    "userId"
  )) as userNodeTypes[];

  const node = nodes[0];

  return (
    <div className="flex flex-col w-full pb-10">
      <div
        className={`text-xl sm:text-2xl font-bold 
        flex justify-center`}
      >
        Nodes Pre-Sale
      </div>
      <div className="w-full lg:w-[800px] mx-auto">
        <br />
        <NodeDetails node={node} />
        <br />
        <UserNodes user_nodes={user_nodes} />
      </div>
    </div>
  );
};

export default Page;
