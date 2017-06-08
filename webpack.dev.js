const webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  devtool: 'cheap-module-source-map',
  output: {
   filename: 'bundle.js',
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
	  },
	  {
		test: /\.js$/,
		exclude: /(node_modules|bower_components)/,
		use: {
			loader: 'babel-loader',
			options: {
			  presets: ['es2015']
			}
		}
	  }
	]
  },
  plugins:[
    new ExtractTextPlugin('styles.css'),
	new webpack.ProvidePlugin({
	            $: "jquery",
	            jQuery: "jquery",
	            "window.jQuery": "jquery"
	        })
  ],
  devServer: {
    contentBase: './dist/',
    port: 1338,
    hot: true,
    inline: true
  }
  
};