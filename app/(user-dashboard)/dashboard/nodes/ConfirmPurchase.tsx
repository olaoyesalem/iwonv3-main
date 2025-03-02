import QrCode from "@/components/icons/QrCode";
import { FaCartPlus } from "react-icons/fa";

import React, { useState } from "react";
import Button from "@/components/common/Button";
import toast from "react-hot-toast";
import axios from "axios";
import calculateNodePurchaseAmount from "@/app/api/v2/node/purchase/calculateNodePurchaseAmount";

interface Props {
  node?: nodeTypes;
  purchase_seats: number;
  available_funds: number;
  total_cost: number;
  setShowDeposit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConfirmPurchase({
  purchase_seats,
  node,
  setShowDeposit,
  total_cost,
  available_funds,
}: Props) {
  const [loading, setLoading] = useState(false);
  async function purchaseHandler() {
    if (!node?._id || !purchase_seats) {
      toast.error("seats is required!");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(`/api/v2/node/purchase`, {
        nodeId: node?._id,
        seats: purchase_seats,
      });
      if (data?.error) {
        toast.error(data.error);
        return;
      }

      toast.success(`You've Successfully purchased ${purchase_seats}-seats!`);
      setTimeout(() => {
        location && location.reload();
      }, 500);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-5 bg-green-100 space-y-3">
      {available_funds > total_cost ? (
        <>
          <p className="text-xl">Your Seats: {purchase_seats}</p>
          <p className="text-xl">
            Total Payable Amount: $
            {calculateNodePurchaseAmount(
              node,
              purchase_seats
            ).totalAmount?.toFixed(4)}
          </p>{" "}
          <div className="w-fit">
            <Button
              size="responsive"
              color="green"
              loading={loading}
              onClick={purchaseHandler}
            >
              <FaCartPlus />
              <span> Confirm Purchase </span>
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="text-xl text-green-500">
            Wallet Balance: ${available_funds?.toFixed(2)}
          </p>
          <p className="text-xl text-red-500">
            Required Balance: ${total_cost?.toFixed(2)}
          </p>
          <div className="w-fit">
            <Button
              size="responsive"
              onClick={() => setShowDeposit(true)}
              color="custom"
              className="bg-tron text-white"
            >
              <span>Deposit</span>
              <QrCode />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
