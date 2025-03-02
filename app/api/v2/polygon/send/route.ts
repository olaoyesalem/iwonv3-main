import descrypt from "@/lib/decrypt";
import mongooseConnect from "@/lib/mongoose";
import sendPolygonMATIC from "@/lib/polygon/sendPolygonMATIC";
import sendPolygonUSDT from "@/lib/polygon/sendPolygonUSDT";

import User from "@/models/User";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    await mongooseConnect();
    const body = await req.json();
    const { userId, amount, to, currency } = body;

    if (!userId || !amount || !to)
      throw new Error("please provide all required fields!");

    const user = (await User.findById(userId)) as userSchemaType;
    if (!user) throw new Error("user not found");

    const key = descrypt(user?.wallet?.evm?.key);

    const txId = await (currency === "USDT"
      ? sendPolygonUSDT({
          fromPrivateKey: key,
          to,
          amount,
        })
      : sendPolygonMATIC({
          fromPrivateKey: key,
          to,
          amount: (Number(amount) - 0.005)?.toFixed(1),
        }));

    return NextResponse.json({
      message: true ? "successfully sent!" : "maybe insufficient gas fees!",
      txId: txId || "",
    });
  } catch (error: any) {
    console.log("send transaction erorr::", error);
    return NextResponse.json({
      message: error?.message || "network issue, or less gas fees!",
    });
  }
};
