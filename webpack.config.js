const path = require("path");
const webpack = require("webpack");

const isDevelopment = process.env.NODE_ENV !== 'production';
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  devServer: {
    hot: true,
  },
  entry: "./src/index.js",
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { 
          presets: ["@babel/preset-env"],
          plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx", ".ts", ".tsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    port: 3000,
  },
  plugins: [isDevelopment && new ReactRefreshWebpackPlugin()].filter(Boolean),

};