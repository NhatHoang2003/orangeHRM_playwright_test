import {Page, Locator} from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginErrorMessage: Locator;
    readonly username_errorMessage: Locator;
    readonly password_errorMessage: Locator;

    readonly dashboardURL: string = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index';
    readonly loginURL: string = '/web/index.php/auth/login'

    constructor(page: Page) {
        this.page = page;

        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');
        this.loginErrorMessage = page.locator('.oxd-alert-content--error .oxd-alert-content-text');
        this.username_errorMessage = page
            .locator('.oxd-input-group')
            .filter({ has: page.locator('input[name="username"]') })
            .locator('.oxd-input-field-error-message');

        this.password_errorMessage = page
            .locator('.oxd-input-group')
            .filter({ has: page.locator('input[type="password"]') })
            .locator('.oxd-input-field-error-message');
    }

    async gotoLoginPage() {
        await this.page.goto(this.loginURL,{ waitUntil: 'load'});
    }   

    async login(username: string, password: string) {
        
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);

        await this.loginButton.click();
    }
}