import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

export default function ButtonSecond({ loading, children, ...props }: Props) {
  return (
    <button
      {...props}
      disabled={loading}
      className={`px-6 py-3 rounded bg-orange-500 hover:bg-orange-600 transition-all text-white font-medium relative focus:ring disabled:opacity-70 disabled:cursor-not-allowed ${props.className}`}
    >
      <div>{children}</div>
      {loading ? (
        <div className="w-3 h-3 rounded-full animate-spin transition-all border-2 border-t-transparent absolute inset-y-0 right-1.5 my-auto" />
      ) : null}
    </button>
  );
}
