interface Trc20Transaction {
  txID: string;
  tokenInfo: {
    name: string;
    symbol: string;
    decimals: number;
    address: string;
  };
  from: string;
  to: string;
  type: string;
  value: string;
}
