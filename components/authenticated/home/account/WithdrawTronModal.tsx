"use client";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import NumberInput from "@/components/common/NumberInput";
import ConfirmPIN from "@/components/ConfirmPIN";
import useTheme from "@/components/hooks/useTheme";
import ModalContainer from "@/components/modals/ModalContainer";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  opened: boolean;
  onClose: () => void;
  refresh: () => void;
  user: userSchemaType;
  usdt: number;
  trx: number;
}

const WithdrawTronModal = ({
  opened,
  onClose,
  user,
  usdt,
  trx,
  refresh,
}: Props) => {
  const { mode } = useTheme();
  const [selected, setSelected] = useState<tronSymbol>("USDT");
  const [amount, setAmount] = useState("" as any);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toAddress, setToAddress] = useState("");

  async function sendTransaction() {
    try {
      const { data } = await axios.post("/api/tron/transaction/send", {
        userId: user?._id,
        amount,
        to: toAddress,
        contractType: selected,
        availableAmount: selected === "TRX" ? trx : usdt,
      });
      data?.txId
        ? toast.success("transaction sent!")
        : toast.error("something was wrong, try again!");
    } finally {
      refresh && refresh();
      onClose();
    }
  }

  return (
    <>
      <ConfirmPIN
        confirmHandler={sendTransaction}
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        userId={user?._id}
      />

      <ModalContainer
        title="Withdraw (tron network)"
        opened={opened}
        onClose={onClose}
      >
        <div className="flex flex-col justify-center items-center gap-3 py-8">
          <div className="w-full flex gap-2 flex-wrap justify-start">
            <Button
              color="custom"
              className={`${selected === "USDT" ? "bg-blue-600 text-white transform scale-110 ring" : "bg-blue-400 text-white"} font-semibold !w-fit`}
              size="sm"
              onClick={() => {
                setAmount(usdt);
                setSelected("USDT");
              }}
            >
              USDT <small> ({usdt}) </small>
            </Button>
            <Button
              color="custom"
              className={`${selected === "TRX" ? "bg-blue-600 text-white transform scale-110 ring" : "bg-blue-400 text-white"} font-semibold !w-fit`}
              size="sm"
              onClick={() => {
                setAmount(trx);
                setSelected("TRX");
              }}
            >
              TRX <small> ({trx}) </small>
            </Button>
          </div>

          <div className={`relative w-full`}>
            <NumberInput
              maxNumber={selected === "USDT" ? usdt : trx}
              placeholder="Amount"
              getValue={setAmount}
              setValue={amount > 0 ? amount : ""}
            />

            <div
              className={`${mode === "dark" ? "bg-gray-900" : "bg-white"} absolute inset-y-0 my-auto right-1 px-2 w-fit h-6 flex items-center justify-center font-semibold gap-2`}
            >
              <button
                onClick={() => setAmount(selected === "USDT" ? usdt : trx)}
                className="text-gray-500 hover:text-blue-500"
              >
                max
              </button>
              <span className="text-gray-500"> {selected} </span>
            </div>
          </div>

          <Input
            onChange={(e) => setToAddress(e.target.value.trim())}
            placeholder="Receiver Wallet Address"
          />

          <div className="w-fit mr-auto">
            <Button
              onClick={() => {
                setShowConfirm(true);
                onClose();
              }}
              className="!w-fit"
              color="green"
            >
              Continue
            </Button>
          </div>
        </div>
      </ModalContainer>
    </>
  );
};

export default WithdrawTronModal;
