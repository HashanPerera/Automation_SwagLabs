import { test,expect } from '@playwright/test';
import { checkoutFormFilling, login, logout } from './helper';

//variables
const thankYou = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!';

//In each test move to the main page
test.beforeEach(async ({ page }) => {
    await login(page);
});

//After every test
test.afterEach(async ({page})=>{
    await logout(page);
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
    await checkoutFormFilling(page);

    //finish transaction
    await page.locator('id=finish').click();

    //success
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
    await expect(page.getByText(thankYou)).toBeVisible();

});

