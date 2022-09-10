import { generateBrowserCompatibleBundle } from './bundleGenerator';
import { Browser } from './browser';

class App {
    public static async start(){
        const browser = await Browser.launch();

        await generateBrowserCompatibleBundle();

        await browser.addScript('./haxball/bundle.js');
    }
}

App.start();