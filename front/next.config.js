// @ts-check
const { i18n } = require('./next-i18next.config.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: false,
  images: {
    domains: ['localhost'],
  },
};

module.exports = {
  images: {
    domains: ['localhost:8000'],
  },
};
module.exports = nextConfig;
