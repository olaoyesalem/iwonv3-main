"use client";
import "animate.css";
import useTheme from "@/components/hooks/useTheme";
import { useRouter } from "next/navigation";
import React from "react";
import formatNumber from "@/constants/formatNumber";
import formatDate from "@/constants/formatDate";

import Button from "@/components/Button";
import useCompany from "@/components/hooks/useCompany";

interface TransactionCardProps {
  item: TransactionType;
  user: userSchemaType;
}

const AdminTransactionCard = ({ item, user }: TransactionCardProps) => {
  const { mode } = useTheme();
  const { push } = useRouter();
  const { title, amount, status, category, createdAt, senderName, _id } = item;
  const date = createdAt && new Date(createdAt);
  const formattedDate = formatDate(date);

  const { company } = useCompany();
  const currency = company?.currency.symbol;

  return (
    <div
      className={`max-w-[250px] w-[90%] h-[300px] 
    shadow-md rounded-md p-5 
    transition-all duration-300 hover:scale-105 
    hover:shadow-lg flex flex-col items-center 
    gap-3 justify-center
    ${
      mode === "light"
        ? "shadow-[#d9d9d9] hover:shadow-[#c1c1c1]"
        : "shadow-[#5d5d5d] hover:shadow-[#7b7b7b]"
    }`}
    >
      <div className="flex flex-col items-center">
        <div>
          user: <b>{user?.username}</b>{" "}
        </div>
        <div className="mt-4 mb-1 capitalize text-yellow-500 font-bold">
          {category}
        </div>

        <div
          className={`font-normal italic text-sm 
          ${status === "pending" && "text-[#2196f3]"} 
          ${status === "successful" && "text-[#00c853]"} 
          ${status === "paid" && "text-[#33c570]"} 
          ${status === "processing" && "text-[#ff9800]"} 
          ${status === "action-needed" && "text-rose-400"} 
          ${status === "rejected" && "text-[#f44336]"}`}
        >
          {status === "pending" && "Pending..."}
          {status === "successful" && "Successful"}
          {status === "processing" && "Processing..."}
          {status === "action-needed" && "Action Needed"}
          {status === "rejected" && "Rejected"}
          {status === "paid" && "Paid"}
        </div>
      </div>

      <div>
        {currency}
        {formatNumber(+amount)}
      </div>

      <div className="flex flex-col gap-1.5 text-center items-center justify-center">
        <div
          className={`font-semibold
            ${mode === "light" ? "text-gray-500" : "text-white"}`}
        >
          {title}
        </div>
        <div className={`font-semibold text-sm text-gray-300`}>
          {`${formattedDate} . ${
            category === "money-received" ? senderName : ""
          }`}
        </div>
      </div>

      <Button
        onClick={() => push(`/admin/transactions/${_id}`)}
        label={"View Details"}
      />
    </div>
  );
};

export default AdminTransactionCard;
