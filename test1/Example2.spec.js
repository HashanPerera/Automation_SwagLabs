import {test, expect } from '@playwright/test'
import { HomePage } from '../Pages/Home-page';

//AAA
//POM   
const URL = 'https://playwright.dev/';
let homePage;

test.beforeEach(async ({page}) =>{
    await page.goto(URL);
    //await expect(page).toHaveURL('https://playwright.dev/'); 
    homePage = new HomePage(page);
});

async function ClickGetStarted(page) {
    //await page.getByRole('link', { name: 'Get started' }).click();
    await homePage.getStarted();
    await expect(page).toHaveTitle('Installation | Playwright');
}

test.describe('Playwright Website', ()=>{

    test('Have a title', async () => {
        await homePage.pageTitle();
    });

    test('@smoke - Click Get Started', async ({page}) =>{
        await ClickGetStarted(page);
        await expect(page).toHaveURL(/.*intro/);
    });
    
    test('@first - Select Java', async({page}) => {
        //Click the link
        await ClickGetStarted(page);    
        //Hover the menu
        //await page.getByRole('link', { name: 'Java', exact: true }).click();
        await page.locator('//*[@id="__docusaurus"]/nav/div[1]/div[1]/div/a').hover();
        //Select java from menu
        await page.getByText('Java', {exact:true}).click();
        await expect(page).toHaveTitle('Installation | Playwright Java');
        //Check the paragraph
        const para ='Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project\'s pom.xml as described below. If you\'re not familiar with Maven please refer to its documentation.';
        await expect(page.getByText(para)).toBeVisible();
    
    });    

});

