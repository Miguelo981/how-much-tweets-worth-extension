const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    content: "./src/scripting/content.ts",
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].js",
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  devtool: "cheap-module-source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {from: "public", to: "."}
      ],
    }),
    new CleanWebpackPlugin(),
  ],
  module :{
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  }
};