import mongooseConnect from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Node from "@/models/Node";

// create node
export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);
    const userSession = session?.user as { role: string } | undefined;
    if (!session?.user) throw new Error("UnAuthorized Access");
    if (userSession?.role !== "admin")
      throw new Error("access denied, failed to connect!");

    await mongooseConnect();
    const {
      name,
      description,
      price,
      total_seats,
      sold_seats,
      price_increment,
      price_increment_milestone,
    } = await req.json();

    const node = await Node.create({
      name,
      description,
      price,
      total_seats,
      sold_seats,
      price_increment,
      price_increment_milestone,
    });

    return NextResponse.json({ node });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};

// get all nodes
export const GET = async (req: Request) => {
  try {
    await mongooseConnect();
    const nodes = await Node.find();
    return NextResponse.json({ nodes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
