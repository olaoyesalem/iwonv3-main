import mongooseConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { tron_req } from "@/lib/api"; // Import from the utility file

interface ParamsProps {
  params: { address: string };
}

export const GET = async (_req: Request, { params }: ParamsProps) => {
  const address = params?.address || "";
  try {
    await mongooseConnect();
    const {
      data: { transactions },
    } = await tron_req.get<{ transactions: tronTransaction[] }>(
      `/transaction/account/${address}/trc20`
    );

    return NextResponse.json({
      transactions,
    });
  } catch (error: any) {
    if (error?.status === 403) {
      throw new Error(
        "maybe address not active, please deposit some fund for active the address"
      );
    } else {
      return NextResponse.json({ error, message: error.message });
    }
  }
};