import mongooseConnect from "@/lib/mongoose";
import Transaction from "@/models/Transaction";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    await mongooseConnect();
    const body = await request.json();

    const { amount, senderId, receiverUsername } = body;
    if (!amount || !senderId || !receiverUsername)
      throw new Error("all fields required!");

    const transfer_amount = Number(amount || "0");

    const sender = (await User.findById(senderId)) as userSchemaType;
    const receiver = (await User.findOne({
      username: receiverUsername,
    })) as userSchemaType;

    if (!receiver) throw new Error("Receiver not found!");

    const sender_balance = sender?.profitBalance || 0;
    const receiver_balance = receiver?.profitBalance || 0;

    if (transfer_amount > sender_balance)
      throw new Error("Insufficient balance!");

    receiver.profitBalance = receiver_balance + transfer_amount;
    sender.profitBalance = sender_balance - transfer_amount;

    await (receiver as any).save();
    await (sender as any).save();

    const transaction = await Transaction.create({
      amount,
      userId: senderId,
      receiverId: receiver?._id,
      category: "transfer",
      status: "successful",
    });

    return NextResponse.json({
      success: true,
      message: "successfully transfered!",
      transaction,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
};
