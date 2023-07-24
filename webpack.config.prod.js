const { merge } = require('webpack-merge');
const common = require('./webpack.config.base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(common, {
  mode: 'production',
  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM',
  // },
  module: {
    rules: [
      {
        test: /\.(sc|sa|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
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
    new MiniCssExtractPlugin(),
    new CompressionPlugin({
      filename: '[name].js.br',
      algorithm: 'brotliCompress',
      test: /\.(js)$/, //
      compressionOptions: {
        level: 11
      },
      threshold: 10240, //
      minRatio: 0.8,
      // deleteOriginalAssets: true //
    }),
    ...process.env.REPORT ? [new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      generateStatsFile: false,
      analyzerHost: '127.0.0.1',
      analyzerPort: '8877',
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: false,
      statsFilename: 'stats.json',
      statsOptions: null,
      excludeAssets: null
    })] : [],
  ],
});
