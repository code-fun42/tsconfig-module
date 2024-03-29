import path from "node:path";

import {webpack} from "webpack";
import type {Configuration as WebpackConfiguration} from "webpack";
import type {Configuration as WebpackDevServerConfiguration} from "webpack-dev-server";

import HtmlWebpackPlugin from "html-webpack-plugin";
import {TsconfigPathsPlugin} from "tsconfig-paths-webpack-plugin";

const devServer: WebpackDevServerConfiguration = {
   static: "vendor",
   historyApiFallback: true,
   http2: true,
   hot: true,
};

const config: WebpackConfiguration = {
   devtool: false,
   mode: "development",

   devServer,

   cache: {
      type: "filesystem",
   },

   entry: "./src/index.tsx",

   output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist",),
      assetModuleFilename: "[name][ext]",
      clean: true,
   },

   plugins: [
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, "src", "index.html"),
      }),
   ],

   module: {
      rules: [
         {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: "ts-loader",
            options: {
               transpileOnly: true,
               configFile: "tsconfig.json",
            }
         },

         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
               presets: [
                  '@babel/preset-env',
                  '@babel/preset-react',
               ]
            }
         },

         {
            test: /\.css$/i,
            exclude: /node_modules/,
            use: [
               "style-loader",
               "css-loader",
            ]
         },
      ]
   },

   resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],

      plugins: [
         new TsconfigPathsPlugin(),
      ]
   },

   optimization: {
      splitChunks: {
         chunks: "all",
         cacheGroups: {
            react: {
               test: /[/\\]node_modules[/\\]react/,
               filename: 'react.[contenthash].js'
            }
         }
      },
   },
};

export default config;
