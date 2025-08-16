/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false, // Enable optimized images for SSR
  },
  output: "standalone",
  serverExternalPackages: ["pg"],
  webpack: (config) => {
    config.resolve.alias["@"] = require("path").resolve(__dirname, ".");
    return config;
  },
};

module.exports = nextConfig;
