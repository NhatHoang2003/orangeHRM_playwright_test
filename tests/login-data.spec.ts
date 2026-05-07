import {expect, test} from '@playwright/test';
import { loginData, readLoginDataFromCSV } from '../utils/csvReader';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Tests with CSV Data', () => {
    let testData: loginData[] = [];

    // Read Csv data before running the tests
    test.beforeAll (async () => {
        testData = await readLoginDataFromCSV();

        console.log("Test data loaded from CSV:", testData);
    });

    // Iterate through the test data and run a test from each row in the CSV file
    test('test login with CSV data', async ({ page }) => {
        for (let data of testData) {
            const loginPage = new LoginPage(page);

            await loginPage.gotoLoginPage();
            
            await loginPage.login(data.username, data.password);

            if (data.expected_result === 'success') {
                await expect(page).toHaveURL(loginPage.dashboardURL);
            } 
            else if (data.expected_result === 'fail') {
                await expect(loginPage.loginErrorMessage).toBeVisible();
                await expect(loginPage.loginErrorMessage).toHaveText('Invalid credentials');
            } 
            else if (data.expected_result === 'empty') {
                if (data.username === '' && data.password === '') {
                    await expect(loginPage.username_errorMessage).toHaveText('Required');
                    await expect(loginPage.password_errorMessage).toHaveText('Required');
                } else if (data.username === '') {
                    await expect(loginPage.username_errorMessage).toHaveText('Required');
                } else if (data.password === '') {
                    await expect(loginPage.password_errorMessage).toHaveText('Required');
                }
            }
        }
    });
});

