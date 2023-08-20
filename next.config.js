// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const config = {
  webpack(config, options) {
    config.resolve.alias["@"] = path.join(__dirname, "src");
    return config;
  },
};

module.exports = config;