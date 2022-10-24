import { ipcMain } from 'electron';
import IPCHandlers from './IPCHandlers';
import App from './App';

// track env
const ENV = process.env.NODE_ENV || 'development';
// get port of React app
const FRONTEND_PORT = parseInt(process.env.PORT) || 3000;
// enable hot reload if in dev env
if (ENV === 'development') {
  const electronReload = require('electron-reload');
  electronReload(__dirname, {});
}

// ipc logic
ipcMain.handle('get-cpu-percentage', IPCHandlers.getCpuData);
ipcMain.handle('get-mem-percentage', IPCHandlers.getMemData);
ipcMain.handle('get-bat-data', IPCHandlers.getBatData);

// build and start the app
App.run(FRONTEND_PORT);
