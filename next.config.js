const { withContentlayer } = require("next-contentlayer2")
const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
}

module.exports = withNextIntl(withContentlayer(nextConfig))
