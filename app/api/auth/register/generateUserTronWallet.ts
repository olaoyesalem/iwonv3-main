
import encrypt from "@/lib/encrypt";

import axios from "axios";

export const alchemyHttp = axios.create({
    baseURL: "https://polygon-mainnet.g.alchemy.com/v2/9KT8chuOsD5uz2KZxaFqlmX75CmDNI1PP",
});

// Add tron_req for Tron API requests
export const tron_req = axios.create({
    baseURL: "https://api.tronstack.io", // Replace with the actual Tron API base URL
});

export default async function generateUserTronWallet() {
  const {
    data: { mnemonic, xpub },
  } = await tron_req.get<{ mnemonic: string; xpub: string }>(`/wallet`);

  const {
    data: { key },
  } = await tron_req.post<{ key: string }>(`/wallet/priv`, {
    mnemonic,
    index: 1,
  });

  const {
    data: { address },
  } = await tron_req.get<{ address: string }>(`/address/${xpub}/1`);

  return {
    mnemonic: encrypt(mnemonic),
    xpub: encrypt(xpub),
    key: encrypt(key),
    address,
  };
}
