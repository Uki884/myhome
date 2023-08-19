import { join } from 'path';

const config = {
  webpack(config, options) {
    config.resolve.alias["@"] = join(__dirname, "src");
    return config;
  },
  experimental: {
    optimizeFonts: true,
  },
};

export default config;