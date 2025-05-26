const { createMainWindow } = require('./windowManager');
const { setupTray } = require('./tray');
const { registerIPCHandlers } = require('./ipcHandlers');
const { initAutoUpdater } = require('./updater');
const { loadUserSettings } = require('./config');
const { BrowserWindow } = require('electron');

function initAppLifecycle(app) {
  const userSettings = loadUserSettings();
  if (userSettings.hardwareAccel === false) {
    app.disableHardwareAcceleration();
  }

  const gotLock = app.requestSingleInstanceLock();
  if (!gotLock) return app.quit();
  
  app.whenReady().then(() => {
    const mainWindow = createMainWindow(userSettings);
    setupTray(mainWindow);
    registerIPCHandlers(mainWindow);
    initAutoUpdater(mainWindow);
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow(userSettings);
    }
  });
}

module.exports = { initAppLifecycle };