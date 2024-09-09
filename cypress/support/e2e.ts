/// <reference types="cypress" />

import '@cypress/xpath';
import "cypress-real-events";
require('cypress-delete-downloads-folder').addCustomCommand();

Cypress.on('uncaught:exception', (err: Error, runnable: Mocha.Runnable) => {
    return false;
});