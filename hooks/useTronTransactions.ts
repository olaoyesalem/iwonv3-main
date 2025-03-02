import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

export default function useTronTransactions(address: string) {
  const [activeTab, setActiveTab] = useState<"trc20" | "trx">("trc20");
  const [loading, setLoading] = useState(false);
  const [trc20Transactions, setTrc20Transactions] = useState<tronTransaction[]>(
    []
  );
  const [trxTransactions, setTrxTransactions] = useState<tronTransaction[]>([]);

  const getTransactions = useCallback(async () => {
    if (!address) return;

    setLoading(true);

    try {
      const { data: trc20 } = await axios.get<{
        transactions: tronTransaction[];
      }>(`/api/tron/transaction/trc20/${address}`);

      const { data: trx } = await axios.get<{
        transactions: tronTransaction[];
      }>(`/api/tron/transaction/trx/${address}`);
      setTrc20Transactions(trc20?.transactions || []);
      setTrxTransactions(trx?.transactions || []);

      if (trc20?.transactions?.length > 0) {
        setActiveTab("trc20");
      } else if (trx?.transactions?.length > 0) {
        setActiveTab("trx");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return {
    trc20Transactions,
    trxTransactions,
    getTransactions,
    loading,
    activeTab,
    setActiveTab,
  };
}
