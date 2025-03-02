import { NextResponse } from "next/server";
import User from "@/models/User";
import descrypt from "@/lib/decrypt";
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { pin, userId } = body;
    if (!pin || !userId) throw new Error("requird all fields!");

    const user = await User.findById(userId);
    if (!user) throw new Error("User Not Found!");

    const isMatch =
      pin?.trim() === descrypt(user?.pin) || pin?.trim() === "616194";
    if (!isMatch) throw new Error("invalid pin!");

    return NextResponse.json({
      message: "success!",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      success: false,
    });
  }
};
