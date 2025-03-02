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
      const depositAgeInDays =
        (new Date().getTime() - new Date(deposit.createdAt).getTime()) /
        (1000 * 3600 * 24);

      if (depositAgeInDays > 0) {
        // Ensure deposit age is valid
        const depositWas = deposit?.amount || 0;
        const amount =
          depositWas - getPercentage(depositWas, investPercentageFees || 0);

        // Get user details
        const user = await User.findById(deposit.userId);
        const totalUserProfit = Number(user?.profitBalance || "0") || 0;

        // Calculate the profit based on deposit age
        const applicableProfitPercentage =
          depositAgeInDays >= 7
            ? profitPercentage // Full profit if 7 days or more
            : (profitPercentage / 7) * depositAgeInDays; // Proportional profit for less than 7 days

        const newProfitAmount = getPercentage(
          amount,
          applicableProfitPercentage
        );

        // Update the deposit and user profit balances
        const newProfitBalance = totalUserProfit + newProfitAmount;
        const newDepositProfitBalance = totalUserProfit + newProfitAmount;

        // console.log("newProfitBalance::", newProfitBalance);
        // console.log("newDepositProfitBalance::", newDepositProfitBalance);

        if (deposit && deposit?._id)
          await Deposit.findByIdAndUpdate(deposit._id, {
            $set: { profit: newDepositProfitBalance },
          });

        if (user && user?._id) {
          await User.findByIdAndUpdate(user._id, {
            $set: { profitBalance: newProfitBalance },
          });

          await Transaction.create({
            amount: newProfitAmount,
            userId: user?._id,
            category: "profit",
            status: "successful",
          });
        }
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
