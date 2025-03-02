import sendEmail from "@/constants/sendEmail";
import WelcomeEmail from "@/email-templates/WelcomeEmail";
import { render } from "@react-email/render";

export default async function sendWelcomeEmail(
  user: userSchemaType,
  company: CompanyProps
) {
  const welcomeEmailhtml = render(
    WelcomeEmail({
      userFirstname: user.fullname,
      company,
    })
  );

  await sendEmail(
    user.email,
    "Welcome",
    "The platform that helps you make payment locally and others round the world",
    welcomeEmailhtml,
    company
  );
}
