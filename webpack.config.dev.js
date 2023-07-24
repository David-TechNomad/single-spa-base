const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.base.js');
const {HotModuleReplacementPlugin, DefinePlugin} = require("webpack");
const devSetting = require('./envconfig.dev')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: { directory: path.join(__dirname, 'dist') },
    port: 8000,
    historyApiFallback: true,
    compress: true,
    hot: true,
    proxy: {
      '/tp-portal-v2': {
        target: devSetting.systemsConfig.Command.entrance.devHost,
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(sc|sa|c)ss$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                localIdentName: '[path]-[local]-[hash:base64:6]',
                exportLocalsConvention: 'camelCase',
              },
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      // options
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
          },

        ],
      },
    ],
  },
  plugins: [
    new HotModuleReplacementPlugin()
  ],
});
