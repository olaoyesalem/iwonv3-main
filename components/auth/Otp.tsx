"use client";
import React, { useEffect, useRef, useState } from "react";
import Container from "./Container";
import { useParams, useRouter } from "next/navigation";
import Button from "../Button";
import { FaArrowLeft } from "react-icons/fa";
import useTheme from "../hooks/useTheme";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Loader } from "@mantine/core";
import useCompany from "../hooks/useCompany";
import Input from "../common/Input";

const Otp = () => {
  const router = useRouter();
  const { mode } = useTheme();
  const params = useParams();
  const email = (params as { email: string }).email;
  const cleanEmail = email.replaceAll("%40", "@");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const [sec, setSec] = useState<number>(59);
  const [min, setMin] = useState<number>(1);
  const timerRef = useRef<number | null>(null);
  const [isTimer, setIsTimer] = useState(true);

  const { company } = useCompany();
  const primaryColor = company?.color.primary;
  const primaryLightColor = company?.color.primaryLight;

  const [backHover, setBackHover] = useState(false);
  const [resendHover, setResendHover] = useState(false);

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
        { email: cleanEmail, otp: otpCode }
      );
      if (data.error) throw new Error(data.error);

      router.push(`/forgot-password/new-password/${data.email}/${data.otp}`);
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const resendOtpHandler = async () => {
    try {
      if (isTimer)
        throw new Error(
          `Please wait for ${min}mins and ${sec}secs before resending`
        );

      setResendLoading(true);
      const { data } = await axios.post("/api/users/forgot-password", {
        email: cleanEmail,
      });
      if (data.error) throw new Error(data.error);
      toast.success(
        "We sent a new code to your email. check your Inbox or spam folder",
        { duration: 10000 }
      );
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setResendLoading(false);
      setIsTimer(true);
    }
  };

  return (
    <Container>
      <div className="flex flex-col items-center gap-3 w-full">
        <div
          className={`font-bold text-2xl md:text-3xl 
        ${mode === "light" ? "text-slate-700" : "text-white"}`}
        >
          Password reset
        </div>

        <div
          className={` text-lg text-center font-medium 
        ${mode === "light" ? "text-gray-500" : "text-gray-300"}`}
        >
          <span>We sent a code to </span>
          <span className="font-bold">{cleanEmail}</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 w-full">
        <Input
          placeholder="OTP"
          onChange={(e) => setOtpCode(e.target.value?.trim())}
        />

        <Button
          loading={loading}
          label="Continue"
          onClick={confirmInputHandler}
        />
      </div>

      <div
        className={`text-center text-sm font-medium 
        ${resendLoading && "flex items-center gap-2"} 
      ${mode === "light" ? "text-gray-500" : "text-gray-300"}`}
      >
        <span>Didn&apos;t receive the email? </span>
        {!resendLoading && (
          <span
            style={{
              color: resendHover
                ? primaryColor
                : mode === "light"
                  ? "#334155"
                  : "#e2e8f0",
            }}
            onMouseEnter={() => setResendHover(true)}
            onMouseLeave={() => setResendHover(false)}
            onClick={resendOtpHandler}
            className="underline font-semibold sm:cursor-pointer 
        select-none"
          >
            Click to resend{" "}
            {isTimer && (
              <span>
                after {min}min:{sec}sec
              </span>
            )}
          </span>
        )}

        {resendLoading && <Loader color="#fb7185" />}
      </div>

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

export default Otp;
