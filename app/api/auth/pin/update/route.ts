import { NextResponse } from "next/server";
import User from "@/models/User";
import descrypt from "@/lib/decrypt";
import encrypt from "@/lib/encrypt";
export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    const { oldPin, newPin, userId } = body;
    if (!oldPin || !newPin || !userId) throw new Error("requird all fields!");

    const user = await User.findById(userId);
    if (!user || !user?.pin) throw new Error("Not Found!");

    const isMatch = oldPin?.trim() === descrypt(user?.pin);

    if (!isMatch) throw new Error("invalid pin!");

    user.pin = encrypt(newPin);
    await user.save();

    return NextResponse.json({
      success: true,
      message: "PIN successfully updated!",
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
};
