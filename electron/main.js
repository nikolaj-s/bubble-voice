
const { app, BrowserWindow, ipcMain, desktopCapturer, screen, shell } = require('electron')

const { autoUpdater } = require('electron-updater')

const url = require('url')

const path = require('path')

let win;

let transparent;

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

      win.focus();
    }
  })

}

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
    frame: false,
    x: data?.bounds?.x,
    y: data?.bounds?.y,
    width: data?.bounds?.width,
    height: data?.bounds?.height,
  })
  
  const mainScreen = screen.getPrimaryDisplay();

  // transparent = new BrowserWindow({
  //   width: mainScreen.size.width,
  //   height: mainScreen.size.height,
  //   transparent: true,
  //   frame: false,
  //   alwaysOnTop: true,
  //   icon: __dirname + '/logo.png'
  // })

  // transparent.setIgnoreMouseEvents(true);

  // transparent.setFocusable(false);

  //load the index.html from a url
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

    let pushToTalkActive = false;

    ioHook.removeAllListeners();

    ioHook.on('keydown', (key) => {

      if (key.rawcode !== keyCodes.push_to_talk?.keyCode) return;

      if (pushToTalkActive) return;
      // push to talk
      
      if (key.rawcode === keyCodes.push_to_talk?.keyCode) {

        event.sender.send('push to talk', {active: true})

      }

      pushToTalkActive = true;
    })

    ioHook.on('keyup', (key) => {

      if (key.rawcode !== keyCodes.push_to_talk?.keyCode) return;

      if (!pushToTalkActive) return;

      // push to talk
      if (key.rawcode === keyCodes.push_to_talk?.keyCode) {
        event.sender.send('push to talk', {active: false})
      }

      pushToTalkActive = false;
    })

    ioHook.on('keyup', (key) => {

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

      if (key.rawcode === keyCodes.share_screen?.keyCode) {
        event.sender.send('screen share', {toggle: true});
      }

      keyDown = false;
    })

    ioHook.on('mousedown', (key) => {

      if (key.button !== keyCodes.push_to_talk?.keyCode) return;
      
      if (pushToTalkActive) return;

      // push to talk
      if (key.button === keyCodes.push_to_talk?.keyCode) {

        event.sender.send('push to talk', {active: true})

      }

      pushToTalkActive = true;
    })

    ioHook.on('mouseup', (key) => {

      if (key.button !== keyCodes.push_to_talk?.keyCode) return;

      if (!pushToTalkActive) return;
      // push to talk
      
      if (key.button === keyCodes.push_to_talk?.keyCode) {
        event.sender.send('push to talk', {active: false})
      }

      pushToTalkActive = false;

    })

    ioHook.on('mouseup', (key) => {
      
      if (!keyDown) return;

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
