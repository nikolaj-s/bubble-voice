const { autoUpdater } = require('electron-updater');
const { ipcMain } = require('electron');

function initAutoUpdater(win) {
  ipcMain.on('check-for-updates', () => {
    autoUpdater.checkForUpdatesAndNotify().catch(console.error);
  });

  ipcMain.on('restart-to-update', () => {
    autoUpdater.quitAndInstall();
  });

  autoUpdater.on('update-downloaded', () => {
    win.webContents.send('update-available');
  });

  autoUpdater.on('update-not-available', () => {
    win.webContents.send("update not available");
  });

  autoUpdater.on('error', (err) => {
    win.webContents.send("error updating", { error: err });
  });
}

module.exports = { initAutoUpdater };