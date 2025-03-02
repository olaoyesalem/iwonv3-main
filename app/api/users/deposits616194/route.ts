import mongooseConnect from "@/lib/mongoose";
import Deposit from "@/models/Deposit";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    await mongooseConnect();
    const data = await Deposit.find({});
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
