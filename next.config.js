/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['mv-shared-components']);

const nextConfig = withTM({
  reactStrictMode: false,
  swcMinify: true,
})

module.exports = nextConfig