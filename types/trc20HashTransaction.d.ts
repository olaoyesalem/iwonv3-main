interface trc20HashTransaction {
  txID: string;
  blockNumber: number;
  ret: Array<{
    contractRet:
      | "SUCCESS"
      | "OUT_OF_ENERGY"
      | "PENDING"
      | "REVERT"
      | "CONFIRMED"
      | "SUCCESSFUL";
  }>;
  signature: string[];
  netFee: number;
  fee: number;
  energyFee: number;
  energyUsageTotal: number;
  rawData: {
    contract: Array<{
      parameter: {
        value: {
          data: string; // Encoded ABI data (e.g., transfer function)
          owner_address: string; // Sender address in Hex
          ownerAddressBase58: string; // Sender address in Base58
          contract_address: string; // Token contract address in Hex
          contractAddressBase58: string; // Token contract address in Base58
        };
        type_url: string; // "type.googleapis.com/protocol.TriggerSmartContract"
      };
      type: string; // "TriggerSmartContract"
    }>;
    ref_block_bytes: string;
    ref_block_hash: string;
    expiration: number;
    fee_limit: number;
    timestamp: number;
  };
  log: Array<{
    address: string; // Contract address emitting the log
    topics: string[]; // Event signature and indexed parameters
    data: string; // Event data (e.g., transfer amount)
  }>;

  status?: "OUT_OF_ENERGY" | "SUCCESS";
}
