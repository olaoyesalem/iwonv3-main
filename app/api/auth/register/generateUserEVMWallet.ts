import { ethers } from "ethers";
import encrypt from "@/lib/encrypt";
import { JsonRpcProvider } from "@ethersproject/providers/lib/json-rpc-provider";

export default async function generateUserEVMWallet() {
  // Generate random mnemonic
  const wallet = ethers.Wallet.createRandom();
  if (!wallet.mnemonic) {
    throw new Error("Failed to generate mnemonic.");
  }

  const mnemonic = wallet.mnemonic.phrase;

  // Create HD Wallet from mnemonic (for ethers v5)
  const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);

  // Get extended public key (xpub)
  const xpub = hdNode.neuter().extendedKey;

  // Derive account at index 1
  const derivedWallet = hdNode.derivePath("m/44'/60'/0'/0/1");

  // Get private key and address
  const key = derivedWallet.privateKey;
  const address = derivedWallet.address;

  return {
    mnemonic: encrypt(mnemonic),
    xpub: encrypt(xpub),
    key: encrypt(key),
    address,
  };
}
