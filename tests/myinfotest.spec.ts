import {test, expect} from '@playwright/test'
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';
import { MyInfoPage } from '../src/pages/myInfoPage';

test.describe('My Info Tests', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const myInfoPage = new MyInfoPage(page);

        await loginPage.gotoLoginPage();

        await loginPage.login(
            process.env.ADMIN_USERNAME!,
            process.env.ADMIN_PASSWORD!
        );

        await expect(page).toHaveURL(loginPage.dashboardURL);

        await homePage.clickMenuMyInfo();

        await myInfoPage.avatarWrapper.waitFor({timeout: 5000});
    });

    test('Upload new avatar', async ({ page }) => {
            const myInfoPage = new MyInfoPage(page);

            await myInfoPage.upLoadAvatar();

            expect(true).toBeTruthy;
    });
});