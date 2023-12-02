const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      "assert": require.resolve("assert/"),
      "buffer": require.resolve("buffer/"),
      "crypto": require.resolve("crypto-browserify"),
      "fs": require.resolve("fs"),
      "path": require.resolve("path-browserify"),
      "process": require.resolve("process/browser"),
      "util": require.resolve("util/"),
    },
  },
};
