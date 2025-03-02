// lib/axios.ts
import axios from "axios";

export const alchemyHttp = axios.create({
    baseURL: "https://polygon-mainnet.g.alchemy.com/v2/9KT8chuOsD5uz2KZxaFqlmX75CmDNI1PP",
});

// Tron API instance
export const tron_req = axios.create({
    baseURL: "https://api.tronstack.io", // Replace with actual Tron API URL
});
