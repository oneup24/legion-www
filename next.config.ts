import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const isStaticExport = process.env.BUILD_MODE === "static";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  trailingSlash: isStaticExport,
  images: {
    unoptimized: isStaticExport,
  },
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default withNextIntl(nextConfig);