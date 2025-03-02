import React from "react";

export default function MistakeMessage() {
  return (
    <div className="mb-2 text-base text-yellow-800 bg-yellow-50 p-3 rounded max-w-3xl">
      <p>
        We have deducted $556 from your balance because you accidentally
        received 139.65 USDT five times instead of just once. We are really
        sorry for this mistake.
      </p>
      <br />
      <div className="flex flex-wrap gap-2">
        <span>For verification: </span>
        <a
          className="underline text-blue-500 cursor-pointer"
          href="https://tronscan.io/#/transaction/45bbc1e19ecbd48b4c55e92dbed3051211bd14be6ec6819895a52b0e83e1e59b"
          target="_blank"
        >
          hash-1
        </a>
        <a
          className="underline text-blue-500 cursor-pointer"
          href="https://tronscan.io/#/transaction/18f2f1c02bc83ac24bc391957ac7b6ced0146162f9e762913e573f7323a014da"
          target="_blank"
        >
          hash-2
        </a>
        <a
          className="underline text-blue-500 cursor-pointer"
          href="https://tronscan.io/#/transaction/ad4acdd67d89c382c2e71531a09db83076288921ce147ce73325a44846ce4906"
          target="_blank"
        >
          hash-3
        </a>
        <a
          className="underline text-blue-500 cursor-pointer"
          href="https://tronscan.io/#/transaction/f9870ca9b1dccf0bd70b21e4998c826b29ed125053d0d576a085fd18c47138dc"
          target="_blank"
        >
          hash-4
        </a>
        <a
          className="underline text-blue-500 cursor-pointer"
          href="https://tronscan.io/#/transaction/736e375d5b020129e6a53b7b26c7fd0fd0f46615a691fe0858e88b4ff593c075"
          target="_blank"
        >
          hash-5
        </a>
      </div>
    </div>
  );
}
