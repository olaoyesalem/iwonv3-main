import { NextResponse } from "next/server";
import User from "@/models/User";
import encrypt from "@/lib/encrypt";
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { pin, userId } = body;
    if (!pin || !userId) throw new Error("requird all fields!");

    const user = await User.findById(userId);
    if (!user) throw new Error("User Not Found!");
    if (user?.pin) throw new Error("Already exist, please update!");

    user.pin = encrypt(pin);
    await user.save();

    return NextResponse.json({
      success: true,
      message: "PIN successfully created!",
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
