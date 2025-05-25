import {test, expect} from '@playwright/test';

//variables
const baseURL = 'https://www.saucedemo.com/';
const productPage = 'https://www.saucedemo.com/inventory.html';
const itemName1 =  'Test.allTheThings() T-Shirt (Red)';
const para1 = 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.';
const itemName2 = 'Sauce Labs Onesie';
const para2 = "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.";

async function selectItem(page, itemName, para) {
    //selecting item 
    await page.getByText(itemName).click();
    await expect(page.getByText(para)).toBeVisible();
}

async function addItemToCart(page) {
    //add a item and confirm adding
    await page.locator('id=add-to-cart').click();
    await expect(page.locator('id=remove')).toBeVisible();
}

//In each test move to the main page
test.beforeEach(async ({ page }) => {
    await page.goto(baseURL)
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('xpath=//*[@id="login-button"]').click();
    await expect(page).toHaveURL(productPage);
});

//After every test
test.afterEach(async ({page})=>{
    await page.locator('id=react-burger-menu-btn').click();
    await page.getByText('Logout').click();
    await expect(page).toHaveURL(baseURL);
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
