import TailwindSkeleton from "@/components/common/TailwindSkeleton";
import useTheme from "@/components/hooks/useTheme";
import ArrowRotateRight from "@/components/icons/ArrowRotateRight";
import React from "react";

interface Props {
  refreshing: boolean;
  usdt: number;
  trx: number;
  refreshBalance: () => Promise<void>;
  set_refreshing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserTronBalance(props: Props) {
  const { mode } = useTheme();

  const { refreshing, refreshBalance, usdt, trx, set_refreshing } = props;

  return (
    <>
      <div className="space-y-1.5">
        <h3
          className={`font-extrabold flex items-center gap-x-1 text-lg sm:text-xl  
        ${mode === "light" ? "text-gray-800" : "text-white"}`}
        >
          {refreshing ? (
            <div className="w-32 h-8">
              <TailwindSkeleton />
            </div>
          ) : (
            <>
              <img
                className="w-7 rounded-full"
                src="/assets/img/icon/tether.svg"
                alt=""
              />
              <span className="tracking-wider">{(usdt || 0)?.toFixed(2)}</span>
              <span className="ml-0.5">USDT</span>
            </>
          )}
        </h3>

        <div className="space-y-2">
          <h3
            className={`font-extrabold flex items-center gap-x-1 text-lg sm:text-xl  
        ${mode === "light" ? "text-gray-800" : "text-white"}`}
          >
            {refreshing ? (
              <div className="w-32 h-8">
                <TailwindSkeleton />
              </div>
            ) : (
              <>
                <img
                  className="w-7 rounded-full"
                  src="/assets/img/icon/tron.svg"
                  alt=""
                />
                <span className="tracking-wider">{trx.toFixed(2)}</span>
                <span className="ml-0.5">TRX</span>
              </>
            )}
          </h3>

          {trx < 2 && !refreshing ? (
            <p className="text-sm bg-yellow-50 text-yellow-600 p-1.5 md:p-2 rounded-sm !font-light">
              You need to add a small amount of
              <b className="!font-bold"> TRX </b>
              to cover blockchain gas fees for withdrawals and deposits. This is
              also necessary to ensure your wallet remains active.
            </p>
          ) : null}
        </div>
      </div>

      <button
        onClick={() => {
          set_refreshing(true);
          refreshBalance();
        }}
        title="refresh balance"
        className={`${refreshing ? "animate-spin" : ""} absolute right-4 top-4 w-fit h-fit`}
      >
        <ArrowRotateRight />
      </button>
    </>
  );
}
