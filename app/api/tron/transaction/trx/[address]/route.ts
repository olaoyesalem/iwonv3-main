
import mongooseConnect from "@/lib/mongoose";
import transformTrxTransactionFormat from "@/lib/transformTrxTransactionFormat";
import { NextResponse } from "next/server";
import axios from "axios";
import { tron_req } from "@/lib/api"; // Import from the utility file



interface ParamsProps {
  params: { address: string };
}

export const GET = async (_req: Request, { params }: ParamsProps) => {
  const address = params?.address || "";
  try {
    await mongooseConnect();
    const { data } = await tron_req.get<{ transactions: any[] }>(
      `/transaction/account/${address}`
    );

    const transactions = data?.transactions?.map((t) =>
      transformTrxTransactionFormat(t)
    );

    return NextResponse.json({
      transactions,
    });
  } catch (error: any) {
    if (error?.status === 403) {
      return NextResponse.json({
        message:
          "maybe address not active, please deposit some fund for active the address",
        transactions: [],
      });
    } else {
      return NextResponse.json({ error, message: error.message });
    }
  }
};
