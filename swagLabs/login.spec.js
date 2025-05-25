import { test, expect } from '@playwright/test';

//variables
const baseURL = 'https://www.saucedemo.com/';
const productPage = 'https://www.saucedemo.com/inventory.html';

//login function
async function login(page){
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.waitForTimeout(1000);
    await page.locator('xpath=//*[@id="login-button"]').click();
    await expect(page).toHaveURL(productPage);
} 

//logout function
async function logout(page) {
    await page.locator('id=react-burger-menu-btn').click();
    await page.getByText('Logout').click();
    await expect(page).toHaveURL(baseURL);
}

//Login Test - Input username and password, Validate login success or failure
test('Login and Logout', async ({ page }) => {
    await page.goto(baseURL);
    await login(page);
    await logout(page);
});