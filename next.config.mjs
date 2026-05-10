/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/nempSolutions',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      }
    ],
  },
};

export default nextConfig;
