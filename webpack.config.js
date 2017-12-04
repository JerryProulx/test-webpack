//entry -> output
var path = require('path');
var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

var extractSass = new ExtractTextPlugin({
  filename: 'styles.css'
})

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    libraryTarget: 'umd',
    filename: 'bundle.js'
  },
  module: {
    rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },{
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              query: {
                name: 'img/[name].[ext]'
            } 
            },
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true,
              },
            },
          ],
        },{
        test: /\.s?css$/,
        use: extractSass.extract({
          fallback: 'style-loader',
          use: [
          {loader: 'css-loader',
            options: {
              url: true
            }
          },
          {
            loader: 'postcss-loader'
          },
          {loader: 'sass-loader'}
        ]
        })
      }]
  },
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        minimize: true,
        compress: true
      }
    }),
    extractSass,
    new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:8080/',
        notify: false
    }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        TweenMax: 'gsap',
        Bounce: 'gsap',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],

        // In case you imported plugins individually, you must also require them here:
        Util: "exports-loader?Util!bootstrap/js/dist/util",
        Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
  })],
  // devtool: 'cheat-module-eval-source-map',
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true
  }
};


//devtool: "define source map to help debuggin, webpack compiled code becomes readable in the console"

//loader when webpack see a file with a certain extension, it does something with it


//.s?css le point dinterrogation fait en sorte que le s est optionel, alors les .scss et les .css sont utitliser pour les memes rules
