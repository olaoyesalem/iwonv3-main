import mongooseConnect from "@/lib/mongoose";

import User from "@/models/User";
import Deposit from "@/models/Deposit";
import Transaction from "@/models/Transaction";

export default async function ReInvestForUser(userId: string, amount: number) {
  if (!userId || !amount)
    return {
      message: "userId or amount is required!",
    };

  await mongooseConnect();
  const user = (await User.findById(userId)) as userSchemaType;

  if (!user)
    return {
      message: "user isn't found!",
    };

  if (amount > user?.profitBalance)
    return { message: "Insufficient profit balance!" };

  const deposit = await Deposit.create({
    userId,
    amount,
    lockPeriodEnd: new Date(
      new Date().setDate(new Date().getDate() + 90)
    ).toISOString(),

    from: "profitBalance",
    to: "investBalance",
  });

  const transaction = await Transaction.create({
    amount: amount,
    userId,
    category: "re-invest",
    status: "successful",
  });

  user.investBalance = (user.investBalance || 0) + amount;
  user.profitBalance = (user.profitBalance || 0) - amount;

  await (user as any).save();

  return {
    deposit,
    transaction,
    success: true,
    message: `Successfully invested!`,
  };
}
