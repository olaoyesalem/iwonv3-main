import React from "react";
import TailwindSkeleton from "./TailwindSkeleton";

export default function TailwindSkeletonMultiple({
  total,
  className,
}: {
  total: number;
  className: string;
}) {
  return (
    <>
      {new Array(total).fill("").map((_, i) => (
        <div key={i} className={className}>
          <TailwindSkeleton />
        </div>
      ))}
    </>
  );
}
