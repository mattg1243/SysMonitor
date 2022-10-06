import { app, BrowserWindow, Menu, ipcMain, ipcRenderer } from 'electron';
import * as os from 'node-os-utils';
import * as si from 'systeminformation';
import * as path from 'path';
import menuTemplate from './mainMenu';
import { resolve } from 'path';
// track env
const env = process.env.NODE_ENV || 'development';

const createWindow = () => {
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
  win.loadURL('http://localhost:3000');
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

// ipc logic
ipcMain.handle('get-cpu-percentage', async (e, args) => {
  const result = await new Promise(async (resolve, reject) => {
    resolve(await os.cpu.free());
  });
  return result;
});

ipcMain.handle('get-mem-percentage', async (e, args) => {
  const result = await new Promise(async (resolve, reject) => {
    console.log('free mem: ' + (await os.mem.free()).freeMemMb / 1000 + ' GB');
    resolve((await os.mem.free()).freeMemMb);
  });
  return result;
});

ipcMain.handle('get-bat-data', async (e, args) => {});
// ipcMain.on('get-cpu-percentage', (e, args) => {
//   os.cpuUsage(v => {
//     e.returnValue(v);
//   })
// })

// start the app
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
    // build menu from template
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    // insert menu
    Menu.setApplicationMenu(mainMenu);
    // send sys info to the client
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
