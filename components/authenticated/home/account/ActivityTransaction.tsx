import ArrowDown from "@/components/icons/ArrowDown";
import ArrowUp from "@/components/icons/ArrowUp";
import React from "react";

export default function ActivityTransaction({
  amount,
  symbol,
  isReceived,
}: {
  amount: number;
  symbol: string;
  isReceived?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 p-2 rounded bg-gray-500 bg-opacity-10 hover:bg-opacity-20 transition-all cursor-pointer">
      <div className="flex items-center gap-x-3">
        <div
          className={`${isReceived ? "bg-green-500" : "bg-red-500"} text-white w-7 h-7 rounded-full shadow flex items-center justify-center`}
        >
          {isReceived ? <ArrowDown stroke={3} /> : <ArrowUp stroke={3} />}
        </div>
        <div className="flex flex-col">
          {isReceived ? (
            <span className="text-green-600 font-semibold"> Received </span>
          ) : (
            <span className="text-red-500 font-semibold"> Send </span>
          )}
          <small className="text-green-700"> Confirm </small>
        </div>
      </div>
      <div className="font-bold">
        {isReceived ? (
          <span className="text-green-500 text-sm">
            +{amount?.toFixed(4)} {symbol}
          </span>
        ) : (
          <span className="text-red-500 text-sm">
            {amount?.toFixed(4)} {symbol}
          </span>
        )}
      </div>
    </div>
  );
}
