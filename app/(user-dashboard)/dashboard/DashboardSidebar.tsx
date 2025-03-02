"use client";

import { Sidebar } from "flowbite-react";
import { HiChartPie } from "react-icons/hi";
import {
  FaMoneyCheck,
  FaSignOutAlt,
  FaFile,
  FaWallet,
  FaLock,
  FaCogs,
  FaLinode,
} from "react-icons/fa";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function DashboardSidebar() {
  const path = usePathname();

  const signoutHandler = async () => {
    await signOut().then(() => (window.location.href = "https://iwon.vc"));
    toast.success("Logged Out");
  };

  return (
    <div className="lg:sticky left-0 top-[88px]">
      <div className="flex lg:hidden items-center gap-x-2 overflow-auto p-2 md:p-6 mb-2 border-b4">
        <Link
          className={`flex items-center gap-x-1 p-2 rounded ${path === "/dashboard" ? "bg-blue-600 text-white" : "bg-blue-100"}`}
          href="/dashboard"
        >
          <HiChartPie />
          <span>Dashboard</span>
        </Link>

        <Link
          className={`flex items-center gap-x-1 p-2 rounded ${path === "/dashboard/wallet" ? "bg-blue-600 text-white" : "bg-blue-100"}`}
          href="/dashboard/wallet"
        >
          <FaWallet />
          <span>Wallet</span>
        </Link>

        <Link
          className={`flex items-center gap-x-1 p-2 rounded ${path === "/dashboard/nodes" ? "bg-blue-600 text-white" : "bg-blue-100"}`}
          href="/dashboard/nodes"
        >
          <FaLinode />
          <span>Nodes</span>
        </Link>

        <Link
          className={`flex items-center gap-x-1 p-2 rounded ${path === "/dashboard/deposits" ? "bg-blue-600 text-white" : "bg-blue-100"}`}
          href="/dashboard/deposits"
        >
          <FaMoneyCheck />
          <span>Deposits</span>
        </Link>

        <Link
          className={`flex items-center gap-x-1 p-2 rounded ${path === "/dashboard/transactions" ? "bg-blue-600 text-white" : "bg-blue-100"}`}
          href="/dashboard/transactions"
        >
          <FaFile />
          <span>Transactions</span>
        </Link>

        <Link
          className={`flex items-center gap-x-1 p-2 rounded ${path === "/dashboard/security" ? "bg-blue-600 text-white" : "bg-blue-100"}`}
          href="/dashboard/security"
        >
          <FaLock />
          <span>Security</span>
        </Link>

        <Link
          className={`flex items-center gap-x-1 p-2 rounded ${path === "/dashboard/security" ? "bg-blue-600 text-white" : "bg-blue-100"}`}
          href="/dashboard/settings"
        >
          <FaLock />
          <span> Settings </span>
        </Link>

        <div
          className={`flex items-center gap-x-1 p-2 rounded bg-gray-100`}
          onClick={signoutHandler}
        >
          <span>Logout</span>
        </div>
      </div>

      <Sidebar
        className="bg-gray-50 items-center hidden lg:flex"
        aria-label="Default sidebar example"
      >
        <Sidebar.Items className="!bg-white">
          <Sidebar.ItemGroup className="w-[280px] h-[calc(100vh-88px)] flex flex-col !bg-gray-50">
            <Link
              className={path === "/dashboard" ? "bg-gray-200" : ""}
              href="/dashboard"
            >
              <Sidebar.Item icon={HiChartPie}>Dashboard</Sidebar.Item>
            </Link>

            <Link
              className={path === "/dashboard/wallet" ? "bg-gray-200" : ""}
              href="/dashboard/wallet"
            >
              <Sidebar.Item icon={FaWallet}>Wallet</Sidebar.Item>
            </Link>

            <Link
              className={path === "/dashboard/nodes" ? "bg-gray-200" : ""}
              href="/dashboard/nodes"
            >
              <Sidebar.Item icon={FaLinode}> Nodes </Sidebar.Item>
            </Link>

            <Link
              className={path === "/dashboard/deposits" ? "bg-gray-200" : ""}
              href="/dashboard/deposits"
            >
              <Sidebar.Item icon={FaMoneyCheck}>Deposits</Sidebar.Item>
            </Link>

            <Link
              className={
                path === "/dashboard/transactions" ? "bg-gray-200" : ""
              }
              href="/dashboard/transactions"
            >
              <Sidebar.Item icon={FaFile}>Transactions</Sidebar.Item>
            </Link>

            <Link
              className={
                path?.includes("/dashboard/security") ? "bg-gray-200" : ""
              }
              href="/dashboard/security"
            >
              <Sidebar.Item icon={FaLock}>Security</Sidebar.Item>
            </Link>

            <Link
              className={
                path?.includes("/dashboard/settings") ? "bg-gray-200" : ""
              }
              href="/dashboard/settings"
            >
              <Sidebar.Item icon={FaCogs}>Settings</Sidebar.Item>
            </Link>

            <div className="cursor-pointer" onClick={signoutHandler}>
              <Sidebar.Item icon={FaSignOutAlt}>Logout</Sidebar.Item>
            </div>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}

// transaction manual adding balance
