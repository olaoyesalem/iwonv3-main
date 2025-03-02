"use client";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { useState, useRef, useEffect } from "react";
import { FaEye, FaEyeSlash, FaLock, FaWallet } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";
import Logo from "../Logo";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Container from "./Container";
import useTheme from "../hooks/useTheme";
import { signIn } from "next-auth/react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useAccount, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

declare global {
  interface Window {
    ethereum?: any;
  }
}
const queryClient = new QueryClient();

const Login = () => {
  const router = useRouter();
  const { mode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [showConnectButton, setShowConnectButton] = useState(false);
  const [inputs, setInputs] = useState({
    emailInput: "",
    passwordInput: "",
    isSecure: true,
  });

  const loginHandler = async () => {
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email: inputs.emailInput,
        password: inputs.passwordInput,
        redirect: false,
      });

      if (res?.error) throw new Error(res.error);
      router.replace("/dashboard");
      toast.success("login successful");
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleConnectWallet = async () => {
    setShowConnectButton(!showConnectButton);
    
    if (!showConnectButton) {
      // Initialize Web3Modal
      const providerOptions = {
        // Add your provider options here
      };
      const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions,
      });
  
      try {
      
        
        // Call your login handler with wallet address
      //  await loginHandlerWithWallet("0xcf8Ea8BE4F2F3F5E218022AFDeb0b24c5931BFD7"); //@note //replace with connected wallet address
      } catch (error) {
        toast.error("Failed to connect wallet");
      }
    }

   
  };

 

  return (
    <Container>
      <div
        className={`${mode === "dark" ? "text-blue-500" : "text-blue-800"} font-bold text-2xl md:text-3xl flex items-center gap-x-2`}
      >
        <FaLock size={24} /> <span>Sign in</span>
      </div>

      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          loginHandler();
        }}
      >
        <div className="flex flex-col gap-4 w-full">
          <TextInput
            id="email"
            icon={AiFillMail}
            placeholder="Enter Your Email or Username"
            value={inputs.emailInput}
            onChange={(e) =>
              setInputs({ ...inputs, emailInput: e.target.value })
            }
            required
          />

          <TextInput
            id="password"
            icon={inputs.isSecure ? FaEye : FaEyeSlash}
            placeholder="Enter Your Password"
            secureEntry={inputs.isSecure}
            iconAction={() =>
              setInputs({ ...inputs, isSecure: !inputs.isSecure })
            }
            value={inputs.passwordInput}
            onChange={(e) =>
              setInputs({ ...inputs, passwordInput: e.target.value })
            }
            required
          />
        </div>

        <Button
          type="submit"
          outline={false}
          small={false}
          label={"Sign In"}
          loading={loading}
        />
      </form>

      {/* Added Wallet Connection Section */}
      <div className="flex items-center w-full my-4">
        <div className={`flex-grow border-t ${mode === "dark" ? "border-gray-600" : "border-gray-300"}`}></div>
        <span className={`mx-4 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>OR</span>
        <div className={`flex-grow border-t ${mode === "dark" ? "border-gray-600" : "border-gray-300"}`}></div>
      </div>

      {/* Step 4: Update button and ConnectButton rendering */}
      <Button
        outline
        icon={FaWallet}
        label={showConnectButton ? "Hide Wallet Options" : "Connect Wallet"}
        onClick={handleConnectWallet}
        
      />

      {showConnectButton && (
        <div className="my-4 w-full flex justify-center">
          <ConnectButton />
        </div>
      )}

      <div className="flex flex-col gap-4 w-full items-center">
        <div
          onClick={() => router.push("/forgot-password")}
          className={`text-sm text-gray-300 text-center 
          font-semibold sm:cursor-pointer hover:text-gray-400 
          active:scale-[.95] transition-all select-none w-fit`}
        >
          Forgot your password?
        </div>

        <div
          className={`font-semibold 
        ${mode === "light" ? "text-gray-500" : "text-white"}`}
        >
          Don&apos;t have an account?{" "}
          <span
            className="cursor-pointer"
            onClick={() => {
              router.push("/register");
            }}
          >
            create one
          </span>
          .
        </div>

        <Button
          outline
          label={"Create new acccount"}
          onClick={() => {
            router.push("/register");
          }}
        />
      </div>
    </Container>
  );
};

export default Login;
