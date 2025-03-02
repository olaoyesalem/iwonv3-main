"use client";
import React, { useState } from "react";
import useTheme from "@/components/hooks/useTheme";
import Button from "@/components/common/Button";
import QrCode from "@/components/icons/QrCode";
import ArrowUp from "@/components/icons/ArrowUp";
import ArrowTradingUp from "@/components/icons/ArrowTradingUp";
import CopyIconButton from "@/components/common/CopyIconButton";
import InvestModal from "@/app/(authenticated)/account/invest-and-earn/InvestModal";
import UserPolygonBalance from "./UserPolygonBalance";
import useRefreshPolygonBalance from "@/hooks/useRefreshPolygonBalance";
import DepositPolygonModal from "./DepositPolygonModal";
import WithdrawPolygonModal from "./WithdrawPolygonModal";
import usePolygonTransactions from "@/hooks/usePolygonTransactions";
import PolygonActivities from "./PolygonActivities";
import ShowPrivateKey from "./ShowPrivateKey";

interface Props {
  user: userSchemaType;
}

const Account = (props: Props) => {
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdrawTRON, setShowWithdrawTRON] = useState(false);
  const [showInvestModal, setShowInvestModal] = useState(false);

  const { user } = props;
  const evm_address = user?.wallet?.evm.address;
  const { mode } = useTheme();

  const polygon_balance_info = useRefreshPolygonBalance(
    user?.wallet?.evm?.address
  );

  const polygon_transactions_info = usePolygonTransactions(
    user?.wallet?.evm?.address
  );

  return (
    <div className="sm:pb-12">
      <div
        className={`${mode === "dark" ? "sm:bg-gray-900 font-semibold" : "sm:bg-gray-100 font-semibold"} sm:shadow rounded-sm p-3 sm:p-6 h-fit flex flex-col w-full gap-y-6 relative`}
      >
        <div className="space-y-3">
          <UserPolygonBalance {...polygon_balance_info} />

          <div className="flex items-center gap-x-1">
            <CopyIconButton value={evm_address}>
              <p
                title={evm_address}
                className="text-sm sm:text-base text-gray-500"
              >
                {evm_address?.slice(0, 7)}...
                {evm_address?.slice(
                  evm_address?.length - 5,
                  evm_address?.length
                )}
              </p>
            </CopyIconButton>
          </div>

          <ShowPrivateKey user={user} />
        </div>

        <div className="flex gap-1 md:gap-3 items-center flex-wrap">
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
          <div className="w-fit">
            <Button
              size="responsive"
              onClick={() => setShowWithdrawTRON(true)}
              color="orange"
            >
              <span>Withdraw</span>
              <ArrowUp />
            </Button>
          </div>
          <div className="w-fit">
            <Button
              onClick={() => setShowInvestModal(true)}
              size="responsive"
              color="orange"
            >
              <span> Earn </span>
              <ArrowTradingUp />
            </Button>
          </div>
        </div>

        <PolygonActivities user={user} {...polygon_transactions_info} />
      </div>

      {/* Modals */}
      <DepositPolygonModal
        opened={showDeposit}
        onClose={() => setShowDeposit(false)}
        user={user}
      />

      <WithdrawPolygonModal
        opened={showWithdrawTRON}
        onClose={() => setShowWithdrawTRON(false)}
        user={user}
        matic={polygon_balance_info?.matic}
        usdt={polygon_balance_info?.usdt}
        refresh={() => {
          polygon_balance_info.refreshBalance();
          polygon_balance_info.set_refreshing(true);
          polygon_transactions_info.getTransactions();
        }}
      />

      <InvestModal
        user={user}
        opened={showInvestModal}
        onClose={() => setShowInvestModal(false)}
        onShowDepositCrypto={() => setShowDeposit(true)}
      />
    </div>
  );
};

export default Account;
