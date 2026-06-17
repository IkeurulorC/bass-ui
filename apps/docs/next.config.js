/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"], // Instructs Webpack to compile your local workspace library
};

export default nextConfig;
