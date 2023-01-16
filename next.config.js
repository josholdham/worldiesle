/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'worldiesle.s3.eu-west-2.amazonaws.com',
      },
    ],
  },
};

module.exports = nextConfig;
