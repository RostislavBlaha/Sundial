const { override, addReactRefresh } = require('customize-cra');

module.exports = override(
  addReactRefresh(),
  (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });
    return config;
  },
);