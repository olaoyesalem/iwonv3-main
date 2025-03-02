import { Network } from "alchemy-sdk";
import { ethers } from "ethers";
import mongooseConnect from "@/lib/mongoose";
import decrypt from "@/lib/decrypt";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { JsonRpcProvider } from "@ethersproject/providers";

// Configure token contracts (Polygon mainnet example)
const TOKENS = {
  USDT: {
    address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    decimals: 6
  },
  NATIVE: {
    decimals: 18
  }
};

export const POST = async (req: Request) => {
  try {
    await mongooseConnect();
    const body = await req.json();
    const { userId, amount, availableAmount, to, contractType } = body;

    if (!userId || !amount || !to || !contractType) {
      throw new Error("All required fields must be provided!");
    }

    const user = await User.findById(userId);
    if (!user?.wallet?.evm?.key) throw new Error("User wallet not found");

    // Setup provider and signer
    const provider = new JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/pwxO9HN4ssmBwt0UiGaR40SpxbTXgutM");
    const signer = new ethers.Wallet(decrypt(user.wallet.evm.key), provider);

    let txResponse;
    const sendAmount = ethers.utils.parseUnits(
      amount.toString(),
      contractType === "NATIVE" ? TOKENS.NATIVE.decimals : TOKENS.USDT.decimals
    );

    if (contractType === "NATIVE") {
      // Handle native currency (MATIC/ETH) transfer
      const gasEstimate = await provider.estimateGas({
        from: signer.address,
        to,
        value: sendAmount
      });

      txResponse = await signer.sendTransaction({
        to,
        value: sendAmount,
        gasLimit: gasEstimate
      });
    } else if (contractType === "USDT") {
      // Handle ERC20 token transfer
      const erc20Abi = ["function transfer(address to, uint256 value)"];
      const contract = new ethers.Contract(
        TOKENS.USDT.address,
        erc20Abi,
        signer
      );

      const gasEstimate = await contract.transfer.estimateGas(
        to, 
        sendAmount
      );

      txResponse = await contract.transfer(to, sendAmount, {
        gasLimit: gasEstimate
      });
    } else {
      throw new Error("Unsupported contract type");
    }

    // Wait for transaction confirmation
    const receipt = await txResponse.wait();

    return NextResponse.json({
      message: receipt.status === 1 ? "Successfully sent!" : "Transaction failed",
      txId: txResponse.hash,
      success: receipt.status === 1
    });
  } catch (error: any) {
    console.error("Transaction error:", error);
    return NextResponse.json({
      message: error.message || "Transaction failed (check gas fees)",
      success: false
    }, { status: 500 });
  }
};