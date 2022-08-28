
const { app, BrowserWindow, ipcMain, desktopCapturer, screen, globalShortcut } = require('electron')

const { autoUpdater } = require('electron-updater')

const url = require('url')

const path = require('path')

let win;

let transparent;

function createWindow () {

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file',
    slashes: true
  })

  // Create the browser window.
  win = new BrowserWindow({
    minWidth: 800,
    minHeight: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + "/preload.js",
      contextIsolation: false,
    },
    titleBarStyle: 'hidden',
    frame: false
  })
  
  const mainScreen = screen.getPrimaryDisplay();

  transparent = new BrowserWindow({
    width: mainScreen.size.width,
    height: mainScreen.size.height,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    icon: __dirname + '/logo.png'
  })

  transparent.setIgnoreMouseEvents(true);

  transparent.setFocusable(false);

  //load the index.html from a url
  win.loadURL(startUrl);

  // Open the DevTools.
  process.env.ELECTRON_START_URL ? win.webContents.openDevTools() : null

  ipcMain.on('max', () => {
    if (win.maximized) {
      win.reset();
    } else {
      win.maximize();
    }
    
  })
  
  ipcMain.on('close', () => {
    console.log('closing')
    win.close();
    transparent.close();
  })
  
  ipcMain.on('min', () => {
    win.minimize();
  })
  
  win.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  })
}

ipcMain.handle('GET_SOURCES', async () => {
  const captures = await desktopCapturer.getSources({ types: ['window', 'screen', 'audio']})
  .then(async sources => {
      const screens = [];
      
      for (const source of sources) {
        screens.push({
          id: source.id,
          name: source.name,
          thumbnail: source.thumbnail.toDataURL()
        })
      }

      return screens;

  })

  return captures;
})

ipcMain.on("REG_KEYBINDS", (event, data) => {

  const keyCodes = data;

  try {
    // clean up listeners on new init of reg keybinds to prevent duplicate calls or outadated key bind listening
    const ioHook = require('iohook')
    
    let keyDown = false;

    ioHook.removeAllListeners();

    ioHook.on('keydown', (key) => {
      if (keyDown) return;
      // push to talk
      if (key.rawcode === keyCodes.push_to_talk?.keyCode) {

        event.sender.send('push to talk', {active: true})

      }

      keyDown = true;
    })

    ioHook.on('keyup', (key) => {
      if (!keyDown) return;
      // push to talk
      if (key.rawcode === keyCodes.push_to_talk?.keyCode) {
        event.sender.send('push to talk', {active: false})
      }

      if (key.rawcode === keyCodes.mute_mic?.keyCode) {
        event.sender.send('mute mic', {toggle: true})
      }

      if (key.rawcode === keyCodes.mute_audio?.keyCode) {
        event.sender.send('mute audio', {toggle: true})
      }

      if (key.rawcode === keyCodes.activate_camera?.keyCode) {
        event.sender.send('toggle camera', {toggle: true})
      }

      if (key.rawcode === keyCodes.disconnect?.keyCode) {
        event.sender.send('disconnect key', {toggle: true});
      }

      keyDown = false;
    })
    
    ioHook.start();
  } catch (error) {
    console.log(error)
  }
})

ipcMain.on('download', (event, data) => {
  win.webContents.downloadURL(data.url);
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// handle updates

ipcMain.on('restart-to-update', (event, data) => {
  autoUpdater.quitAndInstall();
})

autoUpdater.on('checking-for-update', () => {
  console.log('checking for updates');
  win.webContents.send('checking-for-update')
})

autoUpdater.on('update-available', () => {
  win.webContents.send('update-available');
})

autoUpdater.on('update-downloaded', () => {
  win.webContents.send('update-downloaded');
})

