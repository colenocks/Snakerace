const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");
const BUILD_DIR = path.resolve(__dirname, "build");

module.exports = {
  devtool: "source-map",
  mode: "production",
  entry: "./client/src/index.js",
  output: {
    filename: "bundle.js",
    path: BUILD_DIR,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.s?[a?c]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./client/src/index.html",
      filename: "index.html",
      inject: true,
    }),
  ],
};
