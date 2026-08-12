import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    qualities: [25, 50, 75],
  },
};

export default nextConfig;
