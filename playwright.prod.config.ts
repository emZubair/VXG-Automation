import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
import * as path from "path";


const environment = "environments/.env";
const envFilePath = path.resolve(__dirname, environment);
console.log(`Loading pipline config environment: '${environment}' from path: ${envFilePath}`);

dotenv.config({ path: envFilePath });

console.log("Resolved configuration:", {
  headless: true,
  baseURL: process.env.BASE_URL,
});

export default defineConfig({
  testDir: "./e2e/tests/",
  fullyParallel: false,
  timeout: 300 * 1000,
  workers: 1,
  retries: 0,
  reporter: [
    ["html", { open: "never" }],
    [
      "allure-playwright",
      {
        detail: true,
        outputFolder: "allure-results",
        suiteTitle: false,
      },
    ],
  ],
  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    actionTimeout: 30 * 1000,
    navigationTimeout: 30 * 1000,
    geolocation: { latitude: 37.7749, longitude: -122.4194 },
    permissions: ["geolocation", "camera", "microphone"], // Grant permission globally
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
    video: "off",
    screenshot: "only-on-failure",
    contextOptions: {
      recordVideo: {
        dir: "./test-results/",
      },
    },
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
