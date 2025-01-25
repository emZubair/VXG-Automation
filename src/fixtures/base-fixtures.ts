import { test as base } from "@playwright/test";

interface BaseFixture {

}

export const test = base.extend<BaseFixture>({
});

export { expect } from "@playwright/test";
