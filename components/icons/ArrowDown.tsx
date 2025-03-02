import React from "react";

export default function ArrowDown({ stroke }: { stroke?: number }) {
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
        d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25"
      />
    </svg>
  );
}
