// allowing this dev-only webpack compilation code to access devDependencies
// following convention proposed in https://github.com/webpack/webpack/issues/520#issuecomment-174011824
/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
/* eslint-enable */

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
});
