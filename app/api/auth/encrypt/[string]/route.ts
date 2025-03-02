import { NextResponse } from "next/server";
import encrypt from "@/lib/encrypt";

interface ParamsProps {
  params: { string: string };
}

export const GET = async (request: Request, { params }: ParamsProps) => {
  try {
    const enc = encrypt(params.string);
    return NextResponse.json({ enc });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
