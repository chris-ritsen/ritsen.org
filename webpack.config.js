
let autoprefixer = require("autoprefixer");
let path = require("path");
let precss = require("precss");
let webpack = require("webpack");

module.exports = {
  "entry": [
    "whatwg-fetch",
    "./client/index"
  ],
  "module": {
    "loaders": [
      {
        "exclude": /node_modules/,
        "include": __dirname,
        "loaders": [ "babel" ]
      },
      {
        loader: "style-loader?sourceMap!css-loader?sourceMap!postcss-loader?sourceMap=inline",
        test:   /\.css$/
      },
			{
				loader: 'file?name=public/fonts/[name].[ext]',
				test: /\.(eot|svg|ttf|woff|woff2)$/
      }
    ],
    resolve: {
      extensions: ["", ".js", ".jsx", ".css"],
      modulesDirectories: [
        "node_modules"
      ]
    }
  },
  "postcss": () => [precss, autoprefixer],
  "output": {
    "filename": "bundle.js",
    "path": "./static/"
  }
};

