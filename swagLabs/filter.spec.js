import {test,expect} from '@playwright/test';
import { login, logout } from './helper';

//variables
const productText = 'Sauce Labs Fleece JacketIt\'s';

//In each test move to the main page
test.beforeEach(async ({ page }) => {
    await login(page);
});

//After every test
test.afterEach(async ({page})=>{
    await logout(page);
});

//Sort Products // Sort by price or name // Validate order of items

test('Filter', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');    
    await page.locator('[data-test="inventory-list"] div').filter({ hasText: productText}).nth(1).click();
    await page.locator('[data-test="item-5-title-link"]').click();
    await expect(page.getByText('Sauce Labs Fleece Jacket')).toBeVisible();
}); 


