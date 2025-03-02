"use client";
import Button from "@/components/common/Button";
import useThemeFixedClasses from "@/components/hooks/useThemeFixedClasses";
import ArrowUp from "@/components/icons/ArrowUp";
import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import InvestModal from "./InvestModal";
import DepositTronModal from "@/components/authenticated/home/account/DepositTronModal";
import WithdrawInvestBalanceModal from "./WithdrawInvestBalanceModal";

interface Props {
  user: userSchemaType;
}

export default function Investments({ user }: Props) {
  const { classes } = useThemeFixedClasses();
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [showDepositCrypto, setShowDepositCrypto] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  return (
    <div className={`space-y-1`}>
      <div className={`${classes()} p-2 sm:p-4 rouded-sm`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="text-xl flex items-center gap-x-2">
            <span className="font-medium">Deposit Balance:</span>
            <span className="text-xl font-bold text-orange-600">
              {user?.investBalance?.toFixed(2)} USDT
            </span>
          </div>

          <div className="w-fit flex items-center gap-x-2">
            <Button
              onClick={() => setShowInvestModal(true)}
              size="custom"
              className="py-2 px-1"
              color="orange"
            >
              <span> Earn </span>
              <FaPlusCircle />
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
        </div>
      </div>

      <InvestModal
        user={user}
        opened={showInvestModal}
        onClose={() => setShowInvestModal(false)}
        onShowDepositCrypto={() => setShowDepositCrypto(true)}
      />

      <DepositTronModal
        user={user}
        opened={showDepositCrypto}
        onClose={() => setShowDepositCrypto(false)}
      />

      <WithdrawInvestBalanceModal
        opened={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        user={user}
      />
    </div>
  );
}
