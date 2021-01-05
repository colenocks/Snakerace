const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.s[ac]ss$/i,
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
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};

//build development server

//run npx webpack-dev-server --mode development

//npm install --save-dev react-hot-loader

//Imnstall and use font awesome

/* Using webpack and scss:
  
  Install font-awesome using npm (using the setup instructions on https://fontawesome.com/how-to-use)
  
  npm install @fortawesome/fontawesome-free
  Next, using the copy-webpack-plugin, copy the webfonts folder from node_modules to your dist folder during your webpack build process. (https://github.com/webpack-contrib/copy-webpack-plugin)
  
  npm install copy-webpack-plugin
  In webpack.config.js, configure copy-webpack-plugin. NOTE: The default webpack 4 dist folder is "dist", so we are copying the webfonts folder from node_modules to the dist folder.
  
  const CopyWebpackPlugin = require('copy-webpack-plugin');
  
  module.exports = {
      plugins: [
          new CopyWebpackPlugin([
              { from: './node_modules/@fortawesome/fontawesome-free/webfonts', to: './webfonts'}
          ])
      ]
  } 
  */
