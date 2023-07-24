const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const metaConfig = require("./config/meta");
const { NODE_ENV: _NODE, PROJECT_ENV: _PROJECT } = process.env;

const systemJsImportmap = require("./config/importmap");
const importMap = { imports: {} };

const sysConfig = require(`./envconfig.${_PROJECT}`);
const isDispatchDev = sysConfig.systemsConfig.Dispatch.env === "dev";
const isCommandDev = sysConfig.systemsConfig.Command.env === "dev";
systemJsImportmap(sysConfig).forEach(
  (item) => (importMap.imports[item.name] = item.entry)
);

let publicPathStr = "/";
let apiPre = "/";
let cdnFiles = {
  js: [],
};

if (_NODE !== "development") {
  cdnFiles = {
    js: [
      // 'https://unpkg.com/react@17/umd/react.production.min.js',
      // 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js'
    ],
  };
}

if (_NODE === "development" && _PROJECT === "dev") {
  publicPathStr = "http://localhost:8000/";
  apiPre = "";
}

const _MIXPANEL =
  _PROJECT === "production"
    ? "01b39ee07eb61c265da3abda2068ed16"
    : "0ef27e20e7588ea61a3f5f2ac76cc6d6";

module.exports = {
  entry: {
    main: "./src/main.tsx",
    // 'tl-mf-config': isDispatchDev ? './src/tl-mf-config.dispatch-dev.ts' : './src/tl-mf-config.ts',
  },
  output: {
    filename: (pathData) => {
      return pathData.chunk.name === "main"
        ? "[name].[fullhash:6].js"
        : "[name].js";
    },
    path: path.resolve(__dirname, "dist"),
    publicPath: publicPathStr,
    library: { type: "window" },
    globalObject: "window",
    assetModuleFilename: "[name].[hash:6][ext][query]",
  },
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'babel-loader',
      //   },
      // },
      {
        test: /\.(png|svg|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
        parser: {
          dataUrlCondition: {
            maxSize: 2 * 1024, // max 4kb
          },
        },
      },
      // {
      //   test: /\.svg$/,
      //   type: 'asset/resource',
      //   loader: 'svg-sprite-loader',
      //   include: path.join(__dirname, '/asset/svg'),
      // },
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/i,
      //   type: 'asset/resource',
      // },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        PROJECT_ENV: JSON.stringify(_PROJECT),
        MIXPANEL: JSON.stringify(_MIXPANEL),
        SYSTEM_CONFIG: JSON.stringify(sysConfig),
      },
    }),
    new HtmlWebpackPlugin({
      template: "public/index.ejs",
      inject: "body",
      favicon: path.resolve("public/favicon.ico"),
      meta: metaConfig,
      files: cdnFiles,
      templateParameters: {
        title: "Single-Management",
        node_env: _NODE,
        dispatch_dev: isDispatchDev,
        project_env: _PROJECT,
        systemJsImportmap: JSON.stringify(importMap, null, 2),
        systemjsPath: `static-url`,
        mixpanel: _MIXPANEL,
        DOCUMENT_URL: sysConfig.env.DOCUMENT_URL,
        TRACk_URL: sysConfig.env.TRACk_URL,
        VERIFY_URL: sysConfig.env.VERIFY_URL,
        COMMAND_MOBILE: sysConfig.env.COMMAND_MOBILE,
      },
    }),
  ],
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".tsx",
      ".ts",
      ".json",
      ".css",
      ".less",
      ".scss",
      ".sass",
    ],
    alias: {
      "@": path.resolve(__dirname, "src"),
      // src: path.resolve(__dirname, 'src'),
      asset: path.resolve(__dirname, "asset"),
    },
  },
};
