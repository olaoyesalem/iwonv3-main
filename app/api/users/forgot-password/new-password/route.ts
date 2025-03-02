import mongooseConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { render } from "@react-email/render";
import sendEmail from "@/constants/sendEmail";
import User from "@/models/User";
import PasswordUpdated from "@/email-templates/PasswordUpdatedEmail";
import formatDate from "@/constants/formatDate";
import Company from "@/models/Company";
import encrypt from "@/lib/encrypt";

interface BodyProps {
  newPassword?: string;
  newPin?: string;
  otp: string;
  email: string;
}

// Protectected route for user
export const POST = async (request: Request) => {
  try {
    await mongooseConnect();
    //code logic
    const companies = await Company.find({});
    const company: CompanyProps | null = companies[0];
    if (!company) throw new Error("No Comany info");

    const { newPassword, otp, email, newPin }: BodyProps = await request.json();
    const user = await User.findOne<userSchemaType>({ email });
    if (!user) throw new Error("No user found");

    if (user.recoveryCode !== otp) throw new Error("Invalid code");
    if (Date.now() > user.recoveryCodeExpiry)
      throw new Error("The code you entered is expired");

    let newData: any = {};
    if (newPassword) {
      newData.password = bcrypt.hashSync(newPassword, 12);
    } else if (newPin) {
      newData.pin = encrypt(newPin);
    }

    const updatedUser = await User.findOneAndUpdate<userSchemaType>(
      { email },
      newData
    );
    if (!updatedUser) throw new Error("No user found to update");

    const updatedDate = new Date();

    const emailText = ` You updated the ${newPin ? "PIN" : "Password"} for your Paywander account on 
${formatDate(updatedDate)}. If this was you, then no further action is
required. However if you did NOT perform this ${newPin ? "PIN" : "Password"} change, please reset your account 
${newPin ? "PIN" : "Password"} immediately.: ${company.baseUrl}/forgot-password 

Remember to use a ${newPin ? "PIN" : "Password"} that is both strong and unique to your
Paywander account. To learn more about how to create a strong and 
unique ${newPin ? "PIN" : "Password"}, click here.: ${company.baseUrl}.`;

    const emailHtml = render(
      PasswordUpdated({
        username: `${updatedUser.fullname}(${updatedUser.username})`,
        updatedDate,
        company,
      })
    );

    const result = await sendEmail(
      updatedUser.email,
      `${newPin ? "PIN" : "Password"} Changed`,
      emailText,
      emailHtml,
      company
    );
    return NextResponse.json({ result, success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
