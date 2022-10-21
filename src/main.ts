import { app, BrowserWindow, Menu, ipcMain, ipcRenderer } from 'electron';
import * as os from 'node-os-utils';
import * as si from 'systeminformation';
import * as path from 'path';
import menuTemplate from './mainMenu';
import electronReload from 'electron-reload';
electronReload(__dirname, {});
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

// ipc logic
ipcMain.handle('get-cpu-percentage', async (e, args) => {
  try {
    const result = await new Promise(async (resolve, reject) => {
      resolve(await os.cpu.free());
    });
    return result;
  } catch (err) {
    console.error(err.message);
  }
});

ipcMain.handle('get-mem-percentage', async (e, args) => {
  try {
    const result = await new Promise(async (resolve, reject) => {
      // console.log('free mem: ' + (await os.mem.free()).freeMemMb / 1000 + ' GB');
      resolve((100 * (await os.mem.free()).freeMemMb) / (await os.mem.free()).totalMemMb);
    });
    return result;
  } catch (err) {
    console.error(err.message);
  }
});

ipcMain.handle('get-bat-data', async (e, args) => {
  try {
    const result = await new Promise(async (resolve, reject) => {
      si.battery((v) => {
        resolve(v.percent.toFixed(2));
      });
    });
    return result;
  } catch (err) {
    console.error(err.message);
  }
});

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
