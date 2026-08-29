import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent browsers from guessing the MIME type
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Prevent clickjacking
  { key: "X-Frame-Options", value: "DENY" },
  // Only send origin in Referer header on same-origin requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restrict access to powerful browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // Basic Content Security Policy — tighten per feature as app grows
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js requires 'unsafe-inline' for its own style injection in dev
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      // Next.js Image Optimization and external image sources
      "img-src 'self' data: blob:",
      // Allow scripts from self; Next.js needs 'unsafe-eval' in dev mode
      process.env.NODE_ENV === "development"
        ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'"
        : "script-src 'self' 'unsafe-inline'",
      // Allow connections to self + Supabase + NextAuth
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  // Optimise images from Supabase Storage
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
