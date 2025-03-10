"use client";
import Account from "@/components/authenticated/home/account";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Loader } from "@mantine/core";
import axios from "axios";
import { toast } from "react-hot-toast";
import useCompany from "@/components/hooks/useCompany";
import useTheme from "@/components/hooks/useTheme";

const Page = () => {
  const { data: session } = useSession();
  const userId = (session?.user as { id: string })?.id;
  const [user, setUser] = useState<userSchemaType>();
  const [userTransactions, setUserTransaction] = useState<TransactionType[]>();

  const { company } = useCompany();
  const { mode } = useTheme();
  const primary = company?.color.primary;
  const primaryLight = company?.color.primaryLight;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: fetchedTransactions } = await axios(
          `/api/transactions/user/${userId}`
        );
        const { data: fetchedUser } = await axios(`/api/users/${userId}`);

        if (fetchedTransactions.error || fetchedUser.error) {
          throw new Error("Something went wrong getting user or transactions");
        }

        setUser(fetchedUser);
        setUserTransaction(fetchedTransactions);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    if (userId) fetchData();
  }, [userId]);

  if (!user || !userTransactions) {
    return (
      <div
        className="flex w-full justify-center items-center 
      min-h-[60vh]"
      >
        <Loader color={mode === "light" ? primary : primaryLight} />
      </div>
    );
  }

  return <Account user={user} />;
};

export default Page;
