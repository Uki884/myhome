const path = require('path')
const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

const config = {
  webpack(config, options) {
    config.resolve.alias["@"] = path.join(__dirname, "src");
    return config;
  },
  experimental: {
    optimizeFonts: true,
  },
};

module.exports = withVanillaExtract(config);