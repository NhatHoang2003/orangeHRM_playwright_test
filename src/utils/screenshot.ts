import { Locator, Page } from '@playwright/test';
import { mkdirSync } from 'fs';
import { join } from 'path';

export async function highlightAndScreenshot(
    page: Page,
    locator: Locator,
    testName: string,
    stepName: string,
): Promise<void> {

    const folderName = testName.toLowerCase();

    const screenshotDir = join(__dirname, '..', '..', 'screenshot', folderName);

    mkdirSync(screenshotDir, { recursive: true });

    await page.evaluate(() => {

        document.querySelectorAll('*').forEach((el) => {

            const element = el as HTMLElement;

            if (element.dataset.highlighted === 'true') {

                element.style.border = '';
                element.style.backgroundColor = '';
                element.style.color = '';

                delete element.dataset.highlighted;
            }
        });
    });

    await page.waitForTimeout(100);

    await locator.scrollIntoViewIfNeeded();

    await locator.evaluate((el) => {

        const element = el as HTMLElement;

        element.dataset.highlighted = 'true';

        element.style.border = '2px solid red';
        element.style.backgroundColor = 'yellow';
        element.style.color = 'black';
    });

    await page.waitForTimeout(300);

    const filePath = join(screenshotDir, `${stepName}.png`);

    await page.screenshot({path: filePath, fullPage: false, animations: 'disabled'});
}