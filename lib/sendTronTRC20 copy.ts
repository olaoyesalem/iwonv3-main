
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
    amount: typeof amount === "string" ? amount : Number(amount),
    tokenAddress: tron_contracts[contract_name],
    feeLimit,
  };

  const {
    data: { txId },
  } = await tron_req.post<{ txId: string }>(`/trc20/transaction`, req_data);

  if (!txId) throw new Error("Transaction failed!");

  const { data } = await tron_req.get<trc20HashTransaction>(
    `/transaction/${txId}`
  );

  const status = data?.ret[0]?.contractRet;

  if (status === "PENDING" || status === "SUCCESS") {
    return { ...(data || {}), status };
  } else if (status === "OUT_OF_ENERGY") {
    throw new Error("Out of energy (low gas fees)");
  } else {
    throw new Error(`Transaction failed with status: ${status}`);
  }
}
