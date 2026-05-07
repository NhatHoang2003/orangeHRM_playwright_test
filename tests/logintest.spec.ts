import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('should login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();

    await loginPage.login('Admin', 'admin123');

    await loginPage.waitForDasboard();

    await expect(page).toHaveURL(/dashboard/);
});