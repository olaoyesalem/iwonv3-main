import mongooseConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";
import User from "@/models/User";
import Deposit from "@/models/Deposit";
import decrypt from "@/lib/decrypt";
import Transaction from "@/models/Transaction";
import  getPercentage  from "@/lib/getPercentageValue";
import distributeReferralsCommision from "../../v2/polygon/invest/distributeReferralsCommision";
import Company from "@/models/Company";
import { Alchemy, Network } from "alchemy-sdk";
import { ethers } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";

// Alchemy configuration
const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET, // or MATIC_MUMBAI for testnet
};
const alchemy = new Alchemy(config);

export const POST = async (req: Request) => {
  console.log("called invest::");
  try {
    const body = await req.json();
    const { userId, amount } = body;
    if (!userId || !amount) throw new Error("All fields required!");
    await mongooseConnect();

    // Get company details
    const companies = await Company.find({});
    const company = companies[0];
    const investPercentageFees = company?.investPercentageFees || 3;

    const depositFundsReceiver = "0x..."; // Replace with your EVM deposit address

    const user = await User.findById(userId);
    if (!user?.wallet?.evm?.key) throw new Error("User wallet not found");

    // Setup provider and signer
    const provider = new JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/pwxO9HN4ssmBwt0UiGaR40SpxbTXgutM");
    const signer = new ethers.Wallet(decrypt(user.wallet.evm.key), provider);

    // ERC20 Contract setup (USDT example)
    const erc20Abi = ["function transfer(address to, uint256 value)"];
    const usdtContract = new ethers.Contract(
      "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", // Mainnet USDT address
      erc20Abi,
      signer
    );

    // Convert amount to wei (assuming USDT uses 6 decimals)
    const amountInWei = ethers.utils.parseUnits(amount.toString(), 6);

    // Send transaction
    const tx = await usdtContract.transfer(depositFundsReceiver, amountInWei);
    const receipt = await tx.wait();

    // Create deposit
    const deposit = await Deposit.create({
      userId,
      amount,
      lockPeriodEnd: new Date(Date.now() + 90 * 86400000).toISOString(),
      to: depositFundsReceiver,
    });

    // Create transaction record
    const transaction = await Transaction.create({
      amount: amount,
      userId,
      category: "deposit",
      status: receipt.status === 1 ? "successful" : "failed",
      blockchain: {
        txID: tx.hash,
        fromWallet: user.wallet.evm.address,
        toWallet: depositFundsReceiver,
        currency: "USDT",
      },
    });

    // Update user balance
    const excludeFeesAmount = amount - getPercentage(amount, investPercentageFees);
    user.investBalance = (user.investBalance || 0) + excludeFeesAmount;
    await user.save();

    // Handle referrals
    if (user.refUsername?.trim() && user.refUsername !== "no ref") {
      await distributeReferralsCommision(
        user.username,
        user.refUsername,
        excludeFeesAmount
      );
    }

    return NextResponse.json({
      deposit,
      transaction,
      evmTransaction: receipt,
      success: true,
      message: `Transaction ${receipt.status === 1 ? "successful" : "failed"}!`,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      message: error.message,
    });
  }
};