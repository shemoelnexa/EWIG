import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.eastandwest.ae",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "eastandwest.ae",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
