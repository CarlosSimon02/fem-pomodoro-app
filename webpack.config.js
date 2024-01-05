const path = require("path");

module.exports = {
  mode: "production",
  entry: "./js/main.js",
  output: {
    filename: "bundle.js", // The name of the output bundle
    path: path.resolve(__dirname, "dist"),
  },
};
