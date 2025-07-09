import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gotosamarkand.onrender.com",
        port: "",
        pathname: "/static/**",
        // protocol: "http",
        // hostname: "localhost",
        // port: "8080",
        // pathname: "/static/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
