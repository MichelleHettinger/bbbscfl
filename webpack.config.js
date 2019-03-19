const path = require('path');
const webpack = require('webpack');
const pkjson = require('./package.json');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "allstyles.css",
    disable: process.env.NODE_ENV === "development",
});

module.exports = {
  entry: {
    javascript: __dirname + "/src/redux/app.js",
  },

  output: {
    filename: "bundle.js",
    path: __dirname + '/src/public/',
  },

  resolve: {
    extensions: ['*','.js', '.jsx', '.json'],
  },

  cache: true,

  devtool: 'source-map',

  devServer:{
      contentBase: 'public',
      historyApiFallback: true,
      inline: true,
      hot: true,
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: ["react-hot-loader", "babel-loader"]
      },
      {
        test: /\.html$/,
        loader: "file-loader?name=[name].[ext]"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, 'server.js', 'mock/*'],
        loader: "eslint-loader",
        enforce: "pre",
        options: {
          fix: true,
        }
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }
          ],
          // use style-loader in development
          fallback: "style-loader",
        }),
      },
    ]
  },

  plugins: [
    extractSass,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,  // <-------- DISABLE redux-devtools HERE
      __BASE_URL__: JSON.stringify('http://localhost:7777/'),
      __PUBLIC_PATH__: __dirname + '/src/public/',
      __APP_VERSION__: JSON.stringify(pkjson.version)
    })
  ]
};