import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // Set the base URL for all tests
    baseUrl: 'http://localhost:5173/generate',
    // Define a custom port (optional)
    // Set up node event listeners (optional)
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
  },
});
