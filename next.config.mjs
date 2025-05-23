/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['raw.githubusercontent.com', 'placeholder.svg'],
    unoptimized: true,
  },
  // 添加自定义配置以禁用内置的PWA功能
  experimental: {
    // 禁用任何可能自动生成Service Worker的功能
    disableOptimizedLoading: true,
    optimizeCss: false,
  },
  // 添加字体优化配置
};

export default nextConfig;
