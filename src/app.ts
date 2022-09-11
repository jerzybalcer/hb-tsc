import { generateBrowserCompatibleBundle } from './bundleGenerator';
import { Browser } from './browser';
import watchFilesChange from 'node-watch';

class App {
    public static async start(){
        const browser = await Browser.launch();

        await App.startHaxballServer(browser);

        watchFilesChange("./haxball/room/", { recursive: true }, async () => {
                await browser.refreshPage();
                await App.startHaxballServer(browser);
        });
    }

    public static async loadHaxballScript(browser: Browser){
        await generateBrowserCompatibleBundle();
        await browser.addScript('./haxball/bundle.js');
    }

    public static async startHaxballServer(browser: Browser){
        await App.loadHaxballScript(browser);

        const isTokenValid = await browser.isTokenValid();

        if(isTokenValid) return; 
        
        await browser.obtainNewToken();
        await browser.refreshPage();
        await App.loadHaxballScript(browser);
    }
}

App.start();