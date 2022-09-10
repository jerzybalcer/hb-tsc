export const generateBrowserCompatibleBundle = async() => {
    const haxballRoomPath = './haxball/room/';
    const browserify = require('browserify')();

    const fileSystem = require('fs');

    fileSystem.readdirSync(haxballRoomPath).forEach(async (file: string) => {
        browserify.add(haxballRoomPath + file);
    });

    const bundleStream = await fileSystem.createWriteStream(__dirname + '/haxball/bundle.js');

    browserify.bundle().pipe(bundleStream);

    return new Promise<void>(resolve => 
        bundleStream.on('finish', async () => {
            resolve();
        })
    );
};

