import Transaction from "@/models/Transaction";
import User from "@/models/User";

export default async function distributeReferralsCommision(
  depositUser: string,
  userRefUsername: string,
  amount: number
) {
  if (!userRefUsername) return;

  const allParentUserames = [] as string[];

  while (userRefUsername) {
    const user = (await User.findOne({
      username: userRefUsername,
    })) as userSchemaType;
    if (!user) break;

    allParentUserames.push(user?.username);
    userRefUsername = user.refUsername;
  }

  // Calculate commission per referrer
  const totalCommission = (amount * 3) / 100; // 3% of deposit amount
  const individualCommission = totalCommission / allParentUserames.length;

  // Distribute commission
  for (let i = 0; i < allParentUserames?.length; i++) {
    const username = allParentUserames[i];

    const user = await User.findOne({ username });

    user.profitBalance = (user.profitBalance || 0) + individualCommission;
    await user.save();

    await Transaction.create({
      amount: individualCommission,
      userId: user?._id,
      category: "referral-commision",
      status: "successful",

      commissionFrom: depositUser,
    });
  }

  return { totalCommission, individualCommission };
}
