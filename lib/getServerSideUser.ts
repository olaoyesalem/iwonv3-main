"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import mongooseConnect from "./mongoose";
import User from "@/models/User";

export default async function getServerSideUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return redirect("/login");
  const userId = (session?.user as { id: string })?.id;
  await mongooseConnect();
  return await User.findById<userSchemaType>(userId);
}
