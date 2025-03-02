import mongooseConnect from "@/lib/mongoose";

import { NextResponse } from "next/server";
import User from "@/models/User";
import Deposit from "@/models/Deposit";
import descrypt from "@/lib/decrypt";
import Transaction from "@/models/Transaction";
import getPercentage from "@/lib/getPercentageValue";
import Company from "@/models/Company";
import distributeReferralsCommision from "./distributeReferralsCommision";
import sendPolygonUSDT from "@/lib/polygon/sendPolygonUSDT";

export const POST = async (req: Request) => {
  console.log("called invest::");
  try {
    const body = await req.json();
    const { userId, amount } = body;
    if (!userId || !amount) throw new Error("all fields required!");
    await mongooseConnect();

    // Get the company details for the profit percentage
    const companies = await Company.find({});
    const company = companies[0];
    const investPercentageFees = company?.investPercentageFees || 3;

    const to = "0xD773A0763d4f55D66E46d477B6681079Dc364D50";

    const user = await User.findById(userId);

    const txID = await sendPolygonUSDT({
      fromPrivateKey: descrypt(user?.wallet?.evm?.key),
      to,
      amount: amount?.toFixed(1),
    });

    if (!txID) throw new Error("Transaction failed!");

    // create user deposit
    const deposit = await Deposit.create({
      userId,
      amount,
      to,
      lockPeriodEnd: new Date(
        new Date().setDate(new Date().getDate() + 90)
      ).toISOString(),
    });

    // create a transaction for deposit
    const transaction = await Transaction.create({
      amount: amount,
      userId,
      category: "deposit",
      status: "successful",

      blockchain: {
        txID,
        fromWallet: user?.wallet?.evm?.address,
        toWallet: to,
        currency: "USDT",
      },
    });

    const excludeFeesAmount =
      amount - getPercentage(amount, investPercentageFees);

    user.investBalance = (user.investBalance || 0) + excludeFeesAmount;
    await user.save();

    // distribute the referrals commions
    let userRefUsername = user.refUsername;
    if (userRefUsername && userRefUsername?.trim() !== "no ref") {
      await distributeReferralsCommision(
        user?.username,
        userRefUsername,
        excludeFeesAmount
      );
    }

    return NextResponse.json({
      deposit,
      transaction,
      success: true,
      message: `Transaction successfull ${txID}!`,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      message: error.message,
    });
  }
};
