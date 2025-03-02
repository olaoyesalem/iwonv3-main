import Button from "@/components/Button";
import useCompany from "@/components/hooks/useCompany";
import ModalContainer from "@/components/modals/ModalContainer";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface DepositTypeModalProps {
  opened: boolean;
  onClose: () => void;
  setSelectedDepositType: (
    depositType:
      | "automatic-coin-payment"
      | "manual-coin-payment"
      | "bank-transfer"
      | ""
  ) => void;
}

// React.Dispatch<React.SetStateAction<string>>

const DepositTypeModal = (props: DepositTypeModalProps) => {
  const { opened, onClose, setSelectedDepositType } = props;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { company } = useCompany();
  const isAutoCoinDepositDisabled =
    company?.payment.automaticCoinPayment === "off";
  const isManualCoinDepositDisabled =
    company?.payment.manualCoinPayment === "off";
  const isBankTransferDisabled = company?.payment.bankTransfer === "off";

  return (
    <ModalContainer title="Deposit" opened={opened} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <Button
          outline
          disabled={isAutoCoinDepositDisabled}
          loading={loading}
          label={`Automatic Coin Payment ${
            isAutoCoinDepositDisabled ? "(not available)" : ""
          } `}
          onClick={() => {
            onClose();
            setSelectedDepositType("automatic-coin-payment");
          }}
        />
      </div>
    </ModalContainer>
  );
};

export default DepositTypeModal;
