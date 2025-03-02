"use client";
import Button from "@/components/common/Button";
import NumberInput from "@/components/common/NumberInput";
import QuestionPopover from "@/components/common/QuestionPopover";
import useTheme from "@/components/hooks/useTheme";
import ModalContainer from "@/components/modals/ModalContainer";
import { PasswordInput } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  user: userSchemaType;
}

export default function PINCreation({ user }: Props) {
  const { mode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [pin, setPin] = useState("");

  async function createPIN() {
    console.log(" pin ", pin);
    if (pin?.length < 4) return toast.error("min 4digit pin required!");
    if (pin?.length > 20) return toast.error("pin is too longx!");

    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/pin/create", {
        pin,
        userId: user?._id,
      });
      if (data?.success) {
        setShow(false);
        toast.success(data?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!user || !user?._id) return;
    if (!user?.pin) setShow(true);
  }, [user]);

  return (
    <ModalContainer
      title={"Create Secret PIN"}
      opened={show}
      onClose={() => setShow(false)}
    >
      <div className="flex flex-col justify-center items-center gap-4 py-8">
        <p className="text-yellow-600 leading-5 tracking-wide">
          Hi <b>{user?.fullname || user?.username}, </b> You will need this PIN
          for withdrawals or transferring funds. We prioritize ensuring the
          security of your transactions
        </p>

        <div className="w-full">
          <PasswordInput
            onChange={(e) => setPin(e?.target.value)}
            placeholder="Your SECRET PIN (min 4 digit) "
          />
        </div>
        <Button loading={loading} onClick={createPIN} size="lg" color="green">
          Create PIN
        </Button>
      </div>
    </ModalContainer>
  );
}
