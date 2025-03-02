interface CONTRACT_BALANCE {
  [key: string]: number;
}

interface tronBalanceReqData {
  trx?: number;
  usdt?: number;
  usdc?: number;

  balance: number;
  createTime: number;
  trc10: CONTRACT_BALANCE[];
  trc20: CONTRACT_BALANCE[];
  freeNetLimit: number;
  bandwidth: number;
}
