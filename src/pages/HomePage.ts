import {Page, Locator} from '@playwright/test'
import { sideBarMenu } from '../constants/sidebarMenu.eum';
import { highlightAndScreenshot } from '../utils/screenshot';
import { MyInfoPage } from './myInfoPage';

export class HomePage {
    readonly page: Page;

    readonly sidebarMenuItems: Locator;
    readonly sidebarMenuNames: Locator;

    constructor(page : Page) {
        this.page = page;

        this.sidebarMenuItems = page.locator(".oxd-main-menu-item-wrapper a.oxd-main-menu-item");
        this.sidebarMenuNames = page.locator(".oxd-main-menu-item-wrapper span.oxd-main-menu-item--name");
    };

    async getSidebarMenuItems () : Promise<String[]> {

        await this.sidebarMenuItems.first().waitFor();
        
        const count  = await this.sidebarMenuItems.count();

        console.log("Total menu items:", count);

        const menuNames: string[] = [];

        for (let i = 0; i < count; i++) {
            
            const name = await this.sidebarMenuItems.nth(i).textContent();

            // Because TS suspect variable is null value => that why have to add if condition
            if (name) {
                menuNames.push(name);
            };
        }

        return menuNames;
    };


    // *--- ADMIN SESSION ---* // 



    // *--- MY INFO SESSION ---* // 
    async clickMenuMyInfo(): Promise<void> {

    const myInfoMenu = this.page.getByRole('link', {
        name: sideBarMenu.MY_INFO
    });

    await highlightAndScreenshot(
        this.page,
        myInfoMenu,
        '',
        'click_My_Info'
    );

    await myInfoMenu.click();
}
};