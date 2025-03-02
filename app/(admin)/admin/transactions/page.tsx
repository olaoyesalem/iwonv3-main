"use client";
import TextInput from "@/components/TextInput";
import TransactionCard from "@/components/admin/transaction/TransactionCard";
import useCompany from "@/components/hooks/useCompany";
import { Loader, SegmentedControl } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineInbox } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import SelectUserTransactions from "./SelectUserTransactions";
import useUsers from "@/hooks/useUsers";
import Button from "@/components/common/Button";
import { exportToExcel } from "@/lib/exportExcel";

const Page = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const adminId = (session?.user as { id: string })?.id;

  const { users, usersObject } = useUsers(true);
  const [filterStatusValue, setFilterStatusValue] = useState("all");
  const [filterCategoryValue, setFilterCategoryValue] = useState("all");
  const [filterUserId, setFilterUserId] = useState("");
  const matches = useMediaQuery("(min-width: 56.25em)");

  const [searchInput, setSearchInput] = useState("");
  const [displayTransaction, setDisplayTransaction] = useState(transactions);

  const { company } = useCompany();
  const primaryLightColor = company?.color.primaryLight;

  const searchInputChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const enteredText = e.target.value;
      setSearchInput(enteredText);
      const copyTransactions = transactions.slice(0);
      const filteredTransactions = copyTransactions.filter(
        (item) =>
          item?.title?.toLowerCase()?.includes(enteredText?.toLowerCase()) ||
          item?.status?.toLowerCase()?.includes(enteredText?.toLowerCase())
      );
      setDisplayTransaction(filteredTransactions);
    },
    [transactions]
  );

  // advance filtering
  useEffect(() => {
    const userId = filterUserId;
    const status = filterStatusValue;
    const category = filterCategoryValue;

    // Clone transactions to avoid mutating state directly
    const copyTransactions = transactions.slice(0);

    // Filter transactions based on criteria
    const filteredTransactions = copyTransactions.filter((item) => {
      const matchUserId = userId ? item?.userId?.toString() === userId : true;
      const matchStatus = status !== "all" ? item.status === status : true;
      const matchCategory =
        category !== "all" ? item.category === category : true;

      return matchUserId && matchStatus && matchCategory;
    });

    // Update display transactions
    setDisplayTransaction(filteredTransactions);
  }, [filterUserId, filterStatusValue, filterCategoryValue, transactions]);

  const getTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/admin/transactions/${adminId}`);
      if (data.error) {
        console.log(data.error);
        throw new Error("Something went wrong");
      }
      setTransactions(data.reverse());
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [adminId]);

  useEffect(() => {
    if (adminId) getTransactions();
  }, [adminId, getTransactions]);

  useEffect(() => {
    setDisplayTransaction(transactions);
  }, [transactions]);

  return (
    <div className="flex flex-col w-full gap-10">
      <div
        className={`text-xl sm:text-2xl font-bold 
        flex justify-center`}
      >
        Transactions ({transactions.length})
      </div>

      <div className="flex flex-col gap-2 w-full justify-center items-center">
        <div className="w-fit flex items-center gap-x-2">
          <h5 className="font-semibold text-xl"> Status: </h5>
          <SegmentedControl
            fullWidth={true}
            orientation={matches ? "horizontal" : "vertical"}
            color="dark"
            value={filterStatusValue}
            onChange={setFilterStatusValue}
            data={[
              { label: "All", value: "all" },
              { label: "Paid", value: "paid" },
              { label: "Successful", value: "successful" },
              { label: "Pending", value: "pending" },
              { label: "Processing (For admin)", value: "processing" },
              { label: "Action Needed", value: "action-needed" },
              { label: "Rejected", value: "rejected" },
            ]}
          />
        </div>
        <div className="w-fit flex items-center gap-x-2">
          <h5 className="font-semibold text-xl"> Category: </h5>
          <SegmentedControl
            fullWidth={true}
            orientation={matches ? "horizontal" : "vertical"}
            color="dark"
            value={filterCategoryValue}
            onChange={setFilterCategoryValue}
            data={[
              { label: "All", value: "all" },
              { label: "Deposit", value: "deposit" },
              { label: "Profit", value: "profit" },
              { label: "Withdrawals", value: "withdrawal" },
              { label: "Node Purchase", value: "node-purchase" },
              { label: "Referral Commision", value: "referral-commision" },
              { label: "Re Deposit", value: "re-invest" },
            ]}
          />
        </div>

        <SelectUserTransactions users={users} onChangeId={setFilterUserId} />
      </div>

      <div className="flex-col lg:flex-row flex justify-center gap-4 w-full items-center">
        <div className="w-full max-w-[450px]">
          <TextInput
            icon={FaSearch}
            value={searchInput}
            onChange={searchInputChangeHandler}
            placeholder="Search Transactions"
          />
        </div>

        <div className="w-fit">
          <Button
            onClick={() =>
              exportToExcel(
                displayTransaction?.map((t) => ({
                  Date: new Date(t?.createdAt)?.toLocaleString(),
                  user: usersObject[t?.userId]?.username,
                  amount: t?.amount?.toFixed(2)?.toString(),
                  category: t?.category,
                  status: t?.status,
                  commissionFrom: t?.commissionFrom,
                  receiver: usersObject[t?.receiverId]?.username,
                  withdrawalAddress: t?.withdrawalAddress,
                })),

                "transactions"
              )
            }
            color="blue"
          >
            Export Data
          </Button>
        </div>
      </div>

      <div
        className="flex gap-3 items-center 
      flex-wrap justify-center"
      >
        {displayTransaction.map((item) => (
          <TransactionCard
            key={item._id}
            item={item}
            user={usersObject[item.userId]}
          />
        ))}

        {!loading && displayTransaction.length <= 0 && (
          <div className="flex justify-center flex-col items-center">
            <AiOutlineInbox color={primaryLightColor} size={100} />
            <div className={`font-semibold text-lg`}>
              No Availaible transactions
            </div>
          </div>
        )}

        {loading && displayTransaction.length <= 0 && (
          <Loader color={primaryLightColor} />
        )}
      </div>
    </div>
  );
};

export default Page;
