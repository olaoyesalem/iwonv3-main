import { tron_req } from "@/lib/axiosInstances";
import encrypt from "@/lib/encrypt";

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
