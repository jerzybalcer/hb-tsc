import * as fileSystem from 'fs';
import browserify from 'browserify';

export const generateBrowserCompatibleBundle = async() => {
    const haxballRoomPath = './haxball/room/';

    const browserifyObject = new browserify();

    fileSystem.readdirSync(haxballRoomPath).forEach(async (file: string) => {
        browserifyObject.add(haxballRoomPath + file);
    });

    const bundleStream = fileSystem.createWriteStream(__dirname + '/haxball/bundle.js');

    browserifyObject.bundle().pipe(bundleStream);

    return new Promise<void>(resolve => 
        bundleStream.on('finish', async () => {
            resolve();
        })
    );
};

