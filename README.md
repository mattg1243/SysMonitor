# Introduction

SysMonitor is a very basic system resource monitor application that allows you to check resource usage at a glance. It is written purely in TypeScript and will eventually use the TypeRunner compiler as opposed to the traditional TypeScript compiler for less latency when reading resource information. Electron is used in order to run the transpiled JavaScript in a desktop app-esque environment while React handles the UI. Feel free to file issues, clone the repository and make pull requests if you would like. While the goal of this project is ultimately to make a cool, clean resource monitor, I would also like it to serve as a repository for teaching people about the Electron / React / TypeScript application stack as I believe there is incredible potential for building everything from simple projects like this all the way up to full-fledge enterprise level desktop applications such as Discord, Skype and Spotify (which all use this same stack).

# Dev Workflow

Once you clone this repository and have a complete local copy, run the standard `npm install` from the root directory AND the client directory (as that is where the `package.json` for the React section of this application lives) in order to install the required dependencies. Once that’s done, navigate back to the root directory, open two separate terminal instances and run `npm run devstart` and `cd client/ && npm start` in the other. This will run the Electron and React development servers simultaneously. The `devstart` command used to run Electron enables hot reload so you can view your changes live without restarting the app.

# Flow of Data

### IPC Communication - sending data from Electron to React

Electron’s main thread is what actually executes our compiled JavaScript in a headless Chromium instance. The UI (in this case, generated by React in the virtual DOM which in turn generates an index.html that it can manipulate which finally gets rendered out by Electron) is a completely separate thread. So the issue becomes apparent, how do we send data between these completely separate processes? The answer is IPC (Inter Process Communication). In short, we can tell our Electron “backend” to listen for a message sent from the “frontend” on a specified channel (think basic JavaScript event listeners / pub-sub pattern), define how this event is handled, and then maybe send some data back or perform some operation. This code snippet demonstrates how that’s done to fetch CPU data:

```tsx
// App.tsx

const getCpuPercentage = async () => {
    let cpuData = await window.api.getCpuPercentage();
    setCpuPercentage(cpuData);
    console.log('CPU data from Electron: ' + cpuData);
  };
```

As seen above, you attach your own custom API to the global `window` object. You do this in `preload.ts` that is run when you render out your `index.html` as follows

```tsx
// preload.ts

import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('api', {
  // cpu percentage
  getCpuPercentage: async () => await ipcRenderer.invoke('get-cpu-percentage'),
  // mem percentage
  getMemPercentage: async () => await ipcRenderer.invoke('get-mem-percentage'),
  // battery percentage
  getBatData: () => ipcRenderer.invoke('get-bat-data'),
});
```

```tsx
// main.ts

import { app, BrowserWindow, Menu, ipcMain, ipcRenderer } from 'electron';

const createWindow = () => {
  // create browser window
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // here we tell Electron to give our frontend access to preload.js
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });
  // load index.html
  win.loadURL('http://localhost:3000');
  // open devtools
  win.webContents.openDevTools();
};

// and here we specify how to handle particular events on different channels
ipcMain.handle('get-cpu-percentage', async (e, args) => {
  const result = await new Promise(async (resolve, reject) => {
    resolve(await os.cpu.free());
  });
  // returning a result in this callback sends the value back to the frontend 
  return result;
});
```
