import { app, BrowserWindow, Menu } from 'electron';
import menuTemplate from './mainMenu';
import path from 'path';

export default class App {
  // create the main window of the app
  static createWindow = async (port: number): Promise<BrowserWindow> => {
    try {
      // create browser window
      const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          preload: path.join(__dirname, 'preload.js'),
          contextIsolation: true,
        },
      });
      // load index.html
      await win.loadURL(`http://localhost:${port}`);
      return win;
    } catch (err) {
      console.error(err);
    }
  };
  // run the app
  static run = async (port: number) => {
    await app.whenReady();
    this.createWindow(port);

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) this.createWindow(port);
      // build menu from template
      const mainMenu = Menu.buildFromTemplate(menuTemplate);
      // insert menu
      Menu.setApplicationMenu(mainMenu);
      // send sys info to the client
    });
    // quit when all windows are closed
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      } else {
        app.quit();
      }
    });
  };
}
