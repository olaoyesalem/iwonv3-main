import mongooseConnect from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Node from "@/models/Node";

// get node
export const GET = async (
  _req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await mongooseConnect();
    const node = await Node.findById(params.id);
    return NextResponse.json({ node });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};

// update node
export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
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
      price_increment,
      price_increment_milestone,
      sold_seats,
      total_sold_amount,
    } = await req.json();

    const node = await Node.findByIdAndUpdate(
      params.id,
      {
        $set: {
          name,
          description,
          price,
          total_seats,
          price_increment,
          price_increment_milestone,
          sold_seats,
          total_sold_amount,
        },
      },
      { new: true }
    );

    return NextResponse.json({ node });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};

// delete node
export const DELETE = async (
  _req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const session = await getServerSession(authOptions);
    const userSession = session?.user as { role: string } | undefined;
    if (!session?.user) throw new Error("UnAuthorized Access");
    if (userSession?.role !== "admin")
      throw new Error("access denied, failed to connect!");

    await mongooseConnect();
    const node = await Node.findByIdAndDelete(params.id);
    return NextResponse.json({ node });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
