import mongooseConnect from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import Transaction from "@/models/Transaction";
import descrypt from "@/lib/decrypt";
import Deposit from "@/models/Deposit";
import getPercentage from "@/lib/getPercentageValue";
import { adminPolygonFundsSender } from "@/config/admin";
import sendPolygonUSDT from "@/lib/polygon/sendPolygonUSDT";

export const POST = async (request: Request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("UnAuthorized Access");

    await mongooseConnect();
    const body = await request.json();

    const { amount, withdrawalAddress, userId, onlyForTransaction } = body;

    if (!amount || !withdrawalAddress) throw new Error("all fields required!");

    const deposits = await Deposit.find({ userId, status: "success" });

    if (deposits?.length < 1)
      return NextResponse.json({
        error: `need min 1 deposit to withdraw`,
      });

    const user = await User.findById<userSchemaType>(userId);

    const admin = await User.findOne({
      "wallet.evm.address": adminPolygonFundsSender,
    });

    if (!user) throw new Error("User does not exist");
    if (!admin) throw new Error("Problem with paying admin wallet!");

    if (user.profitBalance < amount)
      throw new Error("Insufficient Withdrawable balance");

    const feesPercentage = amount > 1000 ? 7 : 5;
    const userReceivableAmount = amount - getPercentage(amount, feesPercentage);

    let txID;

    if (!onlyForTransaction) {
      txID = await sendPolygonUSDT({
        fromPrivateKey: descrypt(admin?.wallet?.evm?.key),
        to: withdrawalAddress,
        amount: userReceivableAmount?.toFixed(1),
      });
    }

    await User.findByIdAndUpdate(userId, {
      $inc: {
        profitBalance: -amount,
      },
    });

    const transaction = await Transaction.create({
      withdrawalAddress,
      amount: amount,
      userId,
      category: "withdrawal",
      status: "paid",

      blockchain: {
        txID,
        fromWallet: admin?.wallet?.evm?.address,
        toWallet: user?.wallet?.evm?.address,
        currency: "USDT",
      },
    });

    return NextResponse.json({
      transaction,
      profitBalance: user?.profitBalance - amount,
    });
  } catch (error: any) {
    console.log("withdraw error:: ", error);
    return NextResponse.json({
      message: error?.message,
      error: error?.message,
      errors: error,
    });
  }
};
