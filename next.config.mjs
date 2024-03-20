import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  cacheStartUrl: true,
  dynamicStartUrl: true,
  reloadOnOnline: true,
  fallbacks: {
    document: "/offline",
  },
});

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

export default withPWA(nextConfig);
