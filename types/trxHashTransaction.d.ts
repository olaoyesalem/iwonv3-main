interface TrxHashTransaction {
  txID: string;
  blockNumber: number;
  ret: Array<{ contractRet: "SUCCESS" | "OUT_OF_ENERGY" }>;
  signature: string[];
  netUsage: number;
  rawData: {
    contract: Array<{
      parameter: {
        value: {
          amount: number; // Amount in Sun
          owner_address: string; // Sender address in Hex
          ownerAddressBase58: string; // Sender address in Base58
          to_address: string; // Receiver address in Hex
          toAddressBase58: string; // Receiver address in Base58
        };
        type_url: string; // "type.googleapis.com/protocol.TransferContract"
      };
      type: string; // "TransferContract"
    }>;

    ref_block_bytes: string;
    ref_block_hash: string;
    expiration: number;
    timestamp: number;
  };
}
