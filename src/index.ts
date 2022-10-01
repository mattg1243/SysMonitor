import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

const createWindow = () => {
    // create browser window
    const win = new BrowserWindow({ width: 800, height: 600 });
    // load index.html
    win.loadFile(path.join(__dirname, './static/index.html'));
    // open devtools
    win.webContents.openDevTools();
};

// start the app
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// quit when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    } else {
        app.quit();
    }
});
