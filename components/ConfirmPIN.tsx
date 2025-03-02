import Button from "@/components/common/Button";
import InputPassword from "@/components/common/InputPassword";
import ArrowUp from "@/components/icons/ArrowUp";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ModalContainer from "./modals/ModalContainer";

interface Props {
  confirmHandler(): Promise<any> | void;
  userId: string;
  open: boolean;
  onClose(): void;

  successMessage?: string;
  title?: string;
}

export default function ConfirmPIN({
  confirmHandler,
  userId,
  successMessage,
  title,
  open,
  onClose,
}: Props) {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  async function confirm() {
    setLoading(true);
    try {
      const { data } = await axios.post<{ success: boolean }>(
        `/api/auth/pin/verify`,
        { pin, userId }
      );

      if (data?.success) {
        confirmHandler && (await confirmHandler());
        successMessage && toast.success(successMessage);
      } else {
        toast.error("incorrect pin!");
      }
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
      onClose();
    }
  }

  return (
    <ModalContainer
      title={title || "Please verify your PIN!"}
      opened={open}
      onClose={onClose}
    >
      <div className="py-2 space-y-2">
        <InputPassword
          onChange={(e) => setPin(e.target.value?.trim())}
          value={pin}
          placeholder="Your PIN"
        />

        <Button
          loading={loading}
          onClick={confirm}
          className="!w-fit"
          color="green"
        >
          Confirm <ArrowUp />
        </Button>
      </div>
    </ModalContainer>
  );
}
