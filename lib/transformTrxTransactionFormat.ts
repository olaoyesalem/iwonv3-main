export default function transformTrxTransactionFormat(
  trxTransaction: any
): tronTransaction {
  if (!trxTransaction) return {} as tronTransaction;

  const { txID, rawData } = trxTransaction;
  if (!txID || !rawData) return {} as tronTransaction;

  const contract = rawData?.contract?.[0]?.parameter?.value;
  if (!contract) {
    throw new Error("Invalid transaction format: Missing contract data.");
  }

  const from = contract.ownerAddressBase58;
  const to = contract.toAddressBase58;
  const value = contract.amount;

  return {
    txID,
    tokenInfo: {
      symbol: "TRX",
      address: "Native TRX",
      decimals: 6,
      name: "TRON Native Token",
    },
    from,
    to,
    type: "Transfer",
    value: value?.toString(),
  };
}
