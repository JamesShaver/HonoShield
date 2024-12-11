const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.js', // Entry point for your app
  output: {
    filename: 'worker.js', // Output file for Cloudflare Worker
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2', // Cloudflare Workers require this format
  },
  target: 'webworker', // Specify Worker environment
  externals: [nodeExternals()], // Exclude Node.js modules from bundle
  module: {
    rules: [
      {
        test: /\.css$/, // Handle CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/, // Handle fonts and images
        use: ['file-loader'],
      },
    ],
  },
  mode: 'production', // Optimize for production
};
