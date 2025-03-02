import CopyIconButton from "@/components/common/CopyIconButton";
import ConfirmPIN from "@/components/ConfirmPIN";
import descrypt from "@/lib/decrypt";
import React, { useState } from "react";
import { FaKey, FaLock } from "react-icons/fa";

export default function ShowPrivateKey({ user }: { user: userSchemaType }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showKey, setShowKey] = useState(false);

  return (
    <div>
      {showKey ? (
        <div className="flex items-center gap-x-2">
          <CopyIconButton value={descrypt(user?.wallet?.evm?.key)}>
            <button
              onClick={() => setShowKey(false)}
              className="flex items-center gap-x-1"
            >
              <FaKey /> hide
            </button>
            <p
              title={descrypt(user?.wallet?.evm?.key)}
              className="text-sm sm:text-base text-gray-500"
            >
              {descrypt(user?.wallet?.evm?.key)?.slice(0, 7)}...
              {descrypt(user?.wallet?.evm?.key)?.slice(
                descrypt(user?.wallet?.evm?.key)?.length - 5,
                descrypt(user?.wallet?.evm?.key)?.length
              )}
            </p>
          </CopyIconButton>
        </div>
      ) : (
        <button
          onClick={() => setShowConfirm(true)}
          className="flex items-center gap-x-1"
        >
          <FaLock /> Show Private Key
        </button>
      )}

      <ConfirmPIN
        confirmHandler={() => setShowKey(true)}
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        userId={user?._id}
      />
    </div>
  );
}
