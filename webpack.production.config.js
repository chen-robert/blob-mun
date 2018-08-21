const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");

module.exports = {
  mode: "production",
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
        test: /\.(css|less)$/,
				loaders: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader : "file-loader"
      }
    ] 
  },
  plugins: [new BundleAnalyzerPlugin()],
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