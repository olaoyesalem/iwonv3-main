import mongooseConnect from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Company from "@/models/Company";

interface BodyProps {
  name: string;
  baseUrl: string;
  address: string;
  title: string;
  iconUrl: string;
  description: string;
  profitPercentage: number;
  investPercentageFees: number;
  bannerProgressPercentage: number;
}

// Protectected route for admin
export const POST = async (request: Request) => {
  try {
    const session = await getServerSession(authOptions);
    const userSession = session?.user as { role: string } | undefined;
    if (!session?.user) throw new Error("UnAuthorized Access");
    if (userSession?.role !== "admin")
      throw new Error("This is a protected route");
    await mongooseConnect();
    //code logic

    const body: BodyProps = await request.json();
    const companies = await Company.find({});
    const company: CompanyProps | null = companies[0];
    if (!company) throw new Error("No Comany info");
    await Company.findByIdAndUpdate(company._id, {
      profitPercentage: body?.profitPercentage,
      investPercentageFees: body?.investPercentageFees,
      bannerProgressPercentage: body?.bannerProgressPercentage,
      name: body.name,
      baseUrl: body.baseUrl,
      address: body.address,
      head: {
        iconUrl: body.iconUrl,
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json("something");
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
