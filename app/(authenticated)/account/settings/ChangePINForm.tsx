"use client";

import Button from "@/components/common/Button";
import InputPassword from "@/components/common/InputPassword";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaLock } from "react-icons/fa";

export default function ChangePINForm() {
  const { userId } = useUser();
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

  return (
    <div className="p-2 flex flex-col gap-3">
      <div className="w-full flex flex-col md:flex-row gap-3 justify-between">
        <div className="w-full">
          <InputPassword
            onChange={(e) => setOldPin(e.target.value)}
            placeholder="OLD PIN"
          />
        </div>
        <div className="w-full">
          <InputPassword
            onChange={(e) => setNewPin(e.target.value)}
            placeholder="NEW PIN"
          />
        </div>
      </div>

      <div className="w-fit md:w-full">
        <Button color="blue" onClick={changePin} loading={loading}>
          Update <FaLock className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
