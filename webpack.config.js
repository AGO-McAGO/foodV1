
const path = require("path"); // to include (create) a built in node package (module), that will enable access to the absolute path. 
const HtmlWebpackPlugin = require("html-webpack-plugin"); // to enable copying the src folder index.html file into the index.html of the dist folder.
const webpack = require('webpack'); //to access built-in plugins.

module.exports = {
  entry: [ "@babel/polyfill", "./src/js/index.js"], // the entry point where webpack is gon begin bundling from.
  output: {
    // to specify where webpack'z gon save the bundle file.
    path: path.resolve(
      __dirname,
      "dist"
    ), /* the path to the folder. This needs to be an absolute path, a built in node package is required
                                                                      inorder to have access to the absolute path. "__dirname" (which is the working directory, i.e "46.forkify")
                                                                      is the current absolute path, resolve() method is used to join the directory with the folder that the
                                                                      "bundle.js" will be in (i.e "dist"). */
    filename: "js/bundle.js" // the filename, the file where the bundle'z gon be saved.
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./dist"), // specifying the folder (i.e the "dist") from which webpack should serve the files.
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  plugins: [
    // plugins recieves an array of all the plugins to be used.
    new HtmlWebpackPlugin({
      filename: "index.html", // the new file to be copied (created).
      template: "./src/index.html" // the source from which the new file will be created.
    })
  ],
  module: {
    rules: [ // rules receives and an array of all the loaders to be used.
      {
        test: /\.js$/, // to test (check) for all ".js" files (i.e javascript files).
        exclude: /node_modules/, // javascript files inside the node_modules folder will not use the babel-loader.
        use: { // all javascript files will use the babel-loader below.
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          },
        },
      },
    ],
  },
};