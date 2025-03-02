import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function useRefreshPolygonBalance(wallet_address: string) {
  const [refreshing, set_refreshing] = useState(true);
  const [usdt, set_usdt] = useState(0);
  const [matic, set_matic] = useState(0);

  const refreshBalance = useCallback(async () => {
    if (!wallet_address) return;
    try {
      const { data } = await axios.get<{ matic: number; usdt: number }>(
        `/api/v2/polygon/balance/${wallet_address}`
      );
      set_usdt(data?.usdt || 0);
      set_matic(data?.matic || 0);
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
    refreshBalance,
    set_refreshing,
    usdt,
    matic,
  };
}
