"use client";

import Button from "@/components/common/Button";
import useUser from "@/hooks/useUser";
import { Select } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AutoInvestForm() {
  const [loading, setLoading] = useState(false);
  const [autoReInvest, setAutoReInvest] = useState("");
  const [autoReInvestDate, setAutoReInvestDate] = useState("");
  const { user, userId } = useUser();

  async function updateUser() {
    setLoading(true);
    try {
      axios.patch(`/api/users/${userId}`, { autoReInvestDate, autoReInvest });
      toast.success("Succesfully updated!");
    } catch (error) {
      console.log("ERROR:: ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user?.autoReInvest) {
      setAutoReInvest(user?.autoReInvest);
    }
    if (user?.autoReInvestDate) {
      setAutoReInvestDate(user?.autoReInvestDate);
    }
  }, [user]);

  return (
    <form className="xl:max-w-[500px] mx-auto space-y-4 p-4 bg-gray-50 shadow">
      <h2 className="text-2xl font-semibold !text-gray-500">
        Auto Re-Invest Setting
      </h2>
      <Select
        label="Auto Invest"
        value={autoReInvest}
        onChange={(v) => setAutoReInvest(v || "")}
        placeholder="Pick value"
        data={["off", "always", "date"]}
      />

      {autoReInvest?.trim() === "date" ? (
        <div>
          <label htmlFor="end-date" className="text-sm font-semibold">
            End Date
          </label>
          <input
            id="end-date"
            className="w-full h-10 rounded focus:ring-1 border-gray-300"
            type="date"
            title="choose date"
            value={autoReInvestDate}
            onChange={(e) => setAutoReInvestDate(e.target.value)}
          />
        </div>
      ) : null}

      <Button onClick={updateUser} color="blue" loading={loading}>
        Submit
      </Button>
    </form>
  );
}
