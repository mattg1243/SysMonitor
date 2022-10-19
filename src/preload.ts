import { ipcRenderer, contextBridge } from 'electron';
import * as os from 'os-utils';

contextBridge.exposeInMainWorld('api', {
  // cpu percentage
  getCpuPercentage: async () => await ipcRenderer.invoke('get-cpu-percentage'),
  // mem percentage
  getMemPercentage: () => ipcRenderer.invoke('get-mem-percentage'),
  // Receive Methods
  getBatData: () => ipcRenderer.invoke('get-bat-data'),
});
