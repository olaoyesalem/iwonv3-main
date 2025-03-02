import nextLogger from "@/constants/logger";
import mongooseConnect from "@/lib/mongoose";
import Company from "@/models/Company";
import User from "@/models/User";
import { NextResponse } from "next/server";
import generateUserEVMWallet from "../auth/register/generateUserEVMWallet";

export const GET = async (req: Request) => {
  try {
    await mongooseConnect();
    const companies = await Company.find({});
    const company = companies[0];

    const users = (await User.find()) as userSchemaType[];

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    (async () => {
      for (const user of users) {
        if (!user?.wallet?.evm?.address) {
          const evm = await generateUserEVMWallet();

          await User.findByIdAndUpdate(
            user?._id,
            {
              $set: {
                wallet: {
                  ...(user?.wallet || {}),
                  evm,
                },
              },
            },
            { new: true }
          );
          console.count(evm.address);
        } else {
          console.count("already exist evm wallet!");
        }

        // Wait for 0.5 seconds
        await delay(1);
      }
    })();

    const investPercentageFees = company?.investPercentageFees;
    const profitPercentage = company?.profitPercentage;

    nextLogger.info("Successfully sent result to frontend!");
    return NextResponse.json({
      investPercentageFees,
      profitPercentage,
      success: true,
      users,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, errors: error });
  }
};
