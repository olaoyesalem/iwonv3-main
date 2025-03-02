import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import ModalContainer from "@/components/modals/ModalContainer";
import { isNumber } from "@/constants/isNumber";
import axios from "axios";
import { Checkbox } from "flowbite-react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  opened: boolean;
  onClose: () => void;
  user: userSchemaType;
}

const AddUserProfitBalanceModalByAdmin = (props: Props) => {
  const { opened, onClose, user } = props;
  const [loading, setLoading] = useState(false);

  const [amount, setAmount] = useState(0);
  const [onlyForTransaction, setOnlyForTransaction] = useState(false);

  const handler = async () => {
    try {
      if (amount < 1) return;

      setLoading(true);

      const { data } = await axios.post("/api/admin/users/add-profit", {
        amount,
        userId: user._id,
        onlyForTransaction,
      });

      if (data.error) throw new Error(data.error);

      toast.success("Profit Added!");

      location.reload();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalContainer
      title="Create Profit For User"
      opened={opened}
      onClose={onClose}
    >
      <div className="flex flex-col gap-6">
        <div>
          <label htmlFor="amount">Profit Amount</label>
          <TextInput
            id="amount"
            onChange={(e) => {
              if (!isNumber(+e.target.value)) return;
              setAmount(Number(e.target?.value) || 0);
            }}
            placeholder="Amount"
          />

          <br />

          <label htmlFor="onlyForTransaction">
            <Checkbox
              id="onlyForTransaction"
              checked={onlyForTransaction}
              onChange={(e) => setOnlyForTransaction(e.target.checked)}
            />
            <span className="ml-2">Create Transaction Only?</span>
          </label>
        </div>

        <Button loading={loading} label="Top Up" onClick={handler} />
      </div>
    </ModalContainer>
  );
};

export default AddUserProfitBalanceModalByAdmin;
