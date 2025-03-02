import mongooseConnect from "@/lib/mongoose";

import { NextResponse } from "next/server";
import User from "@/models/User";
import Deposit from "@/models/Deposit";
import Transaction from "@/models/Transaction";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { userId, amount, onlyForTransaction } = body;
    if (!userId || !amount) throw new Error("all fields required!");
    await mongooseConnect();

    const user = await User.findById(userId);

    // create user deposit
    const deposit = await Deposit.create({
      userId,
      amount,
      lockPeriodEnd: new Date(
        new Date().setDate(new Date().getDate() + 90)
      ).toISOString(),
      to: "deposit balance",
    });

    // create a transaction for deposit
    const transaction = await Transaction.create({
      amount: amount,
      userId,
      category: "deposit",
      status: "successful",
    });

    if (!onlyForTransaction) {
      user.investBalance = (user.investBalance || 0) + amount;
      await user.save();
    }

    return NextResponse.json({
      deposit,
      transaction,
      success: true,
      message: `Deposit created!`,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      message: error.message,
    });
  }
};
