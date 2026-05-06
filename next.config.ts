import type { NextConfig } from "next";
import withSerwistInit from '@serwist/next'
import type { RuleSetRule } from "webpack"

const withSerwist = withSerwistInit({
    swSrc: 'app/sw.ts',
    swDest: 'public/sw.js',
    disable: process.env.NODE_ENV === 'development',
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
    webpack(config) {
        const fileLoaderRule = (config.module.rules as RuleSetRule[]).find(
            (rule) => rule.test instanceof RegExp && rule.test.test('.svg')
        ) as RuleSetRule

        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/,
            },
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: {
                    not: [...((fileLoaderRule.resourceQuery as { not: RegExp[] }).not ?? []), /url/]
                },
                use: ['@svgr/webpack'],
            }
        )

        fileLoaderRule.exclude = /\.svg$/i
        return config
    },
}

export default withSerwist(nextConfig as any)