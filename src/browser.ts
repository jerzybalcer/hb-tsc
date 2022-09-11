import * as puppeteer from 'puppeteer';

export class Browser {
    private page: puppeteer.Page;
    private browser: puppeteer.Browser;

    private static readonly headlessUrl = 'https://www.haxball.com/headless';
    private static readonly obtainTokenUrl = 'https://www.haxball.com/headlesstoken';

    private constructor(page: puppeteer.Page, browser: puppeteer.Browser){
        this.page = page;
        this.browser = browser;
    }

    public static async launch(): Promise<Browser>{
        const browser = await puppeteer.launch({
            headless: false,
            userDataDir: "browser_data",
            args: ['--no-sandbox', '--auto-open-devtools-for-tabs']
        });
    
        const page = (await browser.pages())[0];
        await page.goto(this.headlessUrl, {waitUntil: 'networkidle2'});

        page.on('console', async message => {
            Browser.extractErrorFromConsole(message);
        });

        return new Browser(page, browser);
    }

    public async addScript(path: string){
        await this.page.addScriptTag({path: path});
        await this.page.waitForNetworkIdle();
    }

    public async refreshPage(){
        await this.page.reload({waitUntil: 'networkidle2'});
    }

    public async isTokenValid(): Promise<boolean>{

        const iframeElement = await this.page.$('iframe');
        const frame = await iframeElement?.contentFrame();
        const captchaElement = await frame?.$("div[id='recaptcha']");
        const isCaptcha = await captchaElement!.evaluate(el => el.childElementCount) > 0;
        return !isCaptcha;
    }

    public async obtainNewToken(){
        const captchaPage = await this.browser.newPage();
        await captchaPage.goto(Browser.obtainTokenUrl, {waitUntil: 'networkidle2'});
        await captchaPage.waitForNavigation({timeout: 0});

        const responseElement = await captchaPage.$('pre');
        const responseElementText = await responseElement!.evaluate(el => el.innerText)
        const token = responseElementText.substring(17, responseElementText.length - 1);

        await this.page.evaluate((token) => localStorage.setItem('headlessToken', token), token);

        await captchaPage.close();
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