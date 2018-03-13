let HtmlWebpackPlugin = require('html-webpack-plugin');

let appDir = __dirname + '/app/';
let buildDir = __dirname + '/app/dist/';

module.exports = {
  entry: {
    app: appDir + 'index.jsx',
    vendor: [
      'react',
      'react-dom'
    ]
  },
  output: {
    filename: '[name].bundle.[hash].js',
    path: buildDir
  },
  mode: 'development',
  performance: {
    hints: false
  },
  plugins: [new HtmlWebpackPlugin({
    template: appDir + 'index.html',
    chunks: ['vendor', 'app']
  })],
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: buildDir,
    hot: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env'],
          plugins: ['transform-object-rest-spread']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
