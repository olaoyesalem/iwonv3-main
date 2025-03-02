import descrypt from "@/lib/decrypt";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const user = (await User.findOne({
      email: "stacksagar@gmail.com",
    })) as userSchemaType;

    const address = user?.wallet?.tron?.address;
    const key = descrypt(user?.wallet?.tron?.key);
    const mnemonic = descrypt(user?.wallet?.tron?.mnemonic);
    const xpub = descrypt(user?.wallet?.tron?.xpub);
    return NextResponse.json({
      address,
      key,
      mnemonic,
      xpub,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
