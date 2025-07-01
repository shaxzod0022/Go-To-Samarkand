import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gotosamarkand.onrender.com",
        port: "",
        pathname: "/static/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
