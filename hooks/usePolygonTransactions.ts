import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function usePolygonTransactions(address: string) {
  const [activeTab, setActiveTab] = useState<"usdt" | "matic">("usdt");
  const [loading, setLoading] = useState(false);

  const [usdtTransactions, setusdtTransactions] = useState<
    polygonTransaction[]
  >([]);

  const [maticTransactions, setmaticTransactions] = useState<
    polygonTransaction[]
  >([]);

  const getTransactions = useCallback(async () => {
    if (!address) return;

    setLoading(true);

    try {
      const { data } = await axios.get<{
        matic: polygonTransaction[];
        usdt: polygonTransaction[];
      }>(`/api/v2/polygon/transactions/${address}`);

      setusdtTransactions(data?.usdt || []);
      setmaticTransactions(data?.matic || []);

      if (data?.usdt?.length > 0) {
        setActiveTab("usdt");
      } else if (data?.matic?.length > 0) {
        setActiveTab("matic");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return {
    usdtTransactions,
    maticTransactions,
    getTransactions,
    loading,
    activeTab,
    setActiveTab,
  };
}
