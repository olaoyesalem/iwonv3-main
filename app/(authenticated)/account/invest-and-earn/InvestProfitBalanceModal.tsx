"use client";
import Button from "@/components/common/Button";
import NumberInput from "@/components/common/NumberInput";
import Text from "@/components/common/Text";
import useCompany from "@/components/hooks/useCompany";
import useTheme from "@/components/hooks/useTheme";
import ArrowTradingUp from "@/components/icons/ArrowTradingUp";
import ModalContainer from "@/components/modals/ModalContainer";
import useInvestProfitBalance from "@/hooks/useInvestProfitBalance";
import React, { useState } from "react";
import { FaQrcode } from "react-icons/fa";

interface Props {
  opened: boolean;
  onClose: () => void;
  user: userSchemaType;

  onShowDepositCrypto?: () => void;
  refreshUser?: () => Promise<void>;
}

export default function InvestProfitBalanceModal({
  opened,
  onClose,
  user,
  onShowDepositCrypto,
  refreshUser,
}: Props) {
  const { company } = useCompany();

  const { mode } = useTheme();
  const [amount, setAmount] = useState("" as any);

  const [minInvestRequired] = useState(5);

  const { makeInvest, loading } = useInvestProfitBalance({
    available: user?.profitBalance,
    minimum: minInvestRequired,
    amount: Number(amount),
    userId: user?._id,
    _finally() {
      onClose();
      refreshUser && refreshUser();
    },
  });

  return (
    <ModalContainer
      title="deposit from your PROFIT"
      opened={opened}
      onClose={onClose}
    >
      <div className="w-full flex flex-col justify-center items-start gap-3 py-8">
        <div className="text-lg font-medium text-left flex items-center gap-x-2">
          <Text>Profit Balance:</Text>
          <span className="font-extrabold text-green-600">
            {user?.profitBalance} USDT
          </span>
        </div>

        {user?.profitBalance < minInvestRequired ? (
          <div className="text-sm text-yellow-600 leading-4">
            <div className="w-fit mt-0.5">
              <Button
                size="custom"
                className="px-0.5 py-1"
                color="green"
                onClick={() => {
                  onClose();
                  onShowDepositCrypto && onShowDepositCrypto();
                }}
              >
                <FaQrcode />
                Deposit
              </Button>
            </div>
          </div>
        ) : null}

        <div className={`relative w-full`}>
          <NumberInput
            placeholder="Deposit Amount"
            getValue={setAmount}
            maxNumber={user?.profitBalance}
            setValue={amount > 0 ? amount : ""}
          />

          <div
            className={`${mode === "dark" ? "bg-gray-900" : "bg-white"} absolute inset-y-0 my-auto right-1 px-2 w-fit h-6 flex items-center justify-center font-semibold gap-2`}
          >
            <button
              onClick={() => setAmount(user?.profitBalance)}
              className="text-gray-500 hover:text-blue-500"
            >
              max
            </button>
            <span className="text-gray-500"> USDT </span>
          </div>
        </div>

        <div className="w-fit flex gap-x-2">
          <Button
            onClick={makeInvest}
            loading={loading}
            className="!w-fit"
            color="orange"
          >
            Earn
            <ArrowTradingUp />
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}
