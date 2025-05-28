import {page, expect} from '@playwright/test'

//variables
const baseURL = 'https://www.saucedemo.com/';
const productPage = 'https://www.saucedemo.com/inventory.html';

//login function
export async function login(page){
    await page.goto(baseURL);
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.waitForTimeout(1000);
    await page.locator('xpath=//*[@id="login-button"]').click();
    await expect(page).toHaveURL(productPage);
} 

//logout function
export async function logout(page) {
    await page.locator('id=react-burger-menu-btn').click();
    await page.getByText('Logout').click();
    await expect(page).toHaveURL(baseURL);
}

//selecting an item
export async function selectItem(page, itemName, para) {
    await page.getByText(itemName).click();
    await expect(page.getByText(para)).toBeVisible();
}

//add a item and confirm adding
export async function addItemToCart(page) {
    await page.locator('id=add-to-cart').click();
    await expect(page.locator('id=remove')).toBeVisible();
}

export async function checkoutFormFilling(page) {
    await page.locator('id=checkout').click();
    await page.locator('id=first-name').fill('Lovern');
    await page.locator('id=last-name').fill('Hene');
    await page.locator('id=postal-code').fill('NS1 7GF');
    await page.locator('id=continue').click();
}