"use client";
import calculateNodePurchaseAmount from "@/app/api/v2/node/purchase/calculateNodePurchaseAmount";
import DepositPolygonModal from "@/components/authenticated/home/account/DepositPolygonModal";
import Button from "@/components/common/Button";
import NumberInput from "@/components/common/NumberInput";
import useRefreshPolygonBalance from "@/hooks/useRefreshPolygonBalance";
import React, { useEffect, useState } from "react";
import ConfirmPurchase from "./ConfirmPurchase";

export default function PurchaseNodeArea({
  node,
  user,
}: {
  node?: nodeTypes;
  user: userSchemaType;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [purchase_seats, set_purchased_seats] = useState(1);
  const available_seats = (node?.total_seats || 0) - (node?.sold_seats || 0);
  const [total_cost, set_total_cost] = useState(0);
  const { usdt } = useRefreshPolygonBalance(user.wallet?.evm?.address);

  useEffect(() => {
    if (!purchase_seats) {
      setShowConfirm(false);
      return;
    }
    const total = calculateNodePurchaseAmount(node, purchase_seats).totalAmount;
    set_total_cost(total);
  }, [purchase_seats]);

  return (
    <div>
      <div
        className="w-full p-5 md:p-10 rounded shadow"
        style={{
          background: `linear-gradient(to right, #00000099, #00000095), url(/nodes.jpg)`,
          backgroundPosition: "center center",
          backgroundSize: "contain",
        }}
      >
        <h2 className="text-2xl font-semibold text-green-200 text-center mb-6">
          Pre-Sale Nodes
        </h2>

        <div className="p-5 space-y-5">
          <div>
            <h2 className="!text-white text-xl font-semibold underline">
              {" "}
              {node?.name}{" "}
            </h2>
            <p className="!text-gray-200"> {node?.description} </p>
          </div>

          <p className="text-white text-xl">
            Total Seats:
            <span className="text-green-200 font-bold ml-1">
              {node?.total_seats}
            </span>
          </p>
          <p className="text-white text-xl">
            Sold:
            <span className="text-green-200 font-bold ml-1">
              {node?.sold_seats}
            </span>
          </p>
          <p className="text-white text-xl">
            Available Seats:
            <span className="text-green-200 font-bold ml-1">
              {available_seats}
            </span>
          </p>
          <p className="text-white text-xl">
            Price Per Seat:
            <span className="text-green-200 font-bold ml-1">
              {(total_cost / (purchase_seats || 1))?.toFixed(4)}
            </span>
          </p>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full flex items-center gap-x-0.5">
              <div className="w-fit">
                <Button
                  onClick={() =>
                    purchase_seats > 1 && set_purchased_seats((p) => p - 1)
                  }
                  size="xl"
                  color="red"
                >
                  -
                </Button>
              </div>

              <NumberInput
                getValue={set_purchased_seats}
                setValue={purchase_seats}
                maxNumber={available_seats}
                placeholder="Purchase Seats Amount"
              />
              <div className="w-fit">
                <Button
                  onClick={() =>
                    purchase_seats < available_seats &&
                    set_purchased_seats((p) => p + 1)
                  }
                  size="xl"
                  color="green"
                >
                  +
                </Button>
              </div>
            </div>
            <div className="md:w-fit">
              <Button
                onClick={() => purchase_seats && setShowConfirm(true)}
                disabled={purchase_seats < 1}
                size="xl"
                color="blue"
              >
                Book My {purchase_seats > 1 ? "Seats" : "Seat"}{" "}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <br />

      {showConfirm ? (
        <ConfirmPurchase
          purchase_seats={purchase_seats}
          node={node}
          setShowDeposit={setShowDeposit}
          total_cost={total_cost}
          available_funds={usdt}
        />
      ) : null}

      {/* Modals */}
      <DepositPolygonModal
        opened={showDeposit}
        onClose={() => setShowDeposit(false)}
        user={user}
      />
    </div>
  );
}
