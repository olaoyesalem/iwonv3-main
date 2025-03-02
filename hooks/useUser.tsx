"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function useUser() {
  const { data: session } = useSession();
  const userId = (session?.user as { id: string })?.id;
  const [user, setUser] = useState<userSchemaType>({} as userSchemaType);
  const [loading, setLoading] = useState(false);

  const refreshUser = async () => {
    setLoading(true);
    const { data } = await axios(`/api/users/${userId || ""}`);
    if (data?.error) throw new Error(data?.error || "something goes wrong!");

    setUser(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const { data } = await axios(`/api/users/${userId}`);

        if (data?.error) {
          throw new Error(data?.error);
        }
        setUser(data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchData();
  }, [userId]);

  return {
    refreshUser,
    userId,
    user,
    session,
    loading,
    investBalance: user?.investBalance || 0,
    profitBalance: user?.profitBalance || 0,
  };
}
