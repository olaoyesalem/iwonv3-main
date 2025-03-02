import mongooseConnect from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import Transaction from "@/models/Transaction";
import decrypt from "@/lib/decrypt";
import Deposit from "@/models/Deposit";
import getPercentage from "@/lib/getPercentageValue";
import { ethers } from "ethers";
import { Alchemy, Network } from "alchemy-sdk";
import { JsonRpcProvider } from "@ethersproject/providers";

// Alchemy configuration
const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET, // Change for different networks
};
const alchemy = new Alchemy(config);

// USDT Contract configuration
const USDT_CONTRACT = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // Polygon Mainnet
const USDT_DECIMALS = 6;

export const POST = async (request: Request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Unauthorized Access");

    await mongooseConnect();
    const body = await request.json();

    const { amount, withdrawalAddress, userId, onlyForTransaction } = body;
    
    if (!amount || !withdrawalAddress) {
      throw new Error("All fields required!");
    }

    // Verify existing deposits
    const deposits = await Deposit.find({ userId, status: "success" });
    if (deposits?.length < 1) {
      return NextResponse.json({
        error: "Minimum 1 successful deposit required to withdraw",
      });
    }

    // Get user and admin accounts
    const user = await User.findById(userId);
    const admin = await User.findOne({ role: "admin" }); // Update based on your admin logic

    if (!user) throw new Error("User not found");
    if (!admin?.wallet?.evm?.key) throw new Error("Admin wallet configuration error");

    // Balance check
    if (user.profitBalance < amount) {
      throw new Error("Insufficient withdrawable balance");
    }

    // Calculate fees and amount
    const feesPercentage = amount > 1000 ? 7 : 5;
    const userReceivableAmount = amount - getPercentage(amount, feesPercentage);

    let transactionReceipt;
    if (!onlyForTransaction) {
      // Setup Ethereum provider and signer
      const provider = new JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/pwxO9HN4ssmBwt0UiGaR40SpxbTXgutM");
      const signer = new ethers.Wallet(decrypt(admin.wallet.evm.key), provider);

      // ERC20 Contract setup
      const erc20Abi = ["function transfer(address to, uint256 value)"];
      const contract = new ethers.Contract(USDT_CONTRACT, erc20Abi, signer);

      // Convert amount to token units
      const amountInUnits = ethers.utils.parseUnits(
        userReceivableAmount.toString(),
        USDT_DECIMALS
      );

      // Estimate gas and send transaction
      const gasEstimate = await contract.transfer.estimateGas(
        withdrawalAddress,
        amountInUnits
      );

      const tx = await contract.transfer(withdrawalAddress, amountInUnits, {
        gasLimit: gasEstimate,
      });
      transactionReceipt = await tx.wait();
    }

    // Update user balance
    await User.findByIdAndUpdate(userId, {
      $inc: { profitBalance: -amount },
    });

    // Create transaction record
    const transaction = await Transaction.create({
      withdrawalAddress,
      amount,
      userId,
      category: "withdrawal",
      status: transactionReceipt?.status === 1 ? "paid" : "pending",
      blockchain: {
        txHash: transactionReceipt?.transactionHash || "",
        fromWallet: admin.wallet.evm.address,
        toWallet: withdrawalAddress,
        currency: "USDT",
        network: "polygon",
      },
    });

    return NextResponse.json({
      transaction,
      profitBalance: user.profitBalance - amount,
    });
  } catch (error: any) {
    console.error("Withdrawal error:", error);
    return NextResponse.json({
      message: error.message || "Withdrawal failed",
      error: error.message,
    }, { status: 500 });
  }
};