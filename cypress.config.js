const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1400,
  viewportHeight: 900,
  chromeWebSecurity: false,
  defaultCommandTimeout: 60000,
  pageLoadTimeout: 80000,
  video: true,
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/reports/screenshots',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/html',
    reportFilename: 'report',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    overwrite: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'https://automationexercise.com',
    specPattern: 'cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
    excludeSpecPattern: '**/PageObjects/*',
  },
});
