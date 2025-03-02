import Image from "next/image";
import React from "react";

const loading = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-900">
      <Image width={50} height={50} src="/loading.gif" alt="" />
    </div>
  );
};

export default loading;
