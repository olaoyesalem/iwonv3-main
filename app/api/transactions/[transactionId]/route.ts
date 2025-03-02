import mongooseConnect from "@/lib/mongoose";
import Transaction from "@/models/Transaction";
import User from "@/models/User";
import { NextResponse } from "next/server";

interface ParamsProps {
  params: { transactionId: string };
}

export const GET = async (_req: Request, { params }: ParamsProps) => {
  try {
    await mongooseConnect();
    const transaction = await Transaction.findOne({
      _id: params.transactionId,
    });

    if (!transaction) throw new Error("This transaction does not exist");
    const user = await User.findById(transaction?.userId);

    return NextResponse.json({ ...transaction?._doc, user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};

export const PUT = async (req: Request, { params }: ParamsProps) => {
  try {
    const body = await req.json();
    const updateData = body;
    const tId = params.transactionId;

    await mongooseConnect();
    const transaction = await Transaction.findById(tId);
    if (!transaction) throw new Error("This transaction does not exist");

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      tId,
      { $set: { ...updateData } },
      { new: true }
    );

    const user = await User.findById(transaction?.userId);

    return NextResponse.json({ ...updatedTransaction?._doc, user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
