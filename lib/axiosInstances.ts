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




const xApiKey = "t-6747a128d1882d62e22d569c-7afe00541b8744f98cb6c9c4"


export const tron_req = axios.create({
  baseURL: "https://api.tatum.io/v3/tron",
  headers: {
    "x-api-key": xApiKey,
  },
});

export const tatum_req = axios.create({
  baseURL: "https://api.tatum.io",
  headers: {
    "x-api-key": xApiKey,
  },
});
