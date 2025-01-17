import { BasePage } from "../basePage";
import { Locator } from "@playwright/test";

export class LoginPage extends BasePage {
  private readonly logo: string = "logo";
  private readonly emailInputField: string = "[id='username']";
  private readonly passwordInputField: string = "[id='password']";
  private readonly singInButton: string = "role=button[name='Sign In']";
  readonly emailContinueButton: string = "button._button-login-id";
  readonly passwordContinueButton: string = "button._button-login-password";
  readonly linkRefuseButton: string = "button._link-refuse-add-device";
  public readonly errorMessage: string = "#error-element-password";
  public readonly companyName: string = '[name="companyName"]';
  public readonly adminEmail: string = '[name="adminEmail"]';
  public readonly submitBtn: string = '[type="submit"]';
  public readonly submitStatus: string = "h4";
  public readonly mailText: string = ".table-striped tr:first-child td:nth-child(2)";
  public readonly mailTime: string = ".table-striped tr:first-child td:nth-child(4)";
  public readonly mailCheckbox: string = ".checkbox-label";
  public readonly deleteButton: string = '[aria-label="Delete Button"]';

  async getLogo(): Promise<Locator> {
    return this.page.getByAltText(this.logo).nth(1);
  }
  async enterEmail(Email: string): Promise<void> {
    const email = this.page.locator(this.emailInputField);
    await email.fill(Email);
  }
  async enterPassword(Password: string): Promise<void> {
    const email = this.page.locator(this.passwordInputField);
    await email.fill(Password);
  }
  async clickSignIn(): Promise<void> {
    await this.page.locator(this.singInButton).click({ force: true });
  }
  async login(username: string, password: string): Promise<void> {
    await this.clickSignIn();
    await this.enterEmail(username);
    await this.clickButtonByLocator(this.emailContinueButton);
    await this.enterPassword(password);
    await this.clickButtonByLocator(this.passwordContinueButton);
    await this.clickButtonByLocator(this.linkRefuseButton, false);
  }
}
