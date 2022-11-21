/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '195.38.164.87',
        port: ':8000',
        pathname: '/media/main_images/',
      },
    ],
  }
}

module.exports = nextConfig
