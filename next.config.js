const { withContentlayer } = require("next-contentlayer")
const createNextIntlPlugin = require('next-intl/plugin')
const i18nConfig = require("./src/i18n/constant.json")

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async redirects() {
    return [
      {
        source: '/',
        destination: `/${i18nConfig.defaultLocale}`,
        permanent: true
      },
    ];
  },

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