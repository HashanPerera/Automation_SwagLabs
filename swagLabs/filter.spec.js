import {test,expect} from '@playwright/test';

//variables
const baseURL = 'https://www.saucedemo.com/';
const productPage = 'https://www.saucedemo.com/inventory.html';
const productText = 'Sauce Labs Fleece JacketIt\'s';

//In each test move to the main page
test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.locator('id=login-button').click();
        await expect(page).toHaveURL(productPage);
});

//After every test
test.afterEach(async ({page})=>{
    await page.locator('id=react-burger-menu-btn').click();
    await page.getByText('Logout').click();
    await expect(page).toHaveURL(baseURL);
});

//Sort Products // Sort by price or name // Validate order of items

test('Filter', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');    
    await page.locator('[data-test="inventory-list"] div').filter({ hasText: productText}).nth(1).click();
    await page.locator('[data-test="item-5-title-link"]').click();
    await expect(page.getByText('Sauce Labs Fleece Jacket')).toBeVisible();
}); 


