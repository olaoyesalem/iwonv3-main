import { ethers, utils } from "ethers"; // Import utils from ethers

// Later in your code

import { JsonRpcProvider } from "@ethersproject/providers";


interface Props {
  amount: number | string;
  fromPrivateKey: string;
  to: string;
}

export default async function sendPolygonUSDT({
  fromPrivateKey,
  to,
  amount,
}: Props): Promise<string> {
  try {
    // Setup provider and signer
    const provider = new JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/pwxO9HN4ssmBwt0UiGaR40SpxbTXgutM");
    const signer = new ethers.Wallet(fromPrivateKey, provider);

    // USDT contract details
    const USDT_CONTRACT ="0xc2132D05D31c914a87C6611C10748AEb04B58e8F" // (PoS)
    const USDT_DECIMALS = 6;
    const ERC20_ABI = [
      "function transfer(address to, uint256 value) returns (bool)",
    ];

    // Convert amount to USDT units (6 decimals)
    const amountInUnits = utils.parseUnits(
      amount.toString(),
      USDT_DECIMALS
    );

    // Create contract instance
    const contract = new ethers.Contract(USDT_CONTRACT, ERC20_ABI, signer);

    // Estimate gas
    const gasEstimate = await contract.transfer.estimateGas(
      to,
      amountInUnits
    );

    // Send transaction
    const tx = await contract.transfer(to, amountInUnits, {
      gasLimit: gasEstimate,
    });

    // Wait for transaction confirmation
    const receipt = await tx.wait();
    
    if (!receipt?.hash) {
      throw new Error("Transaction failed");
    }

    return receipt.hash;
  } catch (error: any) {
    console.error("sendPolygonUSDT ERROR:: ", error);
    
    const errorMessage = error?.message?.toLowerCase();
    if (errorMessage?.includes("insufficient funds")) {
      throw new Error("Insufficient MATIC balance for gas fees!");
    }
    if (errorMessage?.includes("transfer amount exceeds balance")) {
      throw new Error("Insufficient USDT balance!");
    }
    
    throw new Error("Transaction failed. Check gas fees and try again.");
  }
}