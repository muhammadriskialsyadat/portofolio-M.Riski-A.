/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow local assets + common external domains
    remotePatterns: [],
    // Unoptimized for static export if needed
    // unoptimized: true,
  },
  // Compress output
  compress: true,
  // Power by header remove
  poweredByHeader: false,
};

export default nextConfig;
