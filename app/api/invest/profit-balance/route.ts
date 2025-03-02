import mongooseConnect from "@/lib/mongoose";

import { NextResponse } from "next/server";
import User from "@/models/User";
import Deposit from "@/models/Deposit";
import Transaction from "@/models/Transaction";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { userId, amount } = body;
    if (!userId || !amount) throw new Error("all fields required!");
    await mongooseConnect();

    const user = (await User.findById(userId)) as userSchemaType;
    if (!user) throw new Error("user not found!");
    if (amount > user?.profitBalance)
      throw new Error("Insufficient profit balance!");

    const deposit = await Deposit.create({
      userId,
      amount,
      lockPeriodEnd: new Date(
        new Date().setDate(new Date().getDate() + 90)
      ).toISOString(),

      from: "profitBalance",
      to: "investBalance",
    });

    const transaction = await Transaction.create({
      amount: amount,
      userId,
      category: "re-invest",
      status: "successful",
    });

    user.investBalance = (user.investBalance || 0) + amount;
    user.profitBalance = (user.profitBalance || 0) - amount;

    await (user as any).save();

    return NextResponse.json({
      deposit,
      transaction,
      success: true,
      message: `Successfully invested!`,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      message: error.message,
    });
  }
};
