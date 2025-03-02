import useTheme from "@/components/hooks/useTheme";
import ArrowRotateRight from "@/components/icons/ArrowRotateRight";
import React from "react";
import ActivityTransaction from "./ActivityTransaction";
import TailwindSkeletonMultiple from "@/components/common/TailwindSkeletonMultiple";

interface Props {
  user: userSchemaType;
  usdtTransactions: polygonTransaction[];
  maticTransactions: polygonTransaction[];
  getTransactions: () => Promise<void>;
  loading: boolean;
  activeTab: "usdt" | "matic";
  setActiveTab: React.Dispatch<React.SetStateAction<"usdt" | "matic">>;
}

export default function PolygonActivities({ user, ...others }: Props) {
  const { mode } = useTheme();
  const {
    usdtTransactions,
    maticTransactions,
    getTransactions,
    loading,
    activeTab,
    setActiveTab,
  } = others;

  return (
    <div
      className={`${mode === "dark" ? "sm:bg-black" : "sm:bg-white"} bg-opacity-50 sm:p-4 rounded-sm relative`}
    >
      <div className="py-2">
        <h2 className="text-lg font-semibold"> Activities </h2>
        <div className="py-1 flex items-center justify-start gap-x-2">
          <button
            onClick={() => setActiveTab("usdt")}
            className={` ${activeTab === "usdt" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"} font-semibold`}
          >
            ERC20 <small className="font-semibold">(USDT)</small>
          </button>
          <button
            onClick={() => setActiveTab("matic")}
            className={` ${activeTab === "matic" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"} font-semibold`}
          >
            MATIC
          </button>
        </div>
        <div className="flex flex-col gap-y-2 max-h-[500px] overflow-y-auto py-2">
          {loading ? (
            <TailwindSkeletonMultiple total={5} className="w-full h-[50px]" />
          ) : (
            (activeTab === "usdt" ? usdtTransactions : maticTransactions)?.map(
              (t) =>
                Number(t?.amount || "0") ? (
                  <ActivityTransaction
                    amount={Number(t?.amount || "0")}
                    symbol={activeTab?.toUpperCase()}
                    isReceived={t?.transactionSubtype === "incoming"}
                  />
                ) : null
            )
          )}

          {(activeTab === "usdt" ? usdtTransactions : maticTransactions)
            ?.length < 1 && !loading ? (
            <div className="py-3">
              <p className="text-sm opacity-50">You have no transactions </p>
            </div>
          ) : null}
        </div>
      </div>

      <button
        onClick={getTransactions}
        title="refresh balance"
        className={`${loading ? "animate-spin" : ""} absolute right-4 top-4 w-fit h-fit`}
      >
        <ArrowRotateRight />
      </button>
    </div>
  );
}
