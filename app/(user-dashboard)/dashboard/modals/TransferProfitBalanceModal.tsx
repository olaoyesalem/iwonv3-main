"use client";
import Button from "@/components/common/Button";
import NumberInput from "@/components/common/NumberInput";
import Text from "@/components/common/Text";
import useTheme from "@/components/hooks/useTheme";
import ModalContainer from "@/components/modals/ModalContainer";
import TextInput from "@/components/TextInput";

import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";

interface Props {
  opened: boolean;
  onClose: () => void;
  user: userSchemaType;
}

export default function TransferProfitBalanceModal({
  opened,
  onClose,
  user,
}: Props) {
  const { mode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("" as any);
  const [receiverUsername, setReceiverUsername] = useState("" as any);
  const [minTransfer] = useState(0.5);

  async function transferHandler() {
    if (amount < minTransfer) {
      toast.error(`minimum ${minTransfer} USDT required!`);
      return;
    }

    if (user?.profitBalance < minTransfer) {
      toast.error("Insufficient balance!");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/transactions/transfer-profit`, {
        amount,
        senderId: user?._id,
        receiverUsername,
      });
      if (data?.success) {
        toast.success(data?.message);
        setTimeout(() => {
          location.reload();
        }, 500);
      } else {
        toast.error(
          data?.message || data?.error || "Something was wrong, try again!"
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message || error?.error || "Something was wrong, try again!"
      );
    } finally {
      setLoading(false);
      onClose();
    }
  }

  return (
    <ModalContainer
      title="Transfer profit to another account (internal)"
      opened={opened}
      onClose={onClose}
    >
      <div className="w-full flex flex-col justify-center items-start gap-3 py-8">
        <div className="text-lg font-medium text-left flex items-center gap-x-2">
          <Text>Your Profit Balance:</Text>

          <span className="font-extrabold text-green-600">
            {user?.profitBalance} USDT
          </span>
        </div>

        <div className="w-full space-y-2">
          <div className={`relative w-full`}>
            <NumberInput
              placeholder="Transfer Amount"
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
          <div>
            <TextInput
              placeholder="Receiver 'username'"
              onChange={(e) => setReceiverUsername(e.target.value?.trim())}
            />
          </div>
        </div>

        <div className="w-fit flex gap-x-2">
          <Button
            onClick={transferHandler}
            disabled={user?.profitBalance < minTransfer}
            loading={loading}
            className="!w-fit"
            color="orange"
          >
            Transfer
            <FaArrowRight />
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}
