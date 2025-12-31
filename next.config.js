/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
  },
  output: "standalone",
  serverExternalPackages: ["pg"],
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
  turbopack: {},
};

module.exports = nextConfig;
