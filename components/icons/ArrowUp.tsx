import React from "react";

export default function ArrowUp({ stroke }: { stroke?: number }) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={stroke || 1.7}
      stroke="currentColor"
      className="w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
      />
    </svg>
  );
}
