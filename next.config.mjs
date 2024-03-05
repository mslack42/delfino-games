/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cf.geekdo-images.com",
      },
    ],
  },
};

export default nextConfig;
