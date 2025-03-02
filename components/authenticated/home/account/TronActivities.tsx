import useTheme from "@/components/hooks/useTheme";
import ArrowRotateRight from "@/components/icons/ArrowRotateRight";
import React from "react";
import TailwindSkeletonMultiple from "@/components/common/TailwindSkeletonMultiple";
import TronActivityTransaction from "./TronActivityTransaction";

interface Props {
  user: userSchemaType;

  trc20Transactions: tronTransaction[];
  trxTransactions: tronTransaction[];
  getTransactions: () => Promise<void>;
  loading: boolean;
  activeTab: "trc20" | "trx";
  setActiveTab: React.Dispatch<React.SetStateAction<"trc20" | "trx">>;
}

export default function TronActivities({ user, ...others }: Props) {
  const { mode } = useTheme();
  const {
    trc20Transactions,
    trxTransactions,
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
            onClick={() => setActiveTab("trc20")}
            className={` ${activeTab === "trc20" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"} font-semibold`}
          >
            TRC20
          </button>
          <button
            onClick={() => setActiveTab("trx")}
            className={` ${activeTab === "trx" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"} font-semibold`}
          >
            TRX
          </button>
        </div>
        <div className="flex flex-col gap-y-2 max-h-[500px] overflow-y-auto py-2">
          {loading ? (
            <TailwindSkeletonMultiple total={5} className="w-full h-[50px]" />
          ) : (
            (activeTab === "trc20" ? trc20Transactions : trxTransactions)?.map(
              (t) => (
                <TronActivityTransaction
                  user_wallet_address={user?.wallet?.tron?.address}
                  key={t?.txID}
                  transaction={t}
                />
              )
            )
          )}

          {(activeTab === "trc20" ? trc20Transactions : trxTransactions)
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
