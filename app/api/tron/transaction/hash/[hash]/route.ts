import mongooseConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { tron_req } from "@/lib/axios"; // ✅ Importing the Tron request instance

interface ParamsProps {
  params: { hash: string };
}

export const GET = async (_req: Request, { params }: ParamsProps) => {
  const hash = params?.hash || "";
  try {
    await mongooseConnect();
    const { data } = await tron_req.get<any>(`/transaction/${hash}`);
    return NextResponse.json(data);
  } catch (error: any) {
    if (error?.status === 400) {
      return NextResponse.json({
        message:
          "Maybe the hash is not active. Please deposit some funds to activate it.",
      });
    } else {
      return NextResponse.json({ error, message: error.message });
    }
  }
};
