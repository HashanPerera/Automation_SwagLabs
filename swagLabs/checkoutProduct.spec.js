import { test,expect } from '@playwright/test';

//variables
const baseURL = 'https://www.saucedemo.com/';

//In each test move to the main page
test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('xpath=//*[@id="login-button"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

//After every test
test.afterEach(async ({page})=>{
    await page.locator('id=react-burger-menu-btn').click();
    await page.getByText('Logout').click();
    await expect(page).toHaveURL(baseURL);
});

//Checkout Flow - Add item → Go to cart → Checkout, Enter user info → Complete purchase, Assert thank-you message is shown

test('Checkout', async ({ page }) => {

    //selecting and adding items
    await page.locator('id=add-to-cart-test.allthethings()-t-shirt-(red)').click();
    await page.locator('id=add-to-cart-sauce-labs-onesie').click();

    //move to cart page
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.getByText('Your Cart')).toBeVisible();

    //checkouting
    await page.locator('id=checkout').click();
    await page.locator('id=first-name').fill('Lovern');
    await page.locator('id=last-name').fill('Hene');
    await page.locator('id=postal-code').fill('NS1 7GF');
    await page.locator('id=continue').click();

    //finish transaction
    await page.locator('id=finish').click();

    //success
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
    await expect(page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there!')).toBeVisible();

});

