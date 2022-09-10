import * as puppeteer from 'puppeteer';

const launch = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        userDataDir: "browser_data",
        args: ['--no-sandbox']
    });

    const page = await browser.newPage();
    await page.goto('https://www.haxball.com/headless', {waitUntil: 'networkidle2'});

    const haxballRoomPath = './haxball/room/';
    const browserify = require('browserify')();

    const fileSystem = require('fs');

    fileSystem.readdirSync(haxballRoomPath).forEach(async (file: string) => {
        browserify.add(haxballRoomPath + file);
    });

    var bundleStream = await fileSystem.createWriteStream(__dirname + '/haxball/bundle.js');

    browserify.bundle().pipe(bundleStream);

    bundleStream.on('finish', async () => {
        await page.addScriptTag({path: './haxball/bundle.js'});
    });

    page.on('close', ()=>{console.log("Haxball page closed")});
};

launch();