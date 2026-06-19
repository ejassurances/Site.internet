import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://koalendar.com https://*.supabase.co",
              "style-src 'self' 'unsafe-inline' https://koalendar.com https://fonts.googleapis.com",
              "img-src 'self' data: blob: https://koalendar.com https://*.supabase.co",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.supabase.co https://koalendar.com",
              "frame-src 'self' https://koalendar.com",
              "worker-src 'self' blob:",
            ].join("; "),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/(.*)",
        has: [{ type: "host", value: "ej-assurances.fr" }],
        destination: "https://www.ej-assurances.fr/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
