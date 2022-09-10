import * as puppeteer from 'puppeteer';

export class Browser {
    private page: puppeteer.Page;

    private constructor(page: puppeteer.Page){
        this.page = page;
    }

    public static async launch(): Promise<Browser>{
        const browser = await puppeteer.launch({
            headless: false,
            userDataDir: "browser_data",
            args: ['--no-sandbox', '--auto-open-devtools-for-tabs']
        });
    
        const page = await browser.newPage();
        await page.goto('https://www.haxball.com/headless', {waitUntil: 'networkidle2'});

        page.on('console', async message => {
            this.extractErrorFromConsole(message);
        });
    
        page.on('close', () => console.log("Haxball page closed"));

        return new Browser(page);
    }

    public async addScript(path: string){
        await this.page.addScriptTag({path: path});
    }

    private static async extractErrorFromConsole(message: puppeteer.ConsoleMessage){
        const args = message.args()
    
        args.forEach(async (arg) => {
          const val = await arg.jsonValue()

          if (JSON.stringify(val) !== JSON.stringify({}))
          {
            console.log(val)
          } 
          else 
          {
            const { description } = arg.remoteObject()
            console.log(description)
          }
        })
    }
}