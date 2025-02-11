const commonConfig = require('../../webpack.app.config');
const { join } = require('path');
const { merge } = require('webpack-merge');

module.exports = merge(commonConfig, {
  output: {
    path: join(__dirname, '../../dist/apps/auth'),
  },
});
