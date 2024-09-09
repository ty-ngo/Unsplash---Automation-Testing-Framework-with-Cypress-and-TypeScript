const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");
const { removeDirectory } = require('cypress-delete-downloads-folder');

module.exports = defineConfig({
    watchForFileChanges: false,
    e2e: {
        setupNodeEvents(on, config) {
            allureCypress(on, {
                resultsDir: "./allure-results",
            });
            on('task', { removeDirectory });
        },
        baseUrl: 'https://unsplash.com',
        specPattern: 'cypress/e2e/**/*.cy.ts'
    }
});