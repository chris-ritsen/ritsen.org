
let path = require("path");
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
      }
    ]
  },
  "output": {
    "filename": "./static/bundle.js"
  }
};

