"use client";

import React, { useState } from "react";

export default function WarningPopup() {
  const [show, setShow] = useState(false);

  if (!show) return <></>;

  return (
    <div
      style={{
        position: "fixed",
        top: "100px",
        right: "0px",
        left: "0px",
        margin: "auto",
        background: "rgb(147 165 74)",
        width: "fit-content",
        maxWidth: "96%",
        padding: "6px 10px",
        borderRadius: "4px",
        zIndex: "9999999999",
        display: "flex",
        alignItems: "center",
      }}
      className="shadow-lg"
    >
      <p style={{ color: "#ffffff" }}>
        <b> iWon </b>
        is currently in the pre launch phase. <br /> Full launch will be
        in Q1 of 2025
      </p>
      <button
        title="remove it"
        onClick={() => setShow(false)}
        style={{
          background: "#943",
          color: "#ffffff",
          marginLeft: "6px",
          padding: "3px",
          display: "block",
          borderRadius: "10px",
          cursor: "pointer",
        }}
        className="focus:ring"
      >
        <svg
          style={{
            fill: "#ffffff",
            color: "#ffffff",
            width: "20px",
            height: "20pxx",
          }}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
