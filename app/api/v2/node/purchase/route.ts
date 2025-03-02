import mongooseConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Node from "@/models/Node";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserNode from "@/models/UserNode";
import Transaction from "@/models/Transaction";
import User from "@/models/User";
import calculateNodePurchaseAmount from "./calculateNodePurchaseAmount";
import getPolygonBalance from "../../polygon/balance/[address]/getPolygonBalance";
import descrypt from "@/lib/decrypt";
import sendPolygonUSDT from "@/lib/polygon/sendPolygonUSDT";
import { adminTronFundsReceiver } from "@/config/admin";

// purchase node
export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);
    const userSession = session?.user as UserSession;
    const userId = userSession?.id;
    if (!userId) throw new Error("UnAuthorized Access");

    await mongooseConnect();
    const { nodeId, seats } = await req.json();
    const purchase_seats =
      typeof seats === "number" ? seats : Number(seats || "0");

    const user = (await User.findById(userId)) as userSchemaType;
    const node = await Node.findById(nodeId);
    if (!user || !node) throw new Error("user or node aren't exist!");

    const { usdt: availableUSDT } = await getPolygonBalance(
      user?.wallet?.evm?.address
    );

    const purchaseCalculatedData = calculateNodePurchaseAmount(
      node,
      purchase_seats
    );

    const totalCost = Number(purchaseCalculatedData.totalAmount?.toFixed(2));

    if (!totalCost || !availableUSDT)
      throw new Error("error with totalCost & availableUSDT");

    if (totalCost > availableUSDT) {
      return NextResponse.json({
        error: "Failed, please check balance, or try again!",
      });
    }

    const txID = await sendPolygonUSDT({
      fromPrivateKey: descrypt(user?.wallet?.evm?.key),
      to: "0x4d70541c0e0eF755d1cc8B003e6d37D7468ec497",
      amount: totalCost?.toFixed(1),
    });
    if (!txID) throw new Error("Transaction failed!");

    const blockchain = {
      txID,
      fromWallet: user.wallet?.evm?.address,
      toWallet: adminTronFundsReceiver,
      currency: "USDT",
    };

    const userNode = (await UserNode.create({
      userId,
      nodeId,
      seats_purchased: purchase_seats,

      price: node.price,
      totalCost,

      purchaseCalculatedData,
      blockchain,
    })) as userNodeTypes;

    const transaction = await Transaction.create({
      userId,
      nodeId,
      userNodeId: userNode._id,

      amount: totalCost,
      category: "node-purchase",
      status: "successful",

      nodePurchaseAdditional: purchaseCalculatedData,
      blockchain,
    });

    node.sold_seats = node.sold_seats + purchase_seats;
    node.total_sold_amount = node.total_sold_amount + totalCost;
    await node.save();

    return NextResponse.json({
      userNode,
      transaction,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
