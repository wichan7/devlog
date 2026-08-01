const { withContentlayer } = require("next-contentlayer")
const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
}

module.exports = withNextIntl(withContentlayer(nextConfig))
