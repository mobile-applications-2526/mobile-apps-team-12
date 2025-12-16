const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      'react-native$': 'react-native-web',
      '@react-native-community/datetimepicker': path.resolve(__dirname, 'cypress/mocks/datetimepicker.js'),
      '@react-native-async-storage/async-storage': path.resolve(__dirname, 'cypress/mocks/AsyncStorage.js'),
      'react-native-table-component': path.resolve(__dirname, 'cypress/mocks/table-component.js'),
      '../utils/supabase': path.resolve(__dirname, 'cypress/mocks/supabase.js'),
      '../services/FoodService': path.resolve(__dirname, 'cypress/mocks/FoodService.js'),
    },
    fallback: {
      "process": false,
      "buffer": false,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.EXPO_PUBLIC_SUPABASE_URL': JSON.stringify('http://localhost:54321'),
      'process.env.EXPO_PUBLIC_SUPABASE_KEY': JSON.stringify('mock-key'),
    }),
    new webpack.NormalModuleReplacementPlugin(
      /^expo-router$/,
      path.resolve(__dirname, 'cypress/mocks/expo-router.js')
    ),
    new webpack.NormalModuleReplacementPlugin(
      /^expo-router\/build\/exports$/,
      path.resolve(__dirname, 'cypress/mocks/expo-router.js')
    ),
    new webpack.NormalModuleReplacementPlugin(
      /expo-router/,
      path.resolve(__dirname, 'cypress/mocks/expo-router.js')
    ),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules\/(?!expo-router)/,
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
      }, {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/inline'
      },
    ],
  },
};