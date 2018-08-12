const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",
  entry: [
    path.join(__dirname, "/src/client/index.js")
  ],
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
      },
      {
        test: /\.(less)$/,
				loaders: ["style-loader", "css-loader", "less-loader"]
      }
    ] 
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: __dirname + '/dist',
    historyApiFallback: true,
    stats: "minimal"
  }
  
}