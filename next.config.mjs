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
  // Legacy URL redirects from before the Agency Advisory rebrand. Old links
  // 308-redirect to the new location so bookmarks, chat-history references,
  // and external links keep working. Order matters: specific slug rewrites
  // run before the catch-all prefix redirect.
  async redirects() {
    return [
      // Specific slug renames (prompt-engineer -> prompting, agency-onboarding -> onboarding)
      { source: "/advisors/prompt-engineer", destination: "/advisors/prompting", permanent: true },
      { source: "/advisors/agency-onboarding", destination: "/advisors/onboarding", permanent: true },
      { source: "/clients/:clientId/advisors/prompt-engineer", destination: "/clients/:clientId/advisors/prompting", permanent: true },
      { source: "/clients/:clientId/advisors/agency-onboarding", destination: "/clients/:clientId/advisors/onboarding", permanent: true },
      { source: "/admin/advisors/prompt-engineer", destination: "/admin/advisors/prompting", permanent: true },
      { source: "/admin/advisors/agency-onboarding", destination: "/admin/advisors/onboarding", permanent: true },
      // /gpts/* -> /advisors/* catch-all (covers legacy bookmarks)
      { source: "/gpts/prompt-engineer", destination: "/advisors/prompting", permanent: true },
      { source: "/gpts/agency-onboarding", destination: "/advisors/onboarding", permanent: true },
      { source: "/clients/:clientId/gpts/prompt-engineer", destination: "/clients/:clientId/advisors/prompting", permanent: true },
      { source: "/clients/:clientId/gpts/agency-onboarding", destination: "/clients/:clientId/advisors/onboarding", permanent: true },
      { source: "/admin/gpts/prompt-engineer", destination: "/admin/advisors/prompting", permanent: true },
      { source: "/admin/gpts/agency-onboarding", destination: "/admin/advisors/onboarding", permanent: true },
      // Generic prefix redirects (after specific slug ones so they don't shadow)
      { source: "/gpts/:slug*", destination: "/advisors/:slug*", permanent: true },
      { source: "/clients/:clientId/gpts/:slug*", destination: "/clients/:clientId/advisors/:slug*", permanent: true },
      { source: "/admin/gpts/:slug*", destination: "/admin/advisors/:slug*", permanent: true },
    ];
  },
};

export default nextConfig;
