import {test, expect} from '@playwright/test';
import { login, logout } from './helper';
import { selectItem, addItemToCart } from './helper';

//variables
const itemName1 =  'Test.allTheThings() T-Shirt (Red)';
const para1 = 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.';
const itemName2 = 'Sauce Labs Onesie';
const para2 = "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.";

//In each test move to the main page
test.beforeEach(async ({ page }) => {
    await login(page);
});

//After every test
test.afterEach(async ({page})=>{
    await logout(page);
}); 

//Add an item to cart from product page
test('Select an item from list and Add to cart', async ({ page }) => {
    //selecting item 
    await selectItem(page, itemName1, para1);
    //add it to cart
    await addItemToCart(page);
});

//Add to Cart - Add an item to cart, Verify the cart counter updates
test('Check the cart', async ({ page }) => {

    //selecting and adding 1st item
    await page.locator('id=add-to-cart-test.allthethings()-t-shirt-(red)').click(); //id 

    //2nd one selecting and adding to cart
    await selectItem(page, itemName2, para2);
    await addItemToCart(page);
    
    //move to cart page
    await page.locator('[data-test="shopping-cart-link"]').click(); //data-test
    await expect(page.getByText('Your Cart')).toBeVisible();

    //Check the qunatity of items in cart
        if(await page.locator('[data-test="shopping-cart-badge"]', { hasText: "2" }).isVisible()) 
            console.log('Item is added to Cart');
        else
        console.log('Item is not added to Cart');
  
});
