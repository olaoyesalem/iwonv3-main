"use client";
import Button from "@/components/common/Button";
import NumberInput from "@/components/common/NumberInput";
import Text from "@/components/common/Text";
import ConfirmPIN from "@/components/ConfirmPIN";
import useTheme from "@/components/hooks/useTheme";
import ArrowUp from "@/components/icons/ArrowUp";
import ModalContainer from "@/components/modals/ModalContainer";
import TextInput from "@/components/TextInput";
import axios from "axios";
import { Checkbox } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  opened: boolean;
  onClose: () => void;
  user: userSchemaType;
}

export default function WithdrawProfitBalanceModalByAdmin({
  opened,
  onClose,
  user,
}: Props) {
  const { mode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("" as any);
  const [withdrawalAddress, setWithdrawalAddress] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);

  const [onlyForTransaction, setOnlyForTransaction] = useState(false);

  const [minWithdraw] = useState(1);

  async function withdrawHandler() {
    if (amount < minWithdraw) {
      toast.error(`minimum ${minWithdraw} USDT required!`, { duration: 600 });
      return;
    }

    if (amount > user?.profitBalance) {
      toast.error(`Insufficient balance!`, { duration: 600 });
      return;
    }

    if (!withdrawalAddress)
      return toast.error("Missing your tron wallet address");

    setLoading(true);

    try {
      const { data } = await axios.post("/api/withdraw/profit", {
        amount,
        userId: user?._id,
        withdrawalAddress,
        onlyForTransaction,
      });

      if (data?.error) {
        toast.error(data?.error);
      } else {
        toast.success("You've received, please check!");
        setTimeout(() => {
          location.reload();
        }, 700);
      }
    } catch (error: any) {
      toast.error("Something wrong, Please contact with support!");
    } finally {
      setLoading(false);
      onClose();
    }
  }

  return (
    <>
      <ModalContainer title="Withdraw Profit" opened={opened} onClose={onClose}>
        <div className="w-full flex flex-col justify-center items-start gap-3 py-8">
          <h5 className="text-lg font-medium text-left flex items-center gap-x-2">
            <Text>Profit Balance:</Text>
            <span className="font-extrabold text-green-600">
              {user?.profitBalance} USDT
            </span>
            <Text className="text-xs"> (min {minWithdraw}) </Text>
          </h5>

          <div className="w-full space-y-2">
            <div className={`relative w-full`}>
              <NumberInput
                placeholder="Withdraw Amount"
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
                onChange={(e) => setWithdrawalAddress(e.target.value?.trim())}
                placeholder="Any (tron/tronTRC20) wallet address..."
              />
            </div>
          </div>

          <label htmlFor="onlyForTransaction">
            <Checkbox
              id="onlyForTransaction"
              checked={onlyForTransaction}
              onChange={(e) => setOnlyForTransaction(e.target.checked)}
            />
            <span className="ml-2">Create Transaction Only?</span>
          </label>
          <div className="w-fit flex gap-x-2">
            <Button
              onClick={() => {
                setShowConfirm(true);
                onClose();
              }}
              loading={loading}
              className="!w-fit"
              color="orange"
            >
              Withdraw
              <ArrowUp />
            </Button>
          </div>
        </div>
      </ModalContainer>{" "}
      <ConfirmPIN
        confirmHandler={withdrawHandler}
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        userId={user?._id}
      />
    </>
  );
}
