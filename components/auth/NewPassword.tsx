"use client";
import React, { useState } from "react";
import Container from "./Container";
import TextInput from "../TextInput";
import Button from "../Button";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";

import { useParams, useRouter } from "next/navigation";
import useTheme from "../hooks/useTheme";

import axios from "axios";
import { toast } from "react-hot-toast";
import validator from "validator";
import useCompany from "../hooks/useCompany";
import { vercel_url } from "@/config/admin";

const NewPassword = () => {
  const router = useRouter();
  const { mode } = useTheme();
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    newPassword: "",
    confirmNewPassword: "",
    isSecure: true,
  });

  const params = useParams();
  const rawData = (params as { data: string[] }).data;
  const data = rawData.map((item) => item.replaceAll("%40", "@")); //firstValue:email; secondValue:otp

  const { company } = useCompany();
  const primaryColor = company?.color.primary;

  const [backHover, setBackHover] = useState(false);

  const newPasswordHandler = async () => {
    try {
      if (inputs.newPassword.trim() !== inputs.confirmNewPassword.trim())
        throw new Error("Password do not match");

      if (inputs.newPassword?.length < 6)
        throw new Error("password must be min 6 characters!");

      setLoading(true);
      const res = await axios.post(`/api/users/forgot-password/new-password`, {
        newPassword: inputs.newPassword.trim(),
        email: data[0],
        otp: data[1],
      });

      if (res.data.error) throw new Error(res.data.error);
      router.push("/forgot-password/all-done");
      toast.success("Password Changed you can now proceed to login");
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="flex flex-col w-full items-center gap-3">
        <div
          className={`font-bold text-2xl md:text-3xl 
        ${mode === "light" ? "text-slate-700" : "text-white"}`}
        >
          Set new password
        </div>

        <div
          className={`font-medium text-lg text-center 
        ${mode === "light" ? "text-gray-500" : "text-gray-300"}`}
        >
          Must be at least 6 characters
        </div>
      </div>

      <div className="flex flex-col w-full items-center gap-3">
        <TextInput
          secureEntry={inputs.isSecure}
          placeholder="Password"
          value={inputs.newPassword}
          icon={inputs.isSecure ? FaEye : FaEyeSlash}
          iconAction={() =>
            setInputs({ ...inputs, isSecure: !inputs.isSecure })
          }
          onChange={(e) =>
            setInputs({ ...inputs, newPassword: e.target.value })
          }
        />
        <TextInput
          secureEntry={inputs.isSecure}
          placeholder="Confirm password"
          value={inputs.confirmNewPassword}
          icon={inputs.isSecure ? FaEye : FaEyeSlash}
          iconAction={() =>
            setInputs({ ...inputs, isSecure: !inputs.isSecure })
          }
          onChange={(e) =>
            setInputs({ ...inputs, confirmNewPassword: e.target.value })
          }
        />
      </div>

      <Button
        loading={loading}
        label="Reset password"
        onClick={newPasswordHandler}
      />

      <div
        style={{
          color: backHover
            ? primaryColor
            : mode === "light"
              ? "#334155"
              : "#e2e8f0",
        }}
        onMouseEnter={() => setBackHover(true)}
        onMouseLeave={() => setBackHover(false)}
        onClick={() => router.push("/login")}
        className={`sm:cursor-pointer active:scale-[.95] 
        duration-200 select-none text-center 
        flex items-center gap-2 
        text-sm font-semibold`}
      >
        <FaArrowLeft /> Back to log in
      </div>
    </Container>
  );
};

export default NewPassword;
