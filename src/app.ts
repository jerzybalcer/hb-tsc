import { generateBrowserCompatibleBundle } from './bundleGenerator';
import { Browser } from './browser';
import * as fileSystem from 'fs';

class App {
    public static async start(){
        const browser = await Browser.launch();

        await App.loadHaxballScript(browser);
        
        fileSystem.watch("./haxball/room/", async () => {
            await browser.refreshPage();
            await App.loadHaxballScript(browser);
        });
    }

    public static async loadHaxballScript(browser: Browser){
        await generateBrowserCompatibleBundle();
        await browser.addScript('./haxball/bundle.js');
    }
}

App.start();