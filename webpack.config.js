const webpack = require("webpack")
module.exports = {
  context: __dirname ,
  watch:true,
  entry: "./js/main.js",
  output: {
    path:__dirname,
    filename:"./dist/dist.js",
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel", 
        query:{
          presets: ['env']
        }
      },
      
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.css$/, loader: "style!css" },
      {
        test: /\.scss$/,
        loader:"style/useable!css!sass"
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],
};
