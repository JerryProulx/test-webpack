//entry -> output
var path = require('path');
var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var extractSass = new ExtractTextPlugin({
  filename: 'styles.css'
})

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },{
        test: /\.s?css$/,
        use: extractSass.extract({
          fallback: 'style-loader',
          use: [
          {loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          {loader: 'sass-loader'}
        ]
        })
      }]
  },
  plugins: [
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      uglifyOptions: {
        compress: true
      }
    }),
    extractSass,
    new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:8080/'
    }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
        // In case you imported plugins individually, you must also require them here:
        Util: "exports-loader?Util!bootstrap/js/dist/util",
        Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
  })],
  devtool: 'cheat-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true
  }
};



//devtool: "define source map to help debuggin, webpack compiled code becomes readable in the console"

//loader when webpack see a file with a certain extension, it does something with it


//.s?css le point dinterrogation fait en sorte que le s est optionel, alors les .scss et les .css sont utitliser pour les memes rules
