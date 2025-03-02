"use client";
import Button from "@/components/common/Button";
import NumberInput from "@/components/common/NumberInput";
import Text from "@/components/common/Text";
import useTheme from "@/components/hooks/useTheme";
import ArrowUp from "@/components/icons/ArrowUp";
import ModalContainer from "@/components/modals/ModalContainer";
import TextInput from "@/components/TextInput";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  opened: boolean;
  onClose: () => void;
  user: userSchemaType;
}

export default function WithdrawInvestBalanceModal({
  opened,
  onClose,
  user,
}: Props) {
  const { mode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("" as any);
  const [_receiverWallet, setReceiverWallet] = useState("" as any);
  const [minWithdraw] = useState(50);

  async function withdrawHandler() {
    console.log("called");
    if (amount < minWithdraw) {
      toast.error(`minimum ${minWithdraw} USDT required!`);
      return;
    }

    try {
      setLoading(true);

      setTimeout(() => {
        location.reload();
      }, 500);
    } catch (error: any) {
    } finally {
      setLoading(false);
      onClose();
    }
  }

  return (
    <ModalContainer
      title="Withdraw Your Investment"
      opened={opened}
      onClose={onClose}
    >
      <div className="w-full flex flex-col justify-center items-start gap-3 py-8">
        <h5 className="text-lg font-medium text-left flex flex-col sm:flex-row sm:items-center gap-x-2">
          <Text>Your Deposit Balance:</Text>

          <div>
            <span className="font-extrabold text-green-600">
              {user?.investBalance} USDT
            </span>
            <Text className="text-xs"> (min {minWithdraw}) </Text>
          </div>
        </h5>

        <div className="w-full space-y-2">
          <div className={`relative w-full`}>
            <NumberInput
              placeholder="Withdraw Amount"
              getValue={setAmount}
              maxNumber={user?.investBalance}
              setValue={amount > 0 ? amount : ""}
            />

            <div
              className={`${mode === "dark" ? "bg-gray-900" : "bg-white"} absolute inset-y-0 my-auto right-1 px-2 w-fit h-6 flex items-center justify-center font-semibold gap-2`}
            >
              <button
                onClick={() => setAmount(user?.investBalance)}
                className="text-gray-500 hover:text-blue-500"
              >
                max
              </button>
              <span className="text-gray-500"> USDT </span>
            </div>
          </div>
          <div>
            <TextInput
              placeholder="Receiver wallet address (tron)"
              onChange={(e) => setReceiverWallet(e.target.value?.trim())}
            />
          </div>
        </div>

        <div className="w-fit flex gap-x-2">
          <Button
            onClick={withdrawHandler}
            disabled={user?.investBalance < minWithdraw}
            loading={loading}
            className="!w-fit"
            color="orange"
          >
            Withdraw
            <ArrowUp />
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}
