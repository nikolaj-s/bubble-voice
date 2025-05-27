const { ipcMain, desktopCapturer, shell } = require('electron');
const { setupKeybinds } = require('./keybinds');
let winRef, timeout;
let inactive = false;

function registerIPCHandlers(win) {
  winRef = win;

  ipcMain.handle('SCREEN_SHOT', async () => {
    try {
      const sources = await desktopCapturer.getSources({ types: ['window'], thumbnailSize: { width: 1920, height: 1080 } });
      const source = sources.find(s => !s.name.includes('overlay'));
      return {
        data: source.thumbnail.toJPEG(90),
        preview: source.thumbnail.toDataURL(),
        text: source.name,
      };
    } catch (err) {
      return { error: 'error capturing screen shot' };
    }
  });

  ipcMain.handle('CLEAR_CACHE', async () => {
    try {
      await win.webContents.session.clearCache();
    } catch (err) {
      console.error(err);
    }
  });

  ipcMain.handle('DYNAMIC_STATUS', async () => {
    if (inactive) return [{ id: 'away-status', name: 'Away' }];
    const sources = await desktopCapturer.getSources({ types: ['window'], thumbnailSize: { width: 0, height: 0 } });
    return sources.map(s => ({ id: s.id, name: s.name }));
  });

  ipcMain.handle('GET_SCREEN_SOURCES', async () => {
    const sources = await desktopCapturer.getSources({ types: ['window', 'screen', 'audio'], thumbnailSize: { width: 200, height: 200 }, fetchWindowIcons: true });
    return sources.map(s => ({
      id: s.id,
      name: s.name,
      thumbnail: s.thumbnail.toDataURL(),
      icon: s.appIcon?.toDataURL(),
    }));
  });

  ipcMain.handle("GET_SCREEN_STREAM", async (event, sourceId) => {
    return await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: sourceId,
          maxWidth: 960,      // 540p width (16:9)
          maxHeight: 540,     // 540p height
          maxFrameRate: 30
        }
      }
    });
  });


  ipcMain.on('RESET_INAC_TIMEOUT', (event) => {
    clearTimeout(timeout);
    if (inactive) event.sender.send('now active');
    inactive = false;
    timeout = setTimeout(() => {
      event.sender.send('inactive');
      inactive = true;
    }, 1500000);
  });

  ipcMain.on('download', (event, data) => {
    win.webContents.downloadURL(data.url);
  });

  ipcMain.on('refresh app', () => {
    win.reload();
  });

  ipcMain.on('open-link', async (event, data) => {
    shell.openExternal(data.url);
  });

  ipcMain.on('get_app_ver', (event) => {
    event.sender.send('get_app_ver', { version: require('electron').app.getVersion() });
  });

  ipcMain.on('write-hardware-change', (event, args) => {
    // placeholder to update hardwareAccelToggled in config if needed
  });

  ipcMain.on('WRITE-APP-STARTUP-STATE', (event, args) => {
    // placeholder to update auto-launch preference in config if needed
  });

  ipcMain.on('set-window-id', (event, data) => {
    console.log('Window ID set:', data.id);
  });

  ipcMain.on('push notification', (event, data) => {
    if (!win.isFocused() && data?.type === 'direct_message') {
      win.flashFrame(true);
    }
  });

  ipcMain.on('REG_KEYBINDS', (event, binds) => {
  
    setupKeybinds(event.sender, binds);
  
  });

  const os = require('os');

  // Inside registerIPCHandlers function
  ipcMain.handle('GET_OS', () => {
    const platform = os.platform(); // 'darwin', 'win32', 'linux', etc.
    let osName;

    switch (platform) {
      case 'win32':
        osName = 'Windows';
        break;
      case 'darwin':
        osName = 'macOS';
        break;
      case 'linux':
        osName = 'Linux';
        break;
      default:
        osName = 'Unknown';
    }

    return { platform, name: osName };
  });

  ipcMain.on('max', () => win.maximize());
  ipcMain.on('min', () => win.minimize());
  ipcMain.on('close', () => win.close());
}

module.exports = { registerIPCHandlers };