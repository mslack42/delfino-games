/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cf.geekdo-images.com",
      },
    ],
    minimumCacheTTL: 1000000,
  },
};

export default nextConfig;
