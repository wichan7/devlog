const { withContentlayer } = require("next-contentlayer")
const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = withNextIntl(withContentlayer(nextConfig))