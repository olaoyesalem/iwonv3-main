import { NextResponse } from "next/server";
import getPolygonBalance from "./getPolygonBalance";

export const GET = async (
  _req: Request,
  { params }: { params: { address: string } }
) => {
  try {
    const { matic, usdt } = await getPolygonBalance(params.address);

    return NextResponse.json({
      matic,
      usdt,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, errors: error });
  }
};
