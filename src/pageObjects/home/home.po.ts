import { Locator } from "playwright/test";
import { Timeout } from "../../utils/enums";
import { BasePage } from "../basePage";

export class HomePage extends BasePage {
  protected readonly dashboardNavBtn: string = "text=Dashboard";
  protected readonly projectNavBtn: string = 'a:has-text("Projects")';
  public readonly userManagementNavBtn: string = 'a:has-text("User Management")';
  public readonly settingsNavBtn: string = 'a:has-text("Settings")';
  protected readonly addProjectBtn: string = ".MuiGrid-item";
  protected readonly projectCountText: string = 'a:has-text("Projects") p';

  async verifyPageIsLoaded(): Promise<void> {
    const dashboardBtn = this.page.locator(this.dashboardNavBtn);
    await dashboardBtn.waitFor({ state: "visible", timeout: Timeout.THIRTY_SECONDS });
  }
  async getProjectCount(): Promise<number> {
    const countText = await this.page.locator(this.projectCountText).textContent();
    return parseInt(countText?.trim() || "0", 10);
  }
  async getDashboardNavBtn(): Promise<Locator> {
    return this.page.locator(this.dashboardNavBtn);
  }
  async getProjectsBtn(): Promise<Locator> {
    return this.page.locator(this.projectNavBtn);
  }
  async getAddProjectBtn(): Promise<Locator> {
    return this.page.locator(this.addProjectBtn);
  }
  async clickDashboardNavBtn(): Promise<void> {
    await (await this.getDashboardNavBtn()).click({ force: true });
  }
  async clickProjectBtn(): Promise<void> {
    await (await this.getProjectsBtn()).click({ force: true });
  }
  async clickAddProjectBtn(): Promise<void> {
    await (await this.getAddProjectBtn()).nth(2).click({ force: true });
  }
  async reloadPage(): Promise<void> {
    await this.page.reload({ waitUntil: "networkidle" });
  }
}
