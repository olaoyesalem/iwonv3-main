import nextLogger from "@/constants/logger";
import mongooseConnect from "@/lib/mongoose";
import Company from "@/models/Company";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await mongooseConnect();
    const companies = await Company.find({});
    const company = companies[0];

    const investPercentageFees = company?.investPercentageFees;
    const profitPercentage = company?.profitPercentage;

    nextLogger.info("Successfully sent result to frontend!");
    return NextResponse.json({
      investPercentageFees,
      profitPercentage,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, errors: error });
  }
};
