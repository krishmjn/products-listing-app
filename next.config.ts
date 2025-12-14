import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  },
  experimental: {
    serverActions: {}, // Enable server actions with default options
  },
  images: {
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;