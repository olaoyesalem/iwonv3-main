
import { tron_contracts } from "./tronContractBalanceFinder";
import axios from "axios";

export const alchemyHttp = axios.create({
    baseURL: "https://polygon-mainnet.g.alchemy.com/v2/9KT8chuOsD5uz2KZxaFqlmX75CmDNI1PP",
});

// Add tron_req for Tron API requests
export const tron_req = axios.create({
    baseURL: "https://api.tronstack.io", // Replace with the actual Tron API base URL
});

interface Props {
  fromPrivateKey: string;
  to: string;
  amount: number;
  contract_name: keyof typeof tron_contracts;
  feeLimit: number;
}

// Function to monitor the status of a transaction until it succeeds or fails
async function monitorTransaction(
  txId: string,
  retries: number = 10,
  delay: number = 5000
): Promise<boolean> {
  for (let i = 0; i < retries; i++) {
    const { data } = await tron_req.get<trc20HashTransaction>(
      `/transaction/${txId}`
    );

    const status = data?.ret?.[0]?.contractRet;

    console.log("monitoring status...", status);
    if (
      status === "SUCCESS" ||
      status === "CONFIRMED" ||
      status === "SUCCESSFUL"
    ) {
      return true;
    } else if (status === "OUT_OF_ENERGY" || status === "REVERT") {
      return false;
    }

    await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before next check
  }

  console.log("Transaction status monitoring timed out. Please check later.");
  return false;
}

export default async function sendTronTRC20({
  fromPrivateKey,
  to,
  amount,
  contract_name,
  feeLimit,
}: Props) {
  console.log("::::::::calling sendTronTRC20...");

  const req_data = {
    fromPrivateKey,
    to,
    amount: amount?.toFixed(2)?.toString(),
    tokenAddress: tron_contracts[contract_name],
    feeLimit,
  };

  console.log("req_data >>>>>> ", req_data);

  const {
    data: { txId },
  } = await tron_req.post<{ txId: string }>(`/trc20/transaction`, req_data);

  if (!txId) throw new Error("Transaction failed!");

  const { data } = await tron_req.get<trc20HashTransaction>(
    `/transaction/${txId}`
  );

  const status = data?.ret?.[0]?.contractRet;

  if (
    status === "SUCCESS" ||
    status === "CONFIRMED" ||
    status === "SUCCESSFUL"
  ) {
    return { ...(data || {}), status };
  }

  // If the transaction is pending, monitor it until it succeeds or fails
  if (status === "PENDING") {
    const result = await monitorTransaction(txId);
    if (result) {
      return { ...(data || {}), status };
    } else {
      throw new Error(`Transaction failed with status: ${status}`);
    }
  }

  // If the transaction fails due to low energy, throw a specific error
  if (status === "OUT_OF_ENERGY") {
    throw new Error("Out of energy (low gas fees)");
  }

  // Handle any other unexpected status
  throw new Error(`Transaction failed with status: ${status}`);
}
