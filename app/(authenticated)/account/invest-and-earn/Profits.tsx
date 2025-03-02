"use client";
import Button from "@/components/common/Button";
import useThemeFixedClasses from "@/components/hooks/useThemeFixedClasses";
import ArrowUp from "@/components/icons/ArrowUp";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import TransferProfitBalanceModal from "./TransferProfitBalanceModal";
import InvestProfitBalanceModal from "./InvestProfitBalanceModal";
import ArrowTradingUp from "@/components/icons/ArrowTradingUp";
import { useRouter } from "next/navigation";
interface Props {
  user: userSchemaType;
}

export default function Profits({ user }: Props) {
  const { classes } = useThemeFixedClasses();
  const router = useRouter();
  const [showTransferProfit, setShowTransferProfiit] = useState(false);
  const [showReInvest, setShowReInvest] = useState(false);

  return (
    <div className={`space-y-1`}>
      <div className={`${classes()} p-2 sm:p-4 rouded-sm`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="text-xl flex items-center gap-x-2">
            <span className="font-medium">Profits Balance:</span>
            <span className="text-xl font-bold text-green-600">
              + {(user?.profitBalance || 0)?.toFixed(2)} USDT
            </span>
          </div>

          <div className="w-fit flex flex-wrap items-center gap-1 md:gap-x-2">
            <Button
              onClick={() => setShowReInvest(true)}
              className="py-2 px-1 !w-fit"
              color="orange"
            >
              <span> Re-Earn </span>
              <ArrowTradingUp />
            </Button>

            <Button
              onClick={() => setShowTransferProfiit(true)}
              size="custom"
              className="py-2 px-1 !w-fit"
              color="red"
            >
              <span> Transfer </span>
              <FaArrowRight stroke={"0.5"} />
            </Button>
            <Button
              onClick={() => router.push("/dashboard")}
              size="custom"
              className="py-2 px-1 !w-fit"
              color="green"
            >
              <span> Withdraw </span>
              <ArrowUp />
            </Button>
          </div>
        </div>
      </div>

      <TransferProfitBalanceModal
        opened={showTransferProfit}
        onClose={() => setShowTransferProfiit(false)}
        user={user || ({} as userSchemaType)}
      />

      <InvestProfitBalanceModal
        opened={showReInvest}
        onClose={() => {
          setShowReInvest(false);
        }}
        user={user || ({} as userSchemaType)}
      />
    </div>
  );
}
