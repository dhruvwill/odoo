/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],

  images: { domains: ["books.google.com"] },
};

export default nextConfig;
