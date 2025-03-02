"use client";

import Button from "@/components/Button";
import ModalContainer from "@/components/modals/ModalContainer";
import getPercentage from "@/lib/getPercentageValue";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  company: CompanyProps;
}

const DistributeProfitsConfirmationModal = (props: ModalProps) => {
  const { data: session } = useSession();
  const adminId = (session?.user as { id: string })?.id;
  const { opened, onClose, company } = props;
  const [loading, setLoading] = useState(false);
  const [usersTotalDeposit, setUsersTotalDeposit] = useState(0);

  const Handler = async () => {
    setLoading(true);
    try {
      await axios.post("/api/cron/distribute-profit");
      toast.success("Successfully distributed!");
    } catch (error: any) {
      toast.error(error?.message || "Something was wrong!");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  useEffect(() => {
    if (!adminId) return;

    (async () => {
      setLoading(true);

      const { data: transactions } = await axios.get<TransactionType[]>(
        `/api/admin/transactions/${adminId}`
      );
      if (transactions) {
        const deposits = transactions.filter(
          (item) => item.category === "deposit" && item.status === "successful"
        );

        const totalDeposit = deposits.reduce((acc, cur) => acc + cur.amount, 0);

        setUsersTotalDeposit(totalDeposit);
      }

      setLoading(false);
    })();
  }, [adminId]);

  return (
    <ModalContainer
      title="Distribute Profit Confirmation!"
      opened={opened}
      onClose={onClose}
    >
      <div className="flex flex-col gap-3 p-3">
        <p>
          All Deposit Transactions Balance: ${usersTotalDeposit?.toFixed(2)},
        </p>

        <p>Will Distribute Now: {company?.profitPercentage}%</p>

        <br />

        <Button loading={loading} label={`Confirm`} onClick={Handler} />
      </div>
    </ModalContainer>
  );
};

export default DistributeProfitsConfirmationModal;
