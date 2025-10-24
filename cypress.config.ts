import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  env: {
    NEXT_PUBLIC_CLIENT_ID: 3,
    NEXT_PUBLIC_API_URL: "http://127.0.0.1:3002",
    NEXT_PUBLIC_API_KEY:
      "3dbae5e1-cb3a1213-c69ee0f9-fd7839db-70d172d9-8f14e690-92106fbc-105b7bcd",
  },
  e2e: {
    //     setupNodeEvents(on, config) {
    //     // You can implement node event listeners here
    //     },
    //     baseUrl: 'http://localhost:3000', // Replace with your app's base URL
    //     specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}', // Path to your test files
    //     // supportFile: 'cypress/support/e2e.js', // Path to your support file
    supportFile: false, // Path to your support file
  },
});
