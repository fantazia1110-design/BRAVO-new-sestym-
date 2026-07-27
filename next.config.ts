import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = isStaticExport
  ? {
      output: "export",
      images: { unoptimized: true },
      basePath: process.env.BASE_PATH || "",
      trailingSlash: true,
    }
  : {};

export default nextConfig;
