
const { app, BrowserWindow, ipcMain, desktopCapturer, screen, shell, session, Tray, Menu, nativeImage } = require('electron')

const { autoUpdater } = require('electron-updater')

const { uIOhook, UiohookKey } = require('uiohook-napi');

const url = require('url');

const path = require('path');

const http = require('http');

let startUrl = process.env.ELECTRON_START_URL || 'http://localhost:8382/index.html'

let server;

let win;

let hardwareAccelToggled;

const fs = require('fs');

const initPath = path.join(app.getPath('userData'), '../init.json');

if (!fs.existsSync(initPath)) {

  fs.writeFileSync(initPath, JSON.stringify({
    toggled: false
  }));

}

let data;

try {

  data = JSON.parse(fs.readFileSync(initPath, 'utf-8'));
  
  hardwareAccelToggled = data?.toggled;

} catch (error) {

  console.log(error)
  
  return;

}

// prevent multiple instances from occuring

const lock = app.requestSingleInstanceLock();

if (data?.toggled) {
  
  console.log(data, 'toggling harware acceleration')
  
  app.disableHardwareAcceleration();

} 

// handle preventing multiple instances running
if (!lock) {

  app.quit()

} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {

    if (win) {

      if (win.isMinimized()) win.restore();

      win.show();

      win.focus();
    }
  })

}

if (!process.env.ELECTRON_START_URL && lock) {

  server = http.createServer((req, res) => {

    const filePath = path.join(__dirname, '..', req.url);

    const file = fs.readFileSync(filePath);

    res.end(file.toString());

    if (req.url.includes('index.js')) server.close();

  }).listen(8382);

}

function createWindow () {

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
    frame: false,
    x: data?.bounds?.x,
    y: data?.bounds?.y,
    width: data?.bounds?.width,
    height: data?.bounds?.height,
  })
  
  win.loadURL(startUrl);

  win.webContents.on('new-window', (event, url) => {
      event.preventDefault();

      shell.openExternal(url);
  }) 

  // Open the DevTools.
  process.env.ELECTRON_START_URL ? win.webContents.openDevTools() : null

  win.on('close', () => {

    let window_data = {
      toggled: hardwareAccelToggled !== data?.toggled ? hardwareAccelToggled : data?.toggled,
      bounds: win.getBounds()
    }
    
    fs.writeFileSync(initPath, JSON.stringify(window_data))
  
  })

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
  //  transparent.close();
  })
  
  ipcMain.on('min', () => {
    win.minimize();
  })

  if (process.argv.includes('--hidden')) {
    console.log(process.argv)
    win.hide();
  }
  
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

let timeout;

