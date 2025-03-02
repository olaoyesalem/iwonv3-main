import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongooseConnect from "@/lib/mongoose";
import UserNode from "@/models/UserNode";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// update node
export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    const userSession = session?.user as UserSession;
    if (!userSession.id) throw new Error("UnAuthorized Access");

    await mongooseConnect();

    const nodes = await UserNode.find({ userId: userSession.id });
    return NextResponse.json({ nodes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
