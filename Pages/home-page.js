import { expect, Locator, Page } from '@playwright/test';

export class HomePage{
    //Constructor
    constructor(Page){
        this.Page = Page;
        this.getStartedButton = Page.getByRole('link', { name: 'Get started' })
        this.title = 'Fast and reliable end-to-end testing for modern web apps | Playwright';
    }
    //method
    async getStarted(){
        await this.getStartedButton.click();
    }

    async pageTitle(){
        await expect(this.Page).toHaveTitle(this.title);
    }

}