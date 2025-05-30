import { test,expect } from '@playwright/test'

//variables
const filt1 = 'Price ';
const filt2 = 'low to high'
const filter = filt1 + "(" + filt2 + ")";
let para, itemName;
const itemName1 =  'Test.allTheThings() T-Shirt (Red)';
const para1 = 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.';
const itemName2 = 'Sauce Labs Onesie';
const para2 = "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel."

//In each test move to the main page
test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    await login(page);
});

//After every test
test.afterEach(async ({page})=>{
    await page.waitForTimeout(5000);
    await page.locator('id=react-burger-menu-btn').click();
    //await page.waitForTimeout(5000);
    await page.getByText('Logout').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
});

//Login Test - Input username and password, Validate login success or failure

async function login(page){
    await page.getByPlaceholder('Username').fill('standard_user');
    console.log('UserName is filled');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    console.log('Password is filled');
    await page.locator('xpath=//*[@id="login-button"]').click();
    console.log('Logged');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
} 

async function selectItem(page, itemName, para) {
    //selecting item 
    await page.getByText(itemName).click();
    //const para = 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.';
    await expect(page.getByText(para)).toBeVisible();
}

async function addItemToCart(page) {
    await page.locator('id=add-to-cart').click();
    await expect(page.locator('id=remove')).toBeVisible();
}

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
            console.log(1);
        else
        console.log('Missed:', 2);

    
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
        if(await page.locator('[data-test="shopping-cart-badge"]', { hasText: "2" }).isVisible()) 
            console.log(1);
        else
        console.log('Missed:1st if');

    //remove an item
    await page.locator('id=remove-sauce-labs-onesie').click();

    //Check the qunatity of items in cart
        if(await page.locator('[data-test="shopping-cart-badge"]', { hasText: "2" }).isVisible()) 
            console.log(1);
        else
        console.log('Missed:2nd if');
    
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

    if(await page.locator('[data-test="title"]', { hasText: "Checkout: Your Information" }).isVisible()) 
            console.log(1);
        else
        console.log('Missed: if');

    await page.locator('id=first-name').fill('Lovern');
    await page.locator('id=last-name').fill('Hene');
    await page.locator('id=postal-code').fill('NS1 7GF');
    await page.locator('id=continue').click();

    //confirmation page

    if(await page.locator('[data-test="title"]', { hasText: "Checkout: Overview" }).isVisible()) 
            console.log(2);
        else
            console.log('Missed: if');


    if(await page.locator('[data-test="payment-info-label"]', { hasText: "Payment Information:" }).isVisible()){ 
            console.log(3);
            const calculatedValueElement = await page.locator('[data-test="total-label"]');
            const value1 = await calculatedValueElement.textContent();
            console.log(value1);
            console.log('is it');
    }
        else{
            console.log('Missed: if');
    }

    //finish transaction
    await page.locator('id=finish').click();
    //success
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
    await expect(page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there!')).toBeVisible();
    

});

//Sort Products // Sort by price or name // Validate order of items

test('Filter', async ({ page }) => {

    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');    
    await page.locator('[data-test="inventory-list"] div').filter({ hasText: 'Sauce Labs Fleece JacketIt\'s' }).nth(1).click();
    await page.locator('[data-test="item-5-title-link"]').click();
    await expect(page.getByText('Sauce Labs Fleece Jacket')).toBeVisible();
     
   /* value comparing
    const valueElement1 = await page.locator('xpath=//*[@id="inventory_container"]/div/div[1]/div[2]/div[2]/div');
    const value1 = await valueElement1.textContent();


    const valueElement2 = await page.locator('xpath=//*[@id="inventory_container"]/div/div[6]/div[2]/div[2]/div');
    const value2 = await valueElement2.textContent();

    if(value2 > value1)
        console.log(value2);
    else
        console.log(value1); */


}); 

