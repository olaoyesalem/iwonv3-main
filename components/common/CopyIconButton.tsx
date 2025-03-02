"use client";

import React, { useState } from "react";
import { BiCopy, BiCheckDouble } from "react-icons/bi";

export default function CopyIconButton({
  value,
  children,
}: {
  value?: string;
  children?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  function copyToClipboard(): void {
    navigator.clipboard.writeText(value || "").then(() => {
      console.log("Text copied to clipboard:", value);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    });
  }

  return (
    <button
      onClick={copyToClipboard}
      title="copy address"
      className="relative flex items-center gap-x-2"
    >
      {children}
      {copied ? <BiCheckDouble /> : <BiCopy />}
    </button>
  );
}
