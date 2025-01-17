import { test as base } from "@playwright/test";
import { LoginPage } from "../pageObjects/loginPage/login.po";

interface BaseFixture {
  loginPage: LoginPage;
}

export const test = base.extend<BaseFixture>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect } from "@playwright/test";

