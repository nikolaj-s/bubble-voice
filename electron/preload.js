
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel, data) => ipcRenderer.send(channel, data),
    invoke: (channel, data) => ipcRenderer.invoke(channel, data),
    on: (channel, listener) => ipcRenderer.on(channel, listener),
    removeListener: (channel, listener) => ipcRenderer.removeListener(channel, listener),
  }
});

console.log('Pre Load Script running')