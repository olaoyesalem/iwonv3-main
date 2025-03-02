import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Container from "@/components/admin/Container";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import blockedAnimation from "@/public/lottie/blocked-anim.json";
import mongooseConnect from "@/lib/mongoose";
import User from "@/models/User";
import Logout from "@/components/Logout";

const getUser = async (userId: string) => {
  await mongooseConnect();
  const user = await User.findById<userSchemaType>(userId);
  if (!user) {
    return "NO USER FOUND";
  } else {
    return user;
  }
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const userId = (session?.user as { id: string })?.id;
  const user = await getUser(userId);
  if (user === "NO USER FOUND") {
    return <Logout />;
  }

  if (user.role !== "admin") redirect("/dashboard");

  if (user && user.status === "blocked") {
    return (
      <div className="flex min-h-screen justify-center items-center flex-col">
        <Lottie animationData={blockedAnimation} loop={false} />
        <div className="text-2xl font-bold">Account Restricted</div>
        <div className="text-lg font-semibold">
          Contact Support to resolve any outstanding issue.
        </div>
      </div>
    );
  }

  return <Container>{children}</Container>;
};

export default Layout;
