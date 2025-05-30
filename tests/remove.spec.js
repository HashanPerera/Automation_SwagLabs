import {test, expect} from '@playwright/test';
import { login, logout } from '../utils/helper';

//variables
const baseURL = 'https://www.saucedemo.com/';
const productPage = 'https://www.saucedemo.com/inventory.html';

//In each test move to the main page
test.beforeEach(async ({ page }) => {
    await login(page);
});

//After every test
test.afterEach(async ({page})=>{
    await logout(page);
});

//Remove from Cart - Remove item from cart, Check that it's no longer in the cart

test('Remove item from cart', async ({ page }) => {
    //selecting and adding items
    await page.locator('id=add-to-cart-test.allthethings()-t-shirt-(red)').click();
    await page.locator('id=add-to-cart-sauce-labs-onesie').click();
    await page.locator('id=add-to-cart-sauce-labs-bolt-t-shirt').click();
    
    //move to cart page
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.getByText('Your Cart')).toBeVisible();

    //Check the qunatity of items in cart
        if(await page.locator('[data-test="shopping-cart-badge"]', { hasText: "3" }).isVisible()) 
            console.log('Quantity is 3');
        else
        console.log('Quantity is not 3');

    //remove an item
    await page.locator('id=remove-sauce-labs-onesie').click();

    //Check the qunatity of items in cart
        if(await page.locator('[data-test="shopping-cart-badge"]', { hasText: "2" }).isVisible()) 
            console.log('Now, quantity is 2');
        else
        console.log('Now, quantity is not 2');
    
});
