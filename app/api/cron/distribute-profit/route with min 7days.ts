import mongooseConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";
import nextLogger from "@/constants/logger";
import Deposit from "@/models/Deposit";
import User from "@/models/User";
import getPercentage from "@/lib/getPercentageValue";
import Company from "@/models/Company";
import Transaction from "@/models/Transaction";

export const POST = async (_req: Request) => {
  try {
    await mongooseConnect();

    // Get the company details for the profit percentage
    const companies = await Company.find({});
    const company = companies[0];
    const profitPercentage = company?.profitPercentage || 0;
    const investPercentageFees = company?.investPercentageFees || 0;

    // Get all deposits
    const deposits = await Deposit.find();

    for (const deposit of deposits) {
      // Check if the deposit is older than 7 days
      const depositAgeInDays =
        (new Date().getTime() - new Date(deposit.createdAt).getTime()) /
        (1000 * 3600 * 24);

      if (depositAgeInDays > 0) {
        const depositWas = deposit?.amount || 0;
        const amount =
          depositWas - getPercentage(depositWas, investPercentageFees || 0);

        const totalDepositProfit = deposit?.profit || 0;

        // Get user details
        const user = await User.findById(deposit.userId);
        const totalUserProfit = user?.profitBalance || 0;

        // Calculate the new profit amount
        const newProfitAmount = getPercentage(amount, profitPercentage);

        // Update the deposit and user profit balances
        deposit.profit = totalDepositProfit + newProfitAmount;
        user.profitBalance = totalUserProfit + newProfitAmount;
        // Save the updated deposit and user data
        await deposit.save();
        await user.save();

        await Transaction.create({
          amount: newProfitAmount,
          userId: user?._id,
          category: "profit",
          status: "successful",
        });
      }
    }

    return NextResponse.json({
      message: "CRON operation was successful",
    });
  } catch (error: any) {
    nextLogger.error(`Error during CRON operation: ${error.message}`);
    return NextResponse.json({ error: error.message });
  }
};
