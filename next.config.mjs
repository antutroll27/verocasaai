/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add transpilePackages for Sanity components
  transpilePackages: ['next-sanity'],
  // Add Sanity content sources to be included in build
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
    ],
  },
};

export default nextConfig;
