import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'ppgfdorfwmgajdiewbnx.supabase.co',
          pathname: '/storage/v1/object/public/cabin-images/**',
        },
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          pathname: '/**',
        }
        //new URL('https://ppgfdorfwmgajdiewbnx.supabase.co/storage/v1/object/public/cabin-images/**')
      ],
      //domains: ['lh3.googleusercontent.com'],
    },
};

export default nextConfig;
