import mongooseConnect from "@/lib/mongoose";

import { NextResponse } from "next/server";
import User from "@/models/User";
import Transaction from "@/models/Transaction";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { userId, amount, onlyForTransaction } = body;
    if (!userId || !amount) throw new Error("all fields required!");
    await mongooseConnect();

    const user = await User.findById(userId);

    // create a transaction for deposit
    const transaction = await Transaction.create({
      amount: amount,
      userId,
      category: "profit",
      status: "successful",
    });

    if (!onlyForTransaction) {
      user.profitBalance = (user.profitBalance || 0) + amount;
      await user.save();
    }

    return NextResponse.json({
      transaction,
      success: true,
      message: `Profit created!`,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      message: error.message,
    });
  }
};
