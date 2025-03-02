import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import tronWeiToBalance from "@/lib/tronWeiToBalance";

export default function useRefreshTronBalance(wallet_address: string) {
  const [refreshing, set_refreshing] = useState(true);
  const [usdt, set_usdt] = useState(0);
  const [trx, set_trx] = useState(0);
  const [isWalletActive, setIsWalletActive] = useState(true);

  const refreshBalance = useCallback(async () => {
    if (!wallet_address) return;
    try {
      const { data } = await axios.get<tronBalanceReqData>(
        `/api/tron/account/${wallet_address}`
      );
      set_trx(data?.trx || 0);
      set_usdt(data?.usdt || 0);
    } catch (error) {
      // if wallet not active then it will fetch to fetch balance, then we can see the balance with transactioins!
      const { data: trc20 } = await axios.get<{
        transactions: tronTransaction[];
      }>(`/api/tron/transaction/trc20/${wallet_address}`);
      let balance = 0;

      trc20?.transactions.forEach((tx) => {
        const value = tronWeiToBalance(Number(tx.value));
        if (tx.to === wallet_address) {
          balance += value;
        } else if (tx.from === wallet_address) {
          balance -= value;
        }
      });

      set_usdt(balance);

      setIsWalletActive(false);
    } finally {
      set_refreshing(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => {
        refreshBalance();
      },
      1000 * 60 * 15
    );

    return () => {
      console.log("clean check balance!!");
      clearInterval(interval);
    };
  }, [refreshBalance]);

  useEffect(() => {
    if (!refreshing) return;
    refreshBalance();
  }, []);

  return {
    refreshing,
    usdt,
    trx,
    refreshBalance,
    isWalletActive,
    set_refreshing,
  };
}
