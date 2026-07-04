/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@bass-ui-kit/core"], // Instructs Webpack to compile your local workspace library
};

export default nextConfig;
