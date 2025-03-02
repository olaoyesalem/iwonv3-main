import { Alchemy, Network } from "alchemy-sdk";
import { ethers } from "ethers";

// Alchemy configuration
const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET, // Use MATIC_MUMBAI for testnet
};
const alchemy = new Alchemy(config);

// Polygon USDT contract address (mainnet)
const USDT_CONTRACT = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";

export default async function getPolygonBalance(address: string) {
  try {
    // Get native MATIC balance
    const nativeBalance = await alchemy.core.getBalance(address);
    const matic = parseFloat(ethers.utils.formatEther(nativeBalance.toString()));

    // Get USDT balance
    const tokenBalances = await alchemy.core.getTokenBalances(address, [USDT_CONTRACT]);
    const usdtBalance = tokenBalances.tokenBalances[0]?.tokenBalance || "0";
    const usdt = parseInt(usdtBalance) / Math.pow(10, 6); // USDT uses 6 decimals

    return { matic, usdt };
  } catch (error: any) {
    throw new Error(`Failed to fetch balances: ${error.message}`);
  }
}