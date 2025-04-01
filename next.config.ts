/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'test-9900.fg.onl',
        pathname: '/upload_resources/**',
      },
      {
        protocol: 'https',
        hostname: 'abklen.ru',
        pathname: '/upload_resources/**',
      },
    ],
  },
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;