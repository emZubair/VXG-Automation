import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
import * as path from "path";

const environment = "environments/.env";
const envFilePath = path.resolve(__dirname, environment);
console.log(`Loading local config environment: '${environment}' from path: ${envFilePath}`);

dotenv.config({ path: envFilePath });

console.log(`Resolved configuration:, ${process.env.BASE_URL}`);

export default defineConfig({
    testDir: "./src/tests/",
    fullyParallel: false,
    timeout: 300 * 1000,
    workers: 4,
    retries: 1,
    reporter: [
        ["html", { open: false }],
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
        actionTimeout: 30 * 1000,
        navigationTimeout: 30 * 1000,
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
