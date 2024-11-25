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

test("When stTON token is active rendered information is correct", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await page.getByTestId("token-stTON").getByRole("button", { name: "stTON" }).click();
  await page.getByTestId("amount-input").fill("");
  await page.getByTestId("supply-tab").click();

  await expect(page.getByTestId("amount-input")).toHaveAttribute("placeholder", "0.00 stTON");
  await expect(page.getByTestId("ammount-currency")).toBeHidden();
  await expect(page.getByTestId("currency-toggle").getByText("USD")).toBeVisible();
  await expect(page.getByTestId("currency-equivalent")).toContainText("~$0");
  await expect(page.getByTestId("profit-in-token-name")).toContainText("stTON");

  await page.getByTestId("currency-toggle").click();

  await expect(page.getByTestId("amount-input")).toHaveAttribute("placeholder", "$0.00");
  await expect(page.getByTestId("ammount-currency")).toBeHidden();
  await expect(page.getByTestId("currency-toggle").getByText("stTON")).toBeVisible();
  await expect(page.getByTestId("currency-equivalent")).toContainText("~0 stTON");
  await expect(page.getByTestId("profit-in-token-name")).toContainText("stTON");

  await page.getByTestId("currency-toggle").click();

  await page.getByTestId("amount-input").fill("100");
  await expect(page.getByTestId("ammount-currency")).toContainText("stTON");

  await page.getByTestId("currency-toggle").click();
  await expect(page.getByTestId("ammount-currency")).toContainText("USD");
});

test("When TON token is active and Supply tab is active calculations are correct", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await page.getByTestId("supply-tab").click();
  await page.getByTestId("token-TON").getByRole("button", { name: "TON" }).click();
  await page.getByTestId("amount-input").fill("");

  await expect(page.getByTestId("amount-input")).toHaveAttribute("placeholder", /0.00 TON/);
  await expect(page.getByTestId("amount-input")).toHaveValue("");
  await expect(page.getByTestId("currency-equivalent")).toContainText("~$0");
  await expect(page.getByTestId("profit-in-token-amount")).toContainText("0");
  await expect(page.getByTestId("profit-in-usd")).toContainText("~$0");

  await page.getByTestId("amount-input").fill("100");

  await expect(page.getByTestId("amount-input")).toHaveValue("100");
  await expect(page.getByTestId("currency-equivalent")).toContainText("~$505.27");
  await expect(page.getByTestId("profit-in-token-amount")).toContainText("100.05");
  await expect(page.getByTestId("profit-in-usd")).toContainText("~$505.54");

  await page.getByTestId("currency-toggle").click();

  await expect(page.getByTestId("amount-input")).toHaveValue("505.27");
  await expect(page.getByTestId("currency-equivalent")).toContainText("~100 TON");
  await expect(page.getByTestId("profit-in-token-amount")).toContainText("100.05");
  await expect(page.getByTestId("profit-in-usd")).toContainText("~$505.54");
});
