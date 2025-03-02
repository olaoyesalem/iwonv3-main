"use client";
import Button from "@/components/common/Button";
import NumberInput from "@/components/common/NumberInput";
import TailwindSkeleton from "@/components/common/TailwindSkeleton";
import Text from "@/components/common/Text";
import useCompany from "@/components/hooks/useCompany";
import useTheme from "@/components/hooks/useTheme";
import ArrowRotateRight from "@/components/icons/ArrowRotateRight";
import ArrowTradingUp from "@/components/icons/ArrowTradingUp";
import ModalContainer from "@/components/modals/ModalContainer";

import useInvest from "@/hooks/useInvest";
import useRefreshBalance from "@/hooks/useRefreshTronBalance";
import getPercentage from "@/lib/getPercentageValue";
import React, { useState } from "react";
import { FaQrcode } from "react-icons/fa";

interface Props {
  opened: boolean;
  onClose: () => void;
  user: userSchemaType;

  onShowDepositCrypto?: () => void;
}

export default function InvestModal({
  opened,
  onClose,
  user,
  onShowDepositCrypto,
}: Props) {
  const { company } = useCompany();
  const userTronAddress = user?.wallet?.tron?.address;
  const { mode } = useTheme();
  const [amount, setAmount] = useState("" as any);
  const { usdt, refreshing, refreshBalance, set_refreshing } =
    useRefreshBalance(userTronAddress);

  const [minInvestRequired] = useState(100);

  const { makeInvest, loading } = useInvest({
    available: usdt,
    minimum: minInvestRequired,
    amount: Number(amount),
    userId: user?._id,
    _finally() {
      onClose();
    },
  });

  return (
    <ModalContainer
      title="deposit from your wallet"
      opened={opened}
      onClose={onClose}
    >
      <div className="w-full flex flex-col justify-center items-start gap-3 py-8">
        <div className="text-lg font-medium text-left flex flex-col sm:flex-row sm:items-center sm:gap-x-2">
          <Text>Available Balance:</Text>
          {refreshing ? (
            <div className="w-24 h-6">
              <TailwindSkeleton />
            </div>
          ) : (
            <div className="flex items-center gap-x-2">
              <span className="font-extrabold text-green-600">
                {usdt?.toFixed(2)} USDT
              </span>
              <button
                onClick={() => {
                  set_refreshing(true);
                  refreshBalance();
                }}
                title="refresh balance"
                className={`${refreshing ? "animate-spin" : ""} w-fit h-fit`}
              >
                <ArrowRotateRight />
              </button>
            </div>
          )}
        </div>

        {usdt < minInvestRequired ? (
          <div className="text-sm text-yellow-600 leading-4">
            The minimum deposit requirement is <b> {minInvestRequired} USDT</b>.
            To ensure a seamless transaction, please maintain a sufficient
            balance in your wallet. Please add min
            <b> {minInvestRequired - usdt} USDT </b> to continue!
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

        <div>
          After network and transaction fees. Your deposit will be{" "}
          <b>
            {(
              amount - getPercentage(amount, company?.investPercentageFees || 0)
            )?.toFixed(2)}
            USDT
          </b>
        </div>

        <div className={`relative w-full`}>
          <NumberInput
            placeholder="Deposit Amount"
            getValue={setAmount}
            maxNumber={usdt}
            setValue={amount > 0 ? amount : ""}
          />

          <div
            className={`${mode === "dark" ? "bg-gray-900" : "bg-white"} absolute inset-y-0 my-auto right-1 px-2 w-fit h-6 flex items-center justify-center font-semibold gap-2`}
          >
            <button
              onClick={() => setAmount(usdt)}
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
