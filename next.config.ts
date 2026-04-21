import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    sassOptions: {
        additionalData: `@use "@/styles/_variables" as *;\n@use "@/styles/_mixins" as *;\n`,
    },
    turbopack: {
        rules: {
            "*.svg": {
                loaders: ["@svgr/webpack"],
                as: "*.js",
            },
        },
    },
};

export default nextConfig;
