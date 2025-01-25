import type { Page } from "@playwright/test";
import { test, expect } from "../fixtures/base-fixtures";
import * as allure from "allure-js-commons";
import { HomePage } from "../pageObjects/home/home.po";
import exp from "constants";

let page: Page;
let homePage: HomePage;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  homePage = new HomePage(page);
});

test("Validate get started page is loaded", { tag: ["@smoke"] }, async (): Promise<void> => {
  await allure.tags("smoke");
  await homePage.visit(process.env.BASE_URL);
  await homePage.clickButtonByLocator(homePage.getStartedLink);
  await expect(await homePage.getElement(homePage.installationHeading)).toBeVisible();
});
 