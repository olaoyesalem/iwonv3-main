import mongooseConnect from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";
import ReInvestForUser from "../ReInvestForUser";

export const POST = async () => {
  try {
    await mongooseConnect();

    const users: userSchemaType[] = await User.find();

    for (let user of users) {
      if (user?.profitBalance) {
        if (user?.autoReInvest === "always") {
          const data = await ReInvestForUser(user._id, user.profitBalance);
          console.log(`always-data for ${user?.username}:: `, data?.message);
        } else if (user?.autoReInvest === "date" && user?.autoReInvestDate) {
          const today = new Date().getTime();
          const userReInvestDate = new Date(user.autoReInvestDate).getTime();

          // Check if the reinvest date is today or in the future
          if (userReInvestDate >= today) {
            const data = await ReInvestForUser(user._id, user.profitBalance);
            console.log(` data for ${user?.username}:: `, data?.message);
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, errors: error });
  }
};
