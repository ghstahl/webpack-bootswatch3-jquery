const webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'dist') 
  },
  module:{
    rules: [
      { test: require.resolve("jquery"), loader: "expose-loader?$!expose-loader?jQuery" },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
                use: 'css-loader'
        })
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),
    new ExtractTextPlugin('styles.min.css'),
    new webpack.ProvidePlugin({
              $: "jquery",
              jQuery: "jquery",
              "window.jQuery": "jquery"
          }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|html)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
}