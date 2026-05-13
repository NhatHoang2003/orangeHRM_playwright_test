import { Page, Locator} from '@playwright/test'
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { highlightAndScreenshot } from '../utils/screenshot';

export class FormPage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly countryOption: Locator;
    readonly messageTextArea: Locator;
    readonly acceptPolicy: Locator;
    readonly maleGender: Locator;
    readonly femaleGender: Locator;
    readonly submitBtn: Locator;

    constructor(page: Page) {
        this.page = page;

        this.usernameField = page.getByLabel('Username input field');

        this.emailField = page.getByLabel('Email input field');

        this.passwordField = page.getByLabel('Password input field');

        this.countryOption = page.getByLabel('Country selection');

        this.messageTextArea = page.getByLabel('Message textarea');

        this.acceptPolicy = page.getByRole('checkbox', {
            name: 'Agree to terms checkbox'
        });

        this.maleGender = page.getByRole('radio', {
            name: 'Male gender option',
            exact: true
        });

        this.femaleGender = page.getByRole('radio', {
            name: 'Female gender option'
        });

        this.submitBtn = page.getByRole('button', {
            name: 'Submit'
        });
    };

    async gotoFormPage() {
        const htmlPath = join(__dirname, '..', '..', 'public', 'index.html')

        const htmlContent = readFileSync(htmlPath, 'utf-8');

        await this.page.setContent(htmlContent, {waitUntil: 'domcontentloaded'});
    };

    async enterUsername(username: string) {
        await this.usernameField.fill(username);
        await highlightAndScreenshot(this.page, this.usernameField, 'formtest', 'enter_username');
    };

    async enterEmail(email: string) {
        await this.emailField.fill(email);
        await highlightAndScreenshot(this.page, this.emailField, 'formtest', 'enter_email');
    };
    
    async enterPassword(passwod: string) {
        await this.passwordField.fill(passwod);
        await highlightAndScreenshot(this.page, this.passwordField, 'formtest', 'enter_password');
    };

    async selectCountry(country: string) {
        await this.countryOption.selectOption(country);
        await highlightAndScreenshot(this.page, this.countryOption, 'formtest', 'select_country');
    };

    async enterMessageTexArea(textArea: string) {
        await this.messageTextArea.fill(textArea);
        await highlightAndScreenshot(this.page, this.messageTextArea, 'formtest', 'enter_message_texarea');
    };

    async checkAcceptPolicy() {
        await this.acceptPolicy.check();
        await highlightAndScreenshot(this.page, this.acceptPolicy, 'formtest', 'accept_policy_checked');
   };

    async checkMaleGender() {
        await this.maleGender.check();
        await highlightAndScreenshot(this.page, this.maleGender, 'formtest', 'male_gender_checked');
    };

    async clickSubmitBtn() {
        await this.submitBtn.click();
        await highlightAndScreenshot(this.page, this.submitBtn, 'formtest', 'click_submit_button');
    };
};