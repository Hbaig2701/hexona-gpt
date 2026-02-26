/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for pdf-parse and mammoth to work in API routes
  experimental: {
    serverComponentsExternalPackages: ["pdf-parse", "mammoth"],
  },
  // Allow Supabase Storage images if needed
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
