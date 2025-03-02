"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function useUserInvestments(userId?: string) {
  const [loading, setLoading] = useState(false);
  const [deposits, setDeposits] = useState([] as depositType[]);

  const refreshDeposits = async () => {
    setLoading(true);
    if (!userId) return;

    try {
      const { data } = await axios(`/api/invest/all/${userId}`);
      if (data?.error) throw new Error(data?.error || "something goes wrong!");
      setDeposits(data);
    } catch (error: any) {
      console.log("fetch deposits error::", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    refreshDeposits();
  }, []);

  return {
    deposits,
    loading,
    refreshDeposits,
  };
}
