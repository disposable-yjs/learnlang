const webpack = require("webpack")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
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
      { test: /\.svg$/, loader: 'url?mimetype=image/svg+xml&name=[path][name].[ext]' },
      { test: /\.woff$/, loader: 'url?mimetype=application/font-woff&name=[path][name].[ext]' },
      { test: /\.woff2$/, loader: 'url?mimetype=application/font-woff2&name=[path][name].[ext]' },
      { test: /\.[ot]tf$/, loader: 'url?mimetype=application/octet-stream&name=[path][name].[ext]' },
      { test: /\.eot$/, loader: 'url?mimetype=application/vnd.ms-fontobject&name=[path][name].[ext]' }
      ,
      { 
        test: /\.js$/, 
        exclude: /node_modules\/(?!(huozi|pixi-richtext))/, 
        loader: "babel", 
        query:{
          presets: ['es2015',"stage-0"],
          "plugins": [
            ["transform-runtime", {
              "polyfill": false,
              "regenerator": true
            }]
          ]
        }
      },
      
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.css$/, loader: "style!css" },
      {
        test: /\.scss$/,
        loader:"style/useable!css!sass"
      },
      { test: /\.pegjs$/, exclude: /node_modules/, loader: 'pegjs' }
    ]
  },
  plugins: [
    new UglifyJsPlugin()
  ],
};
