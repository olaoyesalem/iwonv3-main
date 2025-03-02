import { ethers } from "ethers";

// @/config/alchemy.ts
export enum NetworkType {
  MAINNET = "mainnet",
  TESTNET = "testnet"
}

export const CURRENT_NETWORK = NetworkType.MAINNET; // Change to TESTNET for testnet

// ERC20 Token Addresses (Polygon)
export const tokenAddresses = {
  MAINNET: {
    USDT: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f".toLowerCase(),
    USDC: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174".toLowerCase(),
    DAI: "0x8f3cf7ad23cd3cadb9735aff958023239c6a063".toLowerCase()
  },
  TESTNET: {
    USDT: "0x3813e82e6f7098b9583FC0F33a962D02018B6803".toLowerCase(),
    USDC: "0x0fa8781a83e46826621b3bc094ea2a0212e71b23".toLowerCase()
  }
};

// Network configurations
export const ALCHEMY_NETWORK = {
  [NetworkType.MAINNET]: {
    name: "polygon-mainnet",
    chainId: 137,
    alchemyName: "matic"
  },
  [NetworkType.TESTNET]: {
    name: "polygon-mumbai",
    chainId: 80001,
    alchemyName: "maticmum"
  }
};

// Default gas limits for common operations (units in wei)
export const DEFAULT_GAS_LIMITS = {
  ERC20_TRANSFER: 65000, // Typical gas limit for ERC20 transfers
  NATIVE_TRANSFER: 21000, // Base gas limit for simple transfers
  CONTRACT_INTERACTION: 200000 // Default for contract calls
};

// Default gas settings (update based on network conditions)
export const GAS_SETTINGS = {
  MAX_PRIORITY_FEE: ethers.utils.parseUnits("2", "gwei"), // 2 Gwei
  MAX_FEE_PER_GAS: ethers.utils.parseUnits("50", "gwei") // 50 Gwei
};

// Alchemy network configuration
export const ALCHEMY_CONFIG = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: ALCHEMY_NETWORK[CURRENT_NETWORK].alchemyName
};