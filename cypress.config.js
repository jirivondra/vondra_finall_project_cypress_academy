const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
    env: {
      frontend: 'https://tegb-frontend-88542200c6db.herokuapp.com',
      backend: 'https://tegb-backend-877a0b063d29.herokuapp.com',
    },
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
  },
});
