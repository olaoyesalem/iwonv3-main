"use client";

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider as RKProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";

// Create the query client
const queryClient = new QueryClient();

// Configure Wagmi and RainbowKit
const config = getDefaultConfig({
  appName: 'iWON Community Winners',
  projectId: 'ea6a75828beeff0439c45cd50883ff43', // Replace with your project ID
  chains: [ polygon],
  ssr: true,
});

export default function RainbowKitProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RKProvider>
          {children}
        </RKProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}