ipcMain.on("REG_KEYBINDS", (event, data) => {

  const keyCodes = data;

  try {
    // clean up listeners on new init of reg keybinds to prevent duplicate calls or outadated key bind listening
    
    let keyDown = false;

    let pushToTalkActive = false;

    clearTimeout(timeout);

    const handle_inactivity = () => {

      clearTimeout(timeout);

      timeout = setTimeout(() => {

        event.sender.send('inactive');

        console.log('user has gone inactive');

      }, 1800000)
      
    }

    uIOhook.removeAllListeners();

    uIOhook.on('keydown', (key) => {

      if (key.keycode !== UiohookKey[keyCodes.push_to_talk?.code || keyCodes.push_to_talk?.key] && key.keycode !== UiohookKey[keyCodes?.push_to_mute?.code || keyCodes?.push_to_mute?.key]) return;

      if (pushToTalkActive) return;
      // push to talk
      
      if (key.keycode === UiohookKey[keyCodes.push_to_talk?.code || keyCodes.push_to_talk?.key]) {

        event.sender.send('push to talk', {active: true})

      }

      if (key.keycode === UiohookKey[keyCodes?.push_to_mute?.code || keyCodes?.push_to_mute?.key]) {

        event.sender.send('push to mute', {active: true})

      }

      pushToTalkActive = true;
    
    })

    uIOhook.on('keyup', (key) => {

      handle_inactivity();
      
      if (key.keycode !== UiohookKey[keyCodes.push_to_talk?.code || keyCodes.push_to_talk?.key] && key.keycode !== UiohookKey[keyCodes?.push_to_mute?.code || keyCodes?.push_to_mute?.key]) return;

      if (!pushToTalkActive) return;
      
      // push to talk
      if (key.keycode === UiohookKey[keyCodes.push_to_talk?.code || keyCodes.push_to_talk?.key]) {
        event.sender.send('push to talk', {active: false})
      }

      if (key.keycode === UiohookKey[keyCodes?.push_to_mute?.code || keyCodes?.push_to_mute?.key]) {

        event.sender.send('push to mute', {active: false})

      }

      pushToTalkActive = false;
    
    })

    uIOhook.on('keyup', (key) => {

      if (key.keycode === UiohookKey[keyCodes.mute_mic?.code || keyCodes.mute_mic?.key]) {
        event.sender.send('mute mic', {toggle: true})
      }

      if (key.keycode === UiohookKey[keyCodes.mute_audio?.code || keyCodes.mute_audio?.key]) {
        event.sender.send('mute audio', {toggle: true})
      }

      if (key.keycode === UiohookKey[keyCodes.activate_camera?.code || keyCodes.activate_camera?.key]) {
        event.sender.send('toggle camera', {toggle: true})
      }

      if (key.keycode === UiohookKey[keyCodes.disconnect?.code || keyCodes.disconnect?.key]) {
        event.sender.send('disconnect key', {toggle: true});
      }

      if (key.keycode === UiohookKey[keyCodes.share_screen?.code || keyCodes.share_screen?.key]) {
        event.sender.send('screen share', {toggle: true});
      }

      keyDown = false;
    })

    uIOhook.on('mousedown', (key) => {

      if (key.button !== keyCodes.push_to_talk?.keyCode && key.button !== keyCodes?.push_to_mute?.keyCode) return;
      
      if (pushToTalkActive) return;

      // push to talk
      if (key.button === keyCodes.push_to_talk?.keyCode) {

        event.sender.send('push to talk', {active: true})

      }

      if (key.button === keyCodes.push_to_mute?.keyCode) {

        event.sender.send('push to mute', {active: false})

      }

      pushToTalkActive = true;
    })

    uIOhook.on('mouseup', (key) => {

      handle_inactivity();

      if (key.button !== keyCodes.push_to_talk?.keyCode && key.button !== keyCodes?.push_to_mute?.keyCode) return;

      if (!pushToTalkActive) return;
      // push to talk
      
      if (key.button === keyCodes.push_to_talk?.keyCode) {
        event.sender.send('push to talk', {active: false})
      }

      if (key.button === keyCodes.push_to_mute?.keyCode) {

        event.sender.send('push to mute', {active: false})

      }

      pushToTalkActive = false;

    })

    uIOhook.on('mouseup', (key) => {
      
      if (key.button === keyCodes.mute_mic?.keyCode) {
        event.sender.send('mute mic', {toggle: true})
      }

      if (key.button === keyCodes.mute_audio?.keyCode) {
        event.sender.send('mute audio', {toggle: true})
      }

      if (key.button === keyCodes.activate_camera?.keyCode) {
        event.sender.send('toggle camera', {toggle: true})
      }

      if (key.button === keyCodes.disconnect?.keyCode) {
        event.sender.send('disconnect key', {toggle: true});
      }

      keyDown = false;
    })

    uIOhook.on('mousemove', () => {
      handle_inactivity();
    })
    
    uIOhook.start();
  } catch (error) {
    console.log(error)
    clearTimeout(timeout);
  }
})

ipcMain.on('download', (event, data) => {
  win.webContents.downloadURL(data.url);
})

let tray;

app.setLoginItemSettings({
  openAtLogin: true,
  args: ['--hidden']
})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  
  const icon = nativeImage.createFromPath(path.join(__dirname, '..', 'logo512.ico'))

  tray = new Tray(icon);

  const ctxMenu = Menu.buildFromTemplate([
    {
      label: "Show App", click: () => {
        win.show();
      }
    },
    {
      label: "Hide App", click: () => {
        win.hide();
      }
    },
    {
      label: 'Quit App', click: () => {
        app.quit();
      }
    }
  ])

  tray.setTitle("Bubble");

  tray.setContextMenu(ctxMenu);

  createWindow();

  setTimeout(() => {
    win.webContents.send('update-available');
  }, 10000)

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('before-quit', () => {

  win.close();
//  transparent.close();

})

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

// get current version
ipcMain.on('get_app_ver', (event) => {
  event.sender.send('get_app_ver', {version: app.getVersion()});
})

ipcMain.on('write-hardware-change', (event, args) => {
  
  hardwareAccelToggled = args.toggled;

})

// get streaming url for music
ipcMain.on('get_music_stream', async (event, data) => {
  
})

// handle updates
ipcMain.on('check-for-updates', async (event, data) => {

  console.log('checking for update');

  autoUpdater.checkForUpdatesAndNotify();
})

ipcMain.on('restart-to-update', (event, data) => {
  autoUpdater.quitAndInstall();
})

autoUpdater.on('error', (err) => {
  win.webContents.send("error updating", {error: err})
})

autoUpdater.on('update-not-available', () => {
  win.webContents.send("update not available");
})

autoUpdater.on('update-downloaded', () => {
  win.webContents.send('update-available');
})
