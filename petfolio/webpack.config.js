const path = require('path');

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      'react-native$': 'react-native-web',
      '@react-native-community/datetimepicker': path.resolve(__dirname, 'cypress/mocks/datetimepicker.js'),
      '@react-native-async-storage/async-storage': path.resolve(__dirname, 'cypress/mocks/AsyncStorage.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ],
  },
};