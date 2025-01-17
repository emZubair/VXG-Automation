import type { Page } from "@playwright/test";
import { LoginPage } from "../pageObjects/loginPage/login.po";
import { expect, test } from "../fixtures/base-fixtures";
import * as allure from "allure-js-commons";
import { HomePage } from "../pageObjects/home/home.po";

let page: Page;
let homePage: HomePage;
let loginPage: LoginPage;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  await loginPage.visit(process.env.BASE_URL);

  await Promise.all([expect(await loginPage.getLogo()).toBeVisible()]);
});

test("Validate user is able to login", { tag: ["@smoke"] }, async (): Promise<void> => {
  await allure.tags("smoke");
  await loginPage.clickSignIn();
  await loginPage.enterEmail(process.env.SYSTEM_USERNAME);
  await loginPage.clickButtonByLocator(loginPage.emailContinueButton);
  await loginPage.enterPassword(process.env.SYSTEM_PASSWORD);
  await loginPage.clickButtonByLocator(loginPage.passwordContinueButton);
  await loginPage.clickButtonByLocator(loginPage.linkRefuseButton, false);
  await homePage.verifyPageIsLoaded();
});
