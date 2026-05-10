import {Page, Locator} from '@playwright/test'
import { join } from 'node:path';

export class MyInfoPage {
    readonly page: Page;

    readonly avatarWrapper: Locator;
    readonly uploadBtn: Locator;
    readonly fileInput: Locator;

    constructor(page : Page) {
        this.page=page;

        this.avatarWrapper = page.locator(".orangehrm-edit-employee-image");
        this.uploadBtn = page.locator("button.employee-image-action");
        this.fileInput = page.locator("input[type='file']");
    }

    async upLoadAvatar() : Promise<void> {

        await this.avatarWrapper.waitFor({ state: 'visible', timeout: 5000});
        await this.avatarWrapper.click();
        await this.page.waitForTimeout(2000);
        
        await this.uploadBtn.waitFor({ state: 'visible', timeout: 5000});
        await this.uploadBtn.click();
        await this.page.waitForTimeout(2000);

        await this.fileInput.waitFor({ state: 'attached', timeout: 5000});
        const filePath = join(__dirname, '..', '..', 'data', 'picture', 'image_1.jpg');
        await this.fileInput.setInputFiles(filePath);
        await this.page.waitForTimeout(3000);
    };
};