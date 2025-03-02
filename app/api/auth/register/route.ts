import User from "@/models/User";
import mongooseConnect from "../../../../lib/mongoose";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import Company from "@/models/Company";
import userSignupBonus from "./userSignupBonus";
import sendWelcomeEmail from "./sendWelcomeEmail";
import generateUserTronWallet from "./generateUserTronWallet";
import generateUserEVMWallet from "./generateUserEVMWallet";

interface UserType {
  fullname: string;
  email: string;
  username: string;
  password: string;
  refUsername: string;
}

export const POST = async (req: Request) => {
  try {
    const body: UserType = await req.json();
    const { fullname, email, username, password } = body;
    await mongooseConnect();

    const companies = await Company.find({});
    const company: CompanyProps | null = companies[0];
    if (!company) throw new Error("No Comany info");

    const hashedPassword = bcrypt.hashSync(password, 12);
    // const bonus = 500;

    const isEmailExist = await User.find({ email });
    if (isEmailExist.length > 0) {
      throw new Error("User already exist. You can login instead");
    }

    const isUsernameExist = await User.find({ username });
    if (isUsernameExist.length > 0) {
      throw new Error("This username is being used by another user");
    }

    if (body.refUsername !== "NO REF") {
      const checkReferral = await User.findOne<userSchemaType>({
        username: body.refUsername,
      });
      if (!checkReferral) throw new Error("No Referral with this username");
    }

    const users = await User.find<userSchemaType>({});

    const tron_wallet = await generateUserTronWallet();
    const evm = await generateUserEVMWallet();

    const newUser = new User({
      fullname,
      email,
      username,
      password: hashedPassword,
      refUsername: body.refUsername,
      role: users.length <= 0 ? "admin" : "user",
      manager: users.length <= 0 ? "yes" : "no",
      wallet: {
        tron: tron_wallet,
        evm,
      },
    });

    const savedUser: userSchemaType = await newUser.save();

    if (company.welcomeEmail.status === "on")
      await sendWelcomeEmail(savedUser, company);

    if (company.signupBonus.status === "on")
      await userSignupBonus(savedUser, company);

    return NextResponse.json(savedUser);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
