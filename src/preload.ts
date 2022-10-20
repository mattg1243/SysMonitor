import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('api', {
  // cpu percentage
  getCpuPercentage: async () => await ipcRenderer.invoke('get-cpu-percentage'),
  // mem percentage
  getMemPercentage: async () => await ipcRenderer.invoke('get-mem-percentage'),
  // Receive Methods
  getBatData: async () => await ipcRenderer.invoke('get-bat-data'),
});
