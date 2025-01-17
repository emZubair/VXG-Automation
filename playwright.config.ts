import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
import * as path from "path";

const environment = ".env"
const envFilePath = path.resolve(__dirname, ".env");
console.log(`Loading local config environment: '${environment}' from path: ${envFilePath}`);

dotenv.config({ path: envFilePath });

console.log(`Resolved configuration:, ${process.env.BASE_URL}`);

export default defineConfig({
  testDir: "./src/",
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
    headless: false,
    actionTimeout: 30 * 1000,
    navigationTimeout: 30 * 1000,
    geolocation: { latitude: 37.7749, longitude: -122.4194 },
    permissions: ["geolocation", "camera", "microphone"], // Grant permission globally
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
    video: "on",
    screenshot: "on",
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
