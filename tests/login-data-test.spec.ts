import {expect, test} from '@playwright/test';
import { loginData, readLoginDataFromCSV } from '../src/utils/csvReader';
import { LoginPage } from '../src/pages/LoginPage';
import { expectedResult } from '../src/constants/loginExpected.enum';

const testData: loginData[] = readLoginDataFromCSV();

console.log('Loaded data from CSV file', testData.length)

test.describe('Login Tests with CSV Data', () => {
    for (const data of testData) {
        test(`${data.description}`, async ({ page }) => {
            const loginPage = new LoginPage(page);

            await loginPage.gotoLoginPage();

            await loginPage.login(data.username, data.password);

            if (data.expected_result === expectedResult.SUCCESS) {

                await expect(page).toHaveURL(loginPage.dashboardURL);

            } else if (data.expected_result === expectedResult.FAIL) {
            
                await expect(loginPage.loginErrorMessage).toBeVisible();
            
            } else if (data.expected_result === expectedResult.EMPTY) {
            
                if (data.username === '' && data.password === '') {
                
                    await expect(loginPage.username_errorMessage && loginPage.password_errorMessage).toBeVisible();
                
                } else if (data.username === '') {
                
                    await expect(loginPage.username_errorMessage).toBeVisible();
                
                } else if (data.password === '') {
                
                    await expect(loginPage.password_errorMessage).toBeVisible();

                };
            };
        });
    };
});

