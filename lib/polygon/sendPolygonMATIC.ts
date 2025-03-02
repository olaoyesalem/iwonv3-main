import { ethers } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";

interface Props {
  amount: number | string;
  fromPrivateKey: string;
  to: string;
}

export default async function sendPolygonMATIC({
  fromPrivateKey,
  to,
  amount,
}: Props): Promise<string> {
  try {
    // Setup provider and signer
    const provider = new JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/pwxO9HN4ssmBwt0UiGaR40SpxbTXgutM");
    const signer = new ethers.Wallet(fromPrivateKey, provider);

    // Convert amount to wei (MATIC has 18 decimals)
    const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);

    // Construct transaction
    const tx = {
      to,
      value: amountInWei,
      chainId: 137, // Polygon mainnet chain ID
    };

    // Estimate gas
    const gasEstimate = await provider.estimateGas(tx);
    const feeData = await provider.getFeeData();

    // Fallback values if feeData fields are null
    const maxFeePerGas = feeData.maxFeePerGas ?? ethers.BigNumber.from("50000000000"); // 50 Gwei
    const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas ?? ethers.BigNumber.from("2000000000"); // 2 Gwei

    // Send transaction
    const transaction = await signer.sendTransaction({
      ...tx,
      gasLimit: gasEstimate,
      maxFeePerGas,
      maxPriorityFeePerGas,
    });

    // Wait for confirmation
    const receipt = await transaction.wait();
    if (!receipt?.transactionHash) throw new Error("Transaction failed");

    return receipt.transactionHash;
  } catch (error: any) {
    const errorMessage = error?.message?.toLowerCase();
    if (errorMessage?.includes("insufficient funds")) {
      throw new Error("Insufficient balance for gas fee + amount!");
    }
    throw new Error(errorMessage || "Transaction failed. Check gas fees and try again.");
  }
}
