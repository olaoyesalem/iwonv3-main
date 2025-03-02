// lib/alchemy.ts
import axios from "axios";

export const alchemyHttp = axios.create({
  baseURL: "https://polygon-mainnet.g.alchemy.com/v2/9KT8chuOsD5uz2KZxaFqlmX75CmDNI1PP",
});

// Create a function that accepts address as a parameter
export async function getAssetTransfers(address: string) {
  const { data } = await alchemyHttp.post("/", {
    jsonrpc: "2.0",
    method: "alchemy_getAssetTransfers",
    params: [{
      fromBlock: "0x0",
      toBlock: "latest",
      fromAddress: address,  // Now using the parameter
      category: ["erc20"]
    }],
    id: 1
  });

  return data;
}