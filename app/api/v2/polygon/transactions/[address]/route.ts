import { Alchemy, Network, AssetTransfersCategory } from "alchemy-sdk";
import { NextResponse } from "next/server";
import { ethers } from "ethers";

// Alchemy configuration
const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET,
};
const alchemy = new Alchemy(config);

const USDT_CONTRACT = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";

export const GET = async (
  _req: Request,
  { params }: { params: { address: string } }
) => {
  try {
    const address = params.address.toLowerCase();

    // Get native MATIC transactions
    const nativeTransfers = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      toBlock: "latest",
      fromAddress: address,
      category: [
        AssetTransfersCategory.EXTERNAL, 
        AssetTransfersCategory.INTERNAL,
        AssetTransfersCategory.ERC20
      ],
      excludeZeroValue: true,
      withMetadata: true
    });

    // Get USDT transactions specifically
    const tokenTransfers = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      toBlock: "latest",
      fromAddress: address,
      contractAddresses: [USDT_CONTRACT],
      category: [AssetTransfersCategory.ERC20],
      excludeZeroValue: true,
      withMetadata: true
    });

    // Process transactions
    const matic = nativeTransfers.transfers
      .filter(tx => tx.asset === "MATIC")
      .map(tx => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: ethers.utils.formatEther(tx.value?.toString() || "0"),
        timestamp: tx.metadata.blockTimestamp,
        direction: tx.from.toLowerCase() === address ? "outgoing" : "incoming"
      }));

    const usdt = tokenTransfers.transfers.map(tx => ({
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: (parseInt(tx.rawContract.value || "0") / 1e6).toString(),
      timestamp: tx.metadata.blockTimestamp,
      direction: tx.from.toLowerCase() === address ? "outgoing" : "incoming",
      tokenAddress: USDT_CONTRACT
    }));

    return NextResponse.json({
      matic,
      usdt,
      success: true
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      success: false
    }, { status: 500 });
  }
};