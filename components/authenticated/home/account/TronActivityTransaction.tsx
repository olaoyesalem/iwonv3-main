import ArrowDown from "@/components/icons/ArrowDown";
import ArrowUp from "@/components/icons/ArrowUp";
import isTronReceived from "@/lib/isTronReceived";
import tronWeiToBalance from "@/lib/tronWeiToBalance";
import React from "react";

export default function TronActivityTransaction({
  transaction,
  user_wallet_address,
}: {
  transaction: tronTransaction;
  user_wallet_address: string;
}) {
  const isReceived = isTronReceived(transaction, user_wallet_address);

  return (
    <div className="flex items-center justify-between gap-4 p-2 rounded bg-gray-500 bg-opacity-10 hover:bg-opacity-20 transition-all cursor-pointer">
      <div className="flex items-center gap-x-3">
        <div
          className={`${isReceived ? "bg-green-600" : "bg-red-500"} text-white w-7 h-7 rounded-full shadow flex items-center justify-center`}
        >
          {isReceived ? <ArrowDown stroke={3} /> : <ArrowUp stroke={3} />}
        </div>
        <div className="flex flex-col">
          {isReceived ? (
            <span className="text-green-600 font-semibold">Received</span>
          ) : (
            <span className="text-red-500 font-semibold"> Send </span>
          )}
          <small className="text-green-700"> Confirm </small>
        </div>
      </div>
      <div className="font-bold">
        {isReceived ? (
          <span className="text-green-600 text-sm">
            +{tronWeiToBalance(Number(transaction?.value))}{" "}
            {transaction?.tokenInfo?.symbol}
          </span>
        ) : (
          <span className="text-red-400 text-sm">
            -{tronWeiToBalance(Number(transaction?.value))}{" "}
            {transaction?.tokenInfo?.symbol}
          </span>
        )}
      </div>
    </div>
  );
}
