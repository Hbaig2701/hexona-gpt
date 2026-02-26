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
  // Allow iframe embedding (GoHighLevel, etc.)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          { key: "Content-Security-Policy", value: "frame-ancestors *" },
        ],
      },
    ];
  },
};

export default nextConfig;
