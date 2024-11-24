import { expect, test } from "@playwright/test";

test("When Supply tab is active rendered information is correct", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await page.getByTestId("supply-tab").click();

  const tokenApyTextLocators = await page.getByTestId("token-apy-text").all();

  for (const tokenApyLocator of tokenApyTextLocators) {
    await expect(tokenApyLocator).toContainText("Supply APY");
  }

  await expect(page.getByTestId("token-stTON").getByTestId("token-apy-number")).toContainText("0.25%");
  await expect(page.getByTestId("token-TON").getByTestId("token-apy-number")).toContainText("0.63%");

  await expect(page.getByTestId("profit-button")).toContainText("Supply Now");
});

test("When Borrow tab is active rendered information is correct", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await page.getByTestId("borrow-tab").click();

  const tokenApyLocators = await page.getByTestId("token-apy").all();

  for (const tokenApyLocator of tokenApyLocators) {
    await expect(tokenApyLocator).toContainText("Borrow APY");
  }

  await expect(page.getByTestId("token-stTON").getByTestId("token-apy-number")).toContainText("2.71%");
  await expect(page.getByTestId("token-TON").getByTestId("token-apy-number")).toContainText("3.10%");

  await expect(page.getByTestId("profit-button")).toContainText("Borrow Now");
});

test("When TON token is active rendered information is correct", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await page.getByTestId("supply-tab").click();

  await page.getByTestId("token-TON").getByRole("button", { name: "TON" }).click();

  await expect(page.getByTestId("amount-input")).toHaveAttribute("placeholder", /TON/);
  await expect(page.getByTestId("profit-in-token-name")).toContainText("TON");

  await page.getByTestId("currency-toggle").click();

  await expect(page.getByTestId("currency-equivalent")).toContainText("TON");
});

test("When stTON token is active rendered information is correct", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await page.getByTestId("supply-tab").click();

  await page.getByTestId("token-stTON").getByRole("button", { name: "stTON" }).click();

  await expect(page.getByTestId("amount-input")).toHaveAttribute("placeholder", /stTON/);
  await expect(page.getByTestId("profit-in-token-name")).toContainText("stTON");

  await page.getByTestId("currency-toggle").click();

  await expect(page.getByTestId("currency-equivalent")).toContainText("stTON");
});
