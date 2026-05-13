import {test, expect} from  '@playwright/test'
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';


test.describe("Home Page tests", () => {
    
    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);
        
        await loginPage.gotoLoginPage()

        await loginPage.login(
            process.env.ADMIN_USERNAME!,
            process.env.ADMIN_PASSWORD!
        );

        await expect(page).toHaveURL(loginPage.dashboardURL);
    });

    test('Verify menu items has already existed', async ({ page }) => {
        const homePage = new HomePage(page);

        const menuItems = await homePage.getSidebarMenuItems();

        expect(menuItems.length).toEqual(12);
    });
});