"use client";
import React, { useEffect } from "react";
import Button from "./Button";
import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";

const Logout = () => {
  useEffect(() => {
    (async () => {
      await signOut().then(() => (window.location.href = "https://iwon.vc"));
    })();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[400px]">
        <Button
          icon={FaSignOutAlt}
          onClick={() => signOut()}
          label={"Logout"}
        />
      </div>
    </div>
  );
};

export default Logout;
