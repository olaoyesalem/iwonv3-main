import mongooseConnect from "@/lib/mongoose";

import { NextResponse } from "next/server";
import Deposit from "@/models/Deposit";

export const GET = async (
  _req: Request,
  { params: { userId } }: { params: { userId: string } }
) => {
  try {
    await mongooseConnect();
    const deposits = await Deposit.find({ userId, status: "success" });
    return NextResponse.json(deposits);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
};
