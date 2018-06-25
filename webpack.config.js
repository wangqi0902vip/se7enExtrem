const path = require('path');

module.exports = {
  mode:'development',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};
