import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Bắt buộc để xuất ra static files cho GitHub Pages
  basePath: '/english-story-web', // Tên repository của bạn[cite: 1]
  assetPrefix: '/english-story-web/', // Tên repository của bạn[cite: 1]
  images: {
    unoptimized: true, // GitHub Pages không hỗ trợ tối ưu ảnh mặc định của Next.js
  },
};

export default nextConfig;
