/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias["@"] = require("path").resolve(__dirname, ".");
    return config;
  },
};

module.exports = nextConfig;
