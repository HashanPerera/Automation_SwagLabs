import {test, expect} from '@playwright/test';
import { get } from 'http';

test('@smoke - Load Playwright Page', async ({page}) =>{
    await page.goto('/');
    await expect(page).toHaveURL('https://playwright.dev/'); 

    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page).toHaveURL(/.*intro/);
});

test('@first - Click Get Started', async({page}) => {
    //Direct to main page
    await page.goto('/');
    //Click the link
    await page.getByRole('link', {name: 'Get started'}).click();
    await expect(page).toHaveTitle('Installation | Playwright');
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