"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import useTheme from "@/components/hooks/useTheme";
import useCompany from "@/components/hooks/useCompany";
import Button from "@/components/common/Button";
import useUser from "@/hooks/useUser";
import Input from "@/components/common/Input";

const PinOtp = () => {
  const { user } = useUser();
  const router = useRouter();
  const { mode } = useTheme();
  const [loading, setLoading] = useState(false);

  const [sec, setSec] = useState<number>(59);
  const [min, setMin] = useState<number>(1);
  const timerRef = useRef<number | null>(null);
  const [isTimer, setIsTimer] = useState(true);

  const { company } = useCompany();
  const primaryLightColor = company?.color.primaryLight;

  useEffect(() => {
    if (isTimer) {
      timerRef.current = window.setInterval(() => {
        if (sec === 0 && min === 0) {
          // Timer has reached 0:00
          clearInterval(timerRef.current as number);
          setIsTimer(false);
          setMin(5);
          setSec(59);
          // Handle any actions you want to perform when the timer is done
        } else if (sec === 0) {
          setSec(59);
          setMin((prevMin) => prevMin - 1);
        } else {
          setSec((prevSec) => prevSec - 1);
        }
      }, 1000);
    }

    // Clear the interval when the component unmounts
    return () => clearInterval(timerRef.current as number);
  }, [sec, min, isTimer]);

  const [otpCode, setOtpCode] = useState("");

  const confirmInputHandler = async () => {
    try {
      setLoading(true);
      if (otpCode.length < 6) throw new Error("OTP code must be 6");
      const { data } = await axios.post(
        "/api/users/forgot-password/confirm-otp",
        { email: user?.email, otp: otpCode }
      );
      if (data.error) throw new Error(data.error);

      router.push(`/dashboard/security/reset-pin/new-pin?otp=${otpCode}`);
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-3 w-full">
        <div
          className={`font-bold text-2xl md:text-3xl 
        ${mode === "light" ? "text-slate-700" : "text-white"}`}
        >
          PIN reset
        </div>

        <div
          className={` text-lg text-center font-medium 
        ${mode === "light" ? "text-gray-500" : "text-gray-300"}`}
        >
          <span>We sent a code to </span>
          <span className="font-bold">{user?.email}</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 w-full">
        <Input
          placeholder="OTP"
          onChange={(e) => setOtpCode(e.target.value?.trim())}
        />

        <Button color="green" loading={loading} onClick={confirmInputHandler}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PinOtp;
