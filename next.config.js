/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    typedRoutes: true,
  },
  transpilePackages: ['jotai-devtools'],
};

module.exports = nextConfig;
