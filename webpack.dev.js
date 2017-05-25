const webpack = require('webpack');
var path = require('path');
 
module.exports = {
  entry: './app/index.js',
  devtool: 'cheap-module-source-map',
  output: {
   filename: 'bundle.js',
   path: path.resolve(__dirname, 'dist') 
  },
  module:{
	rules: [
	  {
	    test: /\.css$/,
	    use: [ 'style-loader', 'css-loader' ]
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
	new webpack.ProvidePlugin({
	            $: "jquery",
	            jQuery: "jquery",
	            "window.jQuery": "jquery"
	        })
  ]
  
};