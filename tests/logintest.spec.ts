import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test('should login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();

    await loginPage.login(
        process.env.ADMIN_USERNAME!,
        process.env.ADMIN_PASSWORD!
    );

    await expect(page).toHaveURL(loginPage.dashboardURL);
});

test('should show error message on invalid login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();

    await loginPage.login('Admin', 'wrongpassword');

    await expect(loginPage.loginErrorMessage).toBeVisible();

    await expect(loginPage.loginErrorMessage).toHaveText('Invalid credentials');
});

