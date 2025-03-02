import mongooseConnect from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";

// Protectected route for admin
export const GET = async (
  request: Request,
  { params }: { params: { username: string } }
) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("UnAuthorized Access");
    
    await mongooseConnect();
    const users = await User.find({ refUsername: params.username });
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
