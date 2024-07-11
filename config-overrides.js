// config-overrides.js (used with react-app-rewired)
const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  addWebpackModuleRule({
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192, // Inline files smaller than 8KB
          name: 'src/assets/*.png',
        },
      },
    ],
  })
);