import mongooseConnect from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import Transaction from "@/models/Transaction";

export const POST = async (request: Request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("UnAuthorized Access");
    const userId = (session.user as { id: string }).id;
    await mongooseConnect();

    const body: { amount: number } = await request.json();
    const user = await User.findById<userSchemaType>(userId);
    if (!user) throw new Error("User does not exist");
    if (user.investWithdrawableBalance < body.amount)
      throw new Error("Insufficient Withdrawable balance");

    //Deduct money from user invest Withdrawable balance and add to account balance
    await User.findByIdAndUpdate(userId, {
      $inc: {
        investWithdrawableBalance: -body.amount,
        accountBalance: body.amount,
      },
    });

    const newAccountBalTransaction = new Transaction<
      Omit<TransactionType, "_id">
    >({
      title: "Money Received",
      amount: body.amount,
      senderName: "Withdrawal from Investment",
      receiverName: "Sent to Account Balance",
      status: "successful",
      userId,
      category: "money-received",
    });
    const transaction = await newAccountBalTransaction.save();

    return NextResponse.json(transaction);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
