// @ts-check
const { i18n } = require('./next-i18next.config.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '8000' },
      { protocol: 'http', hostname: 'localhost', port: '8010' },
      { protocol: 'http', hostname: '159.223.223.242', port: '8010' },
      { protocol: 'http', hostname: '159.223.223.242', port: '8000' },
    ],
  },
};

module.exports = nextConfig;
