// @ts-check
import { test, expect } from '@playwright/test';

/* test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

}); */

test('login to page', async ({ page }) =>{
  

  await page.goto('https://www.saucedemo.com/');
  await page.locator('//*[@id="user-name"]').fill('standard_user');
  await page.locator('//*[@id="password"]').fill('secret_sauce');
  await page.locator('//*[@id="login-button"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  //await page.getByTestId('user-name').fill('standard_user');
  //await page.getByTestId('password').fill('secret_sauce');
  //await page.getByTestId('login-button').click();


});

