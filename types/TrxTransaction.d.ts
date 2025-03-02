interface TrxTransaction {
  ret: {
    contractRet: string;
    fee: number;
  }[];

  signature: string[];
  blockNumber: number;
  txID: string;
  netFee: number;
  netUsage: number;
  energyFee: number;
  energyUsage: number;
  energyUsageTotal: number;
  internalTransactions: any[];
  rawData: {
    contract: {
      parameter: {
        value: {
          data: string;
          owner_address: string;
          contract_address: string;
          ownerAddressBase58: string;
          contractAddressBase58: string;
        };
        type_url: string;
      };
      type: string;
    }[];
    ref_block_bytes: string;
    ref_block_hash: string;
    expiration: number;
    fee_limit: number;
    timestamp: number;
  };
}
