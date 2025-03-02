import Button from "@/components/Button";
import ModalContainer from "@/components/modals/ModalContainer";
import React from "react";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  company: CompanyProps;
  showConfirmation: () => void;
}

const DistributeProfitsModal = (props: ModalProps) => {
  const { opened, onClose, company, showConfirmation } = props;

  return (
    <ModalContainer
      title="Distribute Users Weekly Profit!"
      opened={opened}
      onClose={onClose}
    >
      <div className="flex flex-col gap-3">
        <p>
          Distribute {company?.profitPercentage}% of the profit to all users
          based on their deposit balances!
        </p>
        <Button
          label={`Continue`}
          onClick={() => {
            onClose();
            showConfirmation();
          }}
        />
      </div>
    </ModalContainer>
  );
};

export default DistributeProfitsModal;
