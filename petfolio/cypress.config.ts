import { defineConfig } from "cypress";
import webpackConfig from './webpack.config'
import path from 'path';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8081', 
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    video: false,
    screenshotOnRunFailure: true,
  },
  env: {
      SUPABASE_URL: 'https://ccqacjrgnbqfyvkfxjoq.supabase.co',
      SUPABASE_ANON_KEY: 'sb_publishable_er4-JYK258s6fUpzHCd7BA_pP-vDn76'
    },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig: {
        ...webpackConfig,
        devServer: {
          allowedHosts: "all",
          host: "localhost",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        },
        resolve: {
          ...webpackConfig.resolve,
          alias: {
            ...webpackConfig.resolve?.alias,
            '@react-native-vector-icons/get-image': false,
            'expo-modules-core': path.resolve(__dirname, 'cypress/mocks/expo-modules-core.js'),
            'utils/supabase': path.resolve(__dirname, 'cypress/mocks/supabase.js'),
            '@react-native-community/datetimepicker': path.resolve(__dirname, 'cypress/mocks/datetimepicker.js'),
          },
          fallback: {
            ...webpackConfig.resolve?.fallback,
            'react-native': false,
          },
        },
        module: {
          rules: [
            ...(webpackConfig.module?.rules || []),
            {
              test: /\.(png|jpe?g|gif|svg|webp)$/i,
              type: 'asset/resource',
            },
          ],
        },
      },
    },
    specPattern: "**/*.cy.{js,jsx,ts,tsx}",
  },
});
