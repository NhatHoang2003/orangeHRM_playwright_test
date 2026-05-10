import {Locator, Page} from '@playwright/test';
import { mkdirSync } from 'fs';
import { join } from 'path';

export async function highlightAndScreenshoot(
    page: Page,
    locator: Locator,
    testName: String,
    stepName: String,
) : Promise<void>{
    
    const folderName = testName.toLowerCase();

    const screenshotDir = join(__dirname, '..', '..', 'screenshot', folderName);

    mkdirSync(screenshotDir, { recursive: true});

    await locator.evaluate((elm) => {
        (elm as HTMLElement).style.border = '2px solid red',
        (elm as HTMLElement).style.backgroundColor = 'yellow',
        (elm as HTMLElement).style.color = 'black'
    });

    await page.waitForTimeout(1000);

    const filePath = join(screenshotDir, `${stepName}.png`);
    await page.screenshot({ path: filePath, fullPage: true});
};