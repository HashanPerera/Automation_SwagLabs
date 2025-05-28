import { test, expect } from '@playwright/test';
import { login, logout } from './helper';

//Login Test - Input username and password, Validate login success or failure
test('Login and Logout', async ({ page }) => {
    await login(page);
    await logout(page);
});
 