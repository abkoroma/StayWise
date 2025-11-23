import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
      remotePatterns: [new URL('https://ppgfdorfwmgajdiewbnx.supabase.co/storage/v1/object/public/cabin-images/**')],
      domains: ['lh3.googleusercontent.com'],
    },
};

export default nextConfig;
