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
  // Legacy /gpts/* URLs from before the Agency Advisory rebrand 308-redirect
  // to /advisors/* so old bookmarks, chat history references, and external
  // links keep working.
  async redirects() {
    return [
      { source: "/gpts/:slug*", destination: "/advisors/:slug*", permanent: true },
      { source: "/clients/:clientId/gpts/:slug*", destination: "/clients/:clientId/advisors/:slug*", permanent: true },
      { source: "/admin/gpts/:slug*", destination: "/admin/advisors/:slug*", permanent: true },
    ];
  },
};

export default nextConfig;
