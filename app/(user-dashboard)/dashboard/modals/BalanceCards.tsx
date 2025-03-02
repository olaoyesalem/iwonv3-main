"use client";

import { Card } from "flowbite-react";
import { useState } from "react";
import InvestModal from "./InvestModal";
import WithdrawInvestBalanceModal from "./WithdrawInvestBalanceModal";
import TransferProfitBalanceModal from "./TransferProfitBalanceModal";
import WithdrawProfitBalanceModal from "./WithdrawProfitBalanceModal";
import InvestProfitBalanceModal from "./InvestProfitBalanceModal";
import DepositTronModal from "@/components/authenticated/home/account/DepositTronModal";
import Button from "@/components/common/Button";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import ArrowUp from "@/components/icons/ArrowUp";
import ArrowTradingUp from "@/components/icons/ArrowTradingUp";
import FixedComponents from "@/components/common/FixedComponents";

export default function BalanceCards({ user }: { user: userSchemaType }) {
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showTransferProfit, setShowTransferProfiit] = useState(false);
  const [showWithdrawProfit, setShowWithdrawProfit] = useState(false);
  const [showReInvest, setShowReInvest] = useState(false);
  const [showDepositCrypto, setShowDepositCrypto] = useState(false);

  return (
    <div className="space-y-4 sm:space-y-0 sm:grid grid-cols-2 sm:gap-4">
      <Card className={`bg-gray-50 shadow-sm rounded`}>
        <div>
          <h3 className="text-2xl font-bold text-black">
            {user?.investBalance?.toFixed(2)} USDT
          </h3>
          <h6 className="text-lg font-semibold tracking-tight text-orange-400 flex items-center gap-x-2">
            Deposit Balance
          </h6>
        </div>

        <div className="w-fit flex items-center gap-x-2">
          <Button
            onClick={() => setShowInvestModal(true)}
            size="custom"
            className="py-2 px-1"
            color="orange"
          >
            <span> Earn </span>
            <FaPlus />
          </Button>

          <Button
            onClick={() => setShowWithdrawModal(true)}
            size="custom"
            className="py-2 px-1"
            color="green"
            disabled={true}
          >
            <span> Withdraw </span>
            <ArrowUp />
          </Button>
        </div>
      </Card>

      <Card className={`bg-gray-50 shadow-sm rounded`}>
        <div>
          <h3 className="text-2xl font-bold text-black">
            {user?.profitBalance?.toFixed(2)} USDT
          </h3>
          <h6 className="text-lg font-semibold tracking-tight text-orange-400 flex items-center gap-x-2">
            Profit Balance
          </h6>
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
            onClick={() => setShowWithdrawProfit(true)}
            size="custom"
            className="py-2 px-1 !w-fit"
            color="green"
          >
            <span> Withdraw </span>
            <ArrowUp />
          </Button>
        </div>
      </Card>

      <FixedComponents>
        {/* Modals */}
        <InvestModal
          user={user}
          opened={showInvestModal}
          onClose={() => setShowInvestModal(false)}
          onShowDepositCrypto={() => setShowDepositCrypto(true)}
        />

        <WithdrawInvestBalanceModal
          opened={showWithdrawModal}
          onClose={() => setShowWithdrawModal(false)}
          user={user}
        />

        <DepositTronModal
          user={user}
          opened={showDepositCrypto}
          onClose={() => setShowDepositCrypto(false)}
        />

        <TransferProfitBalanceModal
          opened={showTransferProfit}
          onClose={() => setShowTransferProfiit(false)}
          user={user || ({} as userSchemaType)}
        />

        <WithdrawProfitBalanceModal
          opened={showWithdrawProfit}
          onClose={() => setShowWithdrawProfit(false)}
          user={user || ({} as userSchemaType)}
        />

        <InvestProfitBalanceModal
          opened={showReInvest}
          onClose={() => {
            setShowReInvest(false);
          }}
          user={user || ({} as userSchemaType)}
        />
      </FixedComponents>
    </div>
  );
}
