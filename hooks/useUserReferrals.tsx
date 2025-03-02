"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function useUserReferrals(username?: string) {
  const [loading, setLoading] = useState(false);
  const [referrals, setReferrals] = useState([] as userSchemaType[]);

  const refreshReferrals = async () => {
    setLoading(true);
    if (!username) return;

    try {
      const { data } = await axios(`/api/users/referrals/${username}`);
      if (data?.error) throw new Error(data?.error || "something goes wrong!");
      setReferrals(data);
    } catch (error: any) {
      console.log("fetch referrals error::", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    refreshReferrals();
  }, []);

  return {
    referrals,
    loading,
    refreshReferrals,
  };
}
