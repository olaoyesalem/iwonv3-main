/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverActions: true },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ["res.cloudinary.com", "example.com"],

    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
