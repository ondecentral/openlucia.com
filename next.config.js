/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false, // Enable optimized images for SSR
  },
  output: "standalone",
  serverExternalPackages: ["pg"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    CLIENT_ID: process.env.CLIENT_ID,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  },
  webpack: (config) => {
    config.resolve.alias["@"] = require("path").resolve(__dirname, ".");
    return config;
  },
};

module.exports = nextConfig;
