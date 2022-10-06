import { ipcRenderer, contextBridge } from 'electron';
import * as os from 'os-utils';

contextBridge.exposeInMainWorld('api', {
  // cpu percentage
  getCpuPercentage: async () => await ipcRenderer.invoke('get-cpu-percentage'),
  // mem percentage
  getMemPercentage: (args) => ipcRenderer.invoke('get-mem-percentage', args),
  // Receive Methods
  getBatData: (args) => ipcRenderer.invoke('get-bat-data', args),
});
