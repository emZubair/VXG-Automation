import { Locator, Page } from "@playwright/test";
import { Timeout } from "../utils/enums";

export class BasePage {
  protected page: Page;
  private readonly button: string = "[type='button']";

  constructor(page: Page) {
    this.page = page;
  }
  async visit(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: "networkidle" });
  }
  async waitForReadiness(number = Timeout.THREE_SECONDS): Promise<void> {
    return this.page.waitForTimeout(number);
  }
  async pressButton(buttonName: string): Promise<void> {
    await this.page.locator(this.button).filter({ hasText: buttonName }).click({ force: true });
  }
  async waitForPageToLoad(timeout = 30000): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded", { timeout: timeout });
  }
  async waitForVisible(selector: string, timeout = 30000): Promise<void> {
    try {
      await this.page.waitForSelector(selector, { state: "visible", timeout });
    } catch (error) {
      console.log(
        `Failed to find visible element with selector "${selector}" within ${timeout / 1000} seconds`,
      );
      throw error;
    }
  }

  async clickButtonByLocator(
    locator: string,
    forced: boolean = true,
    index: number = 0,
  ): Promise<void> {
    const button = this.page.locator(locator);
    if (forced) {
      await button.nth(index).click({ force: true });
    }
  }
  async getEmelemntByLocator(locator: string): Promise<Locator> {
    return this.page.locator(locator);
  }
  async setValueByLocator(locator: string, value: string, index: number = 0): Promise<void> {
    await (await this.getEmelemntByLocator(locator)).nth(index).fill(value);
  }
  async selectValueFromDropdown(locator: string, value: string, index: number = 0): Promise<void> {
    const dropdown = (await this.getEmelemntByLocator(locator)).nth(index);
    await dropdown.click({ force: true });
    const option = this.page.locator(`text=${value}`);
    await option.click({ force: true });
  }

  async getElement(locator: string): Promise<Locator> {
    return await this.page.locator(locator);
  }

  async getElementText(locator: string, index: number = 0): Promise<string> {
    try {
      const locatorHandle = this.page.locator(locator).nth(index);
      const locatorText = await locatorHandle.textContent();
      return locatorText?.trim() || "";
    } catch (error) {
      // If the locator is not found, return "not-found"
      return "not-found";
    }
  }
  async countCheckboxes(locator: string): Promise<number> {
    const checkboxes = await this.page.$$(locator); // Select all matching elements
    return checkboxes.length; // Return the count
  }

  async isLocatorVisible(locator: string): Promise<boolean> {
    try {
      await this.page.waitForSelector(locator, { state: "visible", timeout: 500 });
      return true;
    } catch (e) {
      return false;
    }
  }
}
