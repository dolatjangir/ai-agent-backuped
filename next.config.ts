/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  turbopack: {},
  images: {
    domains: ["picsum.photos"],
  },
  reactStrictMode: true,
};

module.exports = withPWA(nextConfig);