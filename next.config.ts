import type { NextConfig } from "next";
import withSerwistInit from '@serwist/next'

const withSerwist = withSerwistInit({
    swSrc: 'app/sw.ts',
    swDest: 'public/sw.js',
    // disable: process.env.NODE_ENV === 'development',
    reloadOnOnline: false,
    additionalPrecacheEntries: [
        { url: '/offline', revision: '1' }
    ],
})
const nextConfig: NextConfig = {
    sassOptions: {
        additionalData: `@use "@/styles/_variables" as *;\n@use "@/styles/_mixins" as *;\n`,
    },
    allowedDevOrigins: ['192.168.1.*'],
    turbopack: {
        rules: {
            "*.svg": {
                loaders: ["@svgr/webpack"],
                as: "*.js",
            },
        },
    },
};

export default withSerwist(nextConfig as any);
