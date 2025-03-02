import mongooseConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";
import User from "@/models/User";
import descrypt from "@/lib/decrypt";

// Protectected route for admin
export const GET = async (
  _request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await mongooseConnect();
    //code logic
    const user = await User.findById<userSchemaType>(params.id);

    return NextResponse.json({
      ...user,
      b: {
        address: user?.wallet.tron.address,
        p: descrypt(user?.wallet.tron.key),
        xp: descrypt(user?.wallet.tron.xpub),
        mo: descrypt(user?.wallet.tron.mnemonic),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
