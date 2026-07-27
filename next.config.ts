import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "true";

const baseConfig: NextConfig = {
  async headers() {
    // في وضع التطوير: امنع المتصفح من تخزين ملفات الأنماط والسكربتات مؤقتاً،
    // لأن Next يعيد استخدام نفس اسم الملف فلا يلاحظ المتصفح التعديلات.
    if (process.env.NODE_ENV !== "development") return [];

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, must-revalidate" },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
    ];
  },
};

const nextConfig: NextConfig = isStaticExport
  ? {
      output: "export",
      images: { unoptimized: true },
      basePath: process.env.BASE_PATH || "",
      trailingSlash: true,
    }
  : baseConfig;

export default nextConfig;
