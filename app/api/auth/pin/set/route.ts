import { NextResponse } from "next/server";
import User from "@/models/User";
import encrypt from "@/lib/encrypt";

// set for direct update the pin if user forgot it!
export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    const { newPin, userId } = body;
    if (!newPin || !userId) throw new Error("requird all fields!");

    const user = await User.findById(userId);
    if (!user) throw new Error("Not Found!");

    user.pin = encrypt(newPin);
    await user.save();

    return NextResponse.json({ message: "PIN successfully updated!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
