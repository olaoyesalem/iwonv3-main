"use client";
import CopyIconButton from "@/components/common/CopyIconButton";
import useTheme from "@/components/hooks/useTheme";
import ModalContainer from "@/components/modals/ModalContainer";
import React from "react";
import QRCode from "react-qr-code";

interface Props {
  opened: boolean;
  onClose: () => void;
  user: userSchemaType;
}

const DepositTronModal = (props: Props) => {
  const { mode } = useTheme();
  const { opened, onClose, user } = props;

  return (
    <ModalContainer
      title="Receive (tron network)"
      opened={opened}
      onClose={onClose}
    >
      <div className="flex flex-col justify-center items-center gap-3 py-8">
        <div
          className={`${mode === "dark" ? "border-gray-700" : "border-gray-200"} border p-5 w-fit h-fit rounded-lg`}
        >
          <QRCode
            // size={256}
            className="w-44 h-44 rounded"
            value={user?.wallet?.tron?.address}
            viewBox={`0 0 256 256`}
          />
        </div>

        <p>
          user: <b>@{user?.username}</b>
        </p>

        <p className="text-gray-500">{user?.wallet?.tron?.address}</p>
        <div>
          <CopyIconButton value={user?.wallet?.tron?.address}>
            <span className="text-blue-500"> Copy Address </span>
          </CopyIconButton>
        </div>
      </div>
    </ModalContainer>
  );
};

export default DepositTronModal;
