// allowing this dev-only webpack compilation code to access devDependencies
// following convention proposed in https://github.com/webpack/webpack/issues/520#issuecomment-174011824
/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  // https://github.com/vuejs-templates/webpack/issues/215#issuecomment-238095102
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
    },
  },
});
/* eslint-enable */
