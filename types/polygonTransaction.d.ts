interface polygonTransaction {
  chain: "polygon-mainnet" | "polygon-testnet";
  hash: string;
  address: string;
  blockNumber: number;
  transactionIndex: number;
  transactionType: "native" | "fungible";
  transactionSubtype: "incoming" | "outgoing";
  amount: string;
  timestamp: number;
  counterAddress: string;
  tokenAddress?: string;
}
