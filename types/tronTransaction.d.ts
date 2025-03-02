interface tronTransaction {
  txID: string;

  tokenInfo: {
    symbol: string;
    address: string;
    decimals: number;
    name: string;
  };

  from: string;
  to: string;
  type: string;
  value: string;
}
