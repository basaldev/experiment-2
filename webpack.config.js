const path = require('path');

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: '/',
    filename: "bundle.js"
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'build'),
    hot: true,
    overlay: {
      errors: false,
    },
    open: true,
    inline: true,
    host: 'localhost',
    publicPath: `/`,
    stats: 'errors-only',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: ['node_modules', 'src']
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ]
  },
};
