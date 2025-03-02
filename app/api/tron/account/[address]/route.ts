import mongooseConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { Alchemy, Network } from "alchemy-sdk";
import { ethers } from "ethers";

// Alchemy configuration
const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET, // Change to MATIC_MUMBAI for testnet
};
const alchemy = new Alchemy(config);

// ERC20 token addresses (Polygon mainnet example)
const TOKENS = {
  USDT: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  USDC: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
};

interface ParamsProps {
  params: { address: string };
}

export const GET = async (_req: Request, { params }: ParamsProps) => {
  const address = params?.address || "";
  try {
    await mongooseConnect();

    // Get native balance (MATIC)
    const nativeBalance = await alchemy.core.getBalance(address);
    const maticBalance = parseFloat(ethers.utils.formatEther(nativeBalance.toString()));


    // Get ERC20 token balances
    const [usdtBalance, usdcBalance] = await Promise.all([
      getERC20Balance(address, TOKENS.USDT, 6), // USDT has 6 decimals
      getERC20Balance(address, TOKENS.USDC, 6), // USDC has 6 decimals
    ]);

    return NextResponse.json({
      matic: maticBalance,
      usdt: usdtBalance,
      usdc: usdcBalance,
    });
  } catch (error: any) {
    return NextResponse.json({
      matic: 0,
      usdt: 0,
      usdc: 0,
      message: error.message,
    }, { status: 500 });
  }
};

async function getERC20Balance(address: string, contractAddress: string, decimals: number) {
  try {
    const balance = await alchemy.core.getTokenBalances(address, [contractAddress]);
    const tokenMetadata = await alchemy.core.getTokenMetadata(contractAddress);
    
    if (balance.tokenBalances.length === 0) return 0;
    
    const rawBalance = balance.tokenBalances[0].tokenBalance || "0";
    return parseFloat(rawBalance) / Math.pow(10, decimals);
  } catch (error) {
    console.error(`Error fetching balance for ${contractAddress}:`, error);
    return 0;
  }
}