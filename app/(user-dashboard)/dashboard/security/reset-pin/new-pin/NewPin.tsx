"use client";
import React, { useState } from "react";

import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import axios from "axios";
import { toast } from "react-hot-toast";
import validator from "validator";
import useCompany from "@/components/hooks/useCompany";
import TextInput from "@/components/TextInput";
import Button from "@/components/common/Button";
import useTheme from "@/components/hooks/useTheme";
import useUser from "@/hooks/useUser";
import { vercel_url } from "@/config/admin";

const NewPin = () => {
  const { user } = useUser();
  const router = useRouter();
  const { mode } = useTheme();
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    newPin: "",
    isSecure: true,
  });

  const params = useSearchParams();

  const newPasswordHandler = async () => {
    try {
      if (inputs.newPin?.length < 4) {
        toast.error("PIN length minimum 4");
        return;
      }

      setLoading(true);
      const res = await axios.post(`/api/users/forgot-password/new-password`, {
        newPin: inputs.newPin.trim(),
        email: user?.email,
        otp: params.get("otp"),
      });

      if (res.data.error) throw new Error(res.data.error);

      router.push("/dashboard");
      toast.success("Your PIN successfully updated!");
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full items-center gap-3">
        <div className={`font-bold text-2xl md:text-3xl`}>Set new PIN</div>
      </div>

      <TextInput
        secureEntry={inputs.isSecure}
        placeholder="New PIN"
        value={inputs.newPin}
        icon={inputs.isSecure ? FaEye : FaEyeSlash}
        iconAction={() => setInputs({ ...inputs, isSecure: !inputs.isSecure })}
        onChange={(e) => setInputs({ ...inputs, newPin: e.target.value })}
      />

      <Button color="green" loading={loading} onClick={newPasswordHandler}>
        Update PIN
      </Button>
    </>
  );
};

export default NewPin;
