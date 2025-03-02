import mongooseConnect from "@/lib/mongoose";
import Transaction from "@/models/Transaction";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    await mongooseConnect();

    const transactionsData = (await Transaction.find({
      category: "profit",
    })) as TransactionType[];

    const transactions = transactionsData?.filter((t) => {
      const todayDate = new Date("Sun Feb 21 2025").toLocaleDateString();
      const trDate = new Date(t?.createdAt).toLocaleDateString();
      return todayDate === trDate;
    });

    const transactionMap = new Map();
    const duplicateTransactions: TransactionType[] = [];

    // Identify duplicate transactions
    transactions.forEach((t) => {
      const key = `${t.userId}-${t.amount?.toFixed(1)}`;
      if (transactionMap.has(key)) {
        duplicateTransactions.push(t);
      } else {
        transactionMap.set(key, t);
      }
    });

    //::  Now, uniqueTransactions contains only one instance of each transaction
    //::  Deduct duplicate transaction amounts from users

    duplicateTransactions.forEach(async (dup) => {
      await User.findByIdAndUpdate(dup.userId, {
        $inc: { profitBalance: -dup.amount },
      });

      await Transaction.findByIdAndDelete(dup._id);
    });

    return NextResponse.json({
      total: transactions.length,
      totalTransactionsData: transactionsData.length,
      totalDuplicate: duplicateTransactions.length,
      duplicateTransactions,
      transactionsData,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
