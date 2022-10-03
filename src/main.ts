import { create } from 'domain';
import { app, BrowserWindow, Menu } from 'electron';
import electronReload from 'electron-reload';
import * as path from 'path';
import * as url from 'url';
import menuTemplate from './mainMenu';
// track env
const env = process.env.NODE_ENV || 'development';

const createWindow = () => {
  // create browser window
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  // load index.html
  win.loadFile(path.join(__dirname, '../index.html'));
  // open devtools
  win.webContents.openDevTools();
};

// app.on('ready', () => {
//   createWindow();
//   // // build menu from template
//   // const mainMenu = Menu.buildFromTemplate(menuTemplate);
//   // // insert menu
//   // Menu.setApplicationMenu(mainMenu);
// });

// start the app
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
    // build menu from template
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    // insert menu
    Menu.setApplicationMenu(mainMenu);
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

// dev runtime
// if (env === 'development') {
//   require('electron-reload')(__dirname, {
//     electron: path.join(__dirname, '../node_modules', '.bin', 'electron'),
//     hardResetMethod: 'exit',
//   });
// }
