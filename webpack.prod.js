// allowing this dev-only webpack compilation code to access devDependencies
// following convention proposed in https://github.com/webpack/webpack/issues/520#issuecomment-174011824
/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  bail: true,
  plugins: [
    new CompressionPlugin(),
  ],
});
/* eslint-enable */
