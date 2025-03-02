import mongooseConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";
import nextLogger from "@/constants/logger";
import Company from "@/models/Company";

export const POST = async (_req: Request) => {
  try {
    await mongooseConnect();

    // Get the company details for the profit percentage
    const companies = await Company.find({});
    const company = companies[0];

    company.count = (company?.count || 0) + 1;
    await company.save();

    return NextResponse.json({
      message: "operation successful!",
      count: company.count,
    });
  } catch (error: any) {
    nextLogger.error(`Error during CRON operation: ${error.message}`);
    return NextResponse.json({ error: error.message });
  }
};
