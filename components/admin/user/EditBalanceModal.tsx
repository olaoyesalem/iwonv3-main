import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import ModalContainer from "@/components/modals/ModalContainer";
import { isNumber } from "@/constants/isNumber";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface EditBalanceModalProps {
  opened: boolean;
  onClose: () => void;
  user: userSchemaType;
}

const EditBalanceModal = (props: EditBalanceModalProps) => {
  const { opened, onClose, user } = props;
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    investBalance: "",
    profitBalance: "",
  });

  useEffect(() => {
    setInput({
      investBalance: user.investBalance.toString() || "",
      profitBalance: user.profitBalance.toString() || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handler = async () => {
    try {
      if (
        input?.investBalance?.trim() === "" ||
        input?.profitBalance?.trim() === ""
      )
        throw new Error("Field cannot be empty");

      setLoading(true);

      const { data } = await axios.post("/api/admin/users/edit-balance", {
        investBalance: Number(input.investBalance),
        profitBalance: Number(input.profitBalance),
        userId: user._id,
      });
      if (data.error) throw new Error(data.error);

      toast.success("Balance Updated");
      location.reload();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalContainer title="Edit User Balance" opened={opened} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <div>
          <label htmlFor="invest-balance">Deposit Balance</label>
          <TextInput
            id="invest-balance"
            value={input.investBalance}
            onChange={(e) => {
              if (!isNumber(+e.target.value)) return;
              setInput({ ...input, investBalance: e.target.value });
            }}
            placeholder="Deposit Balance"
          />
        </div>

        <div>
          <label htmlFor="profit-balance">Profit Balance</label>
          <TextInput
            id="profit-balance"
            value={input.profitBalance}
            onChange={(e) => {
              if (!isNumber(+e.target.value)) return;
              setInput({ ...input, profitBalance: e.target.value });
            }}
            placeholder="Profit Balance"
          />
        </div>
        <Button loading={loading} label="Top Up" onClick={handler} />
      </div>
    </ModalContainer>
  );
};

export default EditBalanceModal;
