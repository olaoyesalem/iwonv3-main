import sendEmail from "@/constants/sendEmail";
import { render } from "@react-email/render";
import TransactionEmail from "@/email-templates/TransactionEmail";
import Transaction from "@/models/Transaction";
import User from "@/models/User";
import formatNumber from "@/constants/formatNumber";

export default async function userSignupBonus(
  user: userSchemaType,
  company: CompanyProps
) {
  await User.findByIdAndUpdate(user, {
    $inc: { accountBalance: company.signupBonus.amount },
  });
  const newAccountBalTransaction = new Transaction<
    Omit<TransactionType, "_id">
  >({
    title: "Sign Up Bonus",
    amount: company.signupBonus.amount,
    userId: user?._id,
    category: "signup-bonus",
    status: "successful",
    from: `From ${company.name}`,
    to: "My Account Balance",
  });

  const savedTransaction = await newAccountBalTransaction.save();

  const transactionEmailText = `You just received a sum of ${
    company.currency.symbol
  }${formatNumber(
    company.signupBonus.amount
  )} Sign up bonus to your Account balance. Thank you for choosing ${
    company.name
  }`;
  const transactionEmailHtml = render(
    TransactionEmail({
      transaction: savedTransaction,
      fullname: user?.fullname,
      description: transactionEmailText,
      company,
    })
  );

  await sendEmail(
    user?.email,
    "Sign Up Bonus",
    transactionEmailText,
    transactionEmailHtml,
    company
  );
}
