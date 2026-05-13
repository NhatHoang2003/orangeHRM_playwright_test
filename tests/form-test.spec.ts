import { test, expect } from '@playwright/test'
import { FormPage } from '../src/pages/FormPage';

test.describe('Test getByRole with HTML local', () => {
    
    let formPage: FormPage;

    test.beforeEach(async ({ page }) => {
        
        formPage = new FormPage(page);

        await formPage.gotoFormPage();
    });

    test('Enter all fields with valid credential', async () => {
        
        await formPage.enterUsername('odoriko');
        
        await formPage.enterEmail('hoangle8122003@gmail.com');

        await formPage.enterPassword('123456');

        await formPage.selectCountry('Vietnam');

        await formPage.enterMessageTexArea('Tokyo Drift');

        await formPage.checkAcceptPolicy();

        await formPage.checkMaleGender();

        await formPage.clickSubmitBtn();
    });
});