"use client";

import { Label, TextInput } from "flowbite-react";

import Button from "@/components/common/Button";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { vercel_url } from "@/config/admin";

export default function ChangePINForm() {
  const router = useRouter();
  const { userId, user } = useUser();
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [loading, setLoading] = useState(false);

  async function changePin() {
    try {
      setLoading(true);
      const { data } = await axios.put("/api/auth/pin/update", {
        oldPin,
        newPin,
        userId,
      });
      if (data?.success) {
        toast.success(data?.message || "PIN successfully updated!");
      } else {
        toast.error(data?.message || data?.error || "OLD Pin was wrong!");
      }
    } catch (error: any) {
      toast.error(error?.message || "something was wrong!");
    } finally {
      setLoading(false);
    }
  }

  const forgotPasswordHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${vercel_url}/api/users/forgot-password`,
        {
          email: user?.email,
          isPin: true,
        },

        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (data?.error) throw new Error(data.error);

      router.push(`/dashboard/security/reset-pin/otp`);
    } catch (error: any) {
      console.log("ERROR:: ", error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-2 flex flex-col gap-3">
      <h3 className="text-xl font-bold">Change Your PIN</h3>
      <div className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="old-pin" value="Your Old PIN" />
          </div>
          <TextInput
            id="old-password"
            type="password"
            onChange={(e) => setOldPin(e.target.value)}
            placeholder="Your Secret PIN"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="new-pin" value="Your New PIN" />
          </div>
          <TextInput
            id="new-pin"
            type="password"
            onChange={(e) => setNewPin(e.target.value)}
            placeholder="Your New Secret PIN"
            required
          />
        </div>

        <button
          onClick={forgotPasswordHandler}
          className={`text-sm text-blue-400 hover:underline text-center 
          font-semibold sm:cursor-pointer 
          active:scale-[.95] transition-all select-none w-fit`}
        >
          Reset PIN!
        </button>

        <Button color="blue" onClick={changePin} loading={loading}>
          Update <FaLock className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
