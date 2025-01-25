
import { BasePage } from "../basePage";
import { Locator } from "@playwright/test";
import { homeTestData } from "../../testData/home/homeTestData";

export class HomePage extends BasePage {
  readonly getStartedLink: string = ".getStarted_Sjon";
  readonly installationHeading: string = "header h1";
}
