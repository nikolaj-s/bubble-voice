
const { app, BrowserWindow, ipcMain, desktopCapturer, screen, shell, session, Tray, Menu, nativeImage } = require('electron')

const { autoUpdater } = require('electron-updater')

const { uIOhook, UiohookKey } = require('uiohook-napi');

const path = require('path');

const http = require('http');

let startUrl = process.env.ELECTRON_START_URL || 'http://localhost:8382/index.html'

let window_id;

let server;

let win;

let hardwareAccelToggled;

let notification;

let initial_app_loading;

let scraping_window;

let inactive = false;

let update_available = false;

let no_update = false;

let loading_template = `

<head>
<style>
  * {
    overflow: hidden;
  }
  body {
      display: flex;
      width: 405px;
      height: 230px;
      padding: 10px;
      color: white;
      font-family: 'Quicksand', sans-serif;
      background-color: rgba(8, 8, 8, 1);
      margin: 0;
      border-radius: 10px;
  }

  body h1 {
      margin: 5px 0px;
      font-weight: 500;
  }
  .icon-container {
    width: 50px;
    height: 50px;
  }

  .icon-container img {
      width: 50px;
      height: 50px;
  }

  .loading-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
  }

  .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid white;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: white transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  </style>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter&family=Raleway:wght@300;700&display=swap" rel="stylesheet">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500&display=swap" rel="stylesheet">
</head>
<body>
  <div class="loading-container" >
    <div class='icon-container'>
      <img src="https://res.cloudinary.com/drlkgoter/image/upload/v1668805881/logo_y9odas.png" />
    </div>
    <h1>Loading Bubble</h1>
    <p>This Will Take Just A Second</p>
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
  </div>
</body>
`

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
  

}


// prevent multiple instances from occuring

const lock = app.requestSingleInstanceLock();

if (data?.toggled) {
  console.log('Hardware acceleration disabled')
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

    req.on('error', (err) => {
      console.log(err);
      return;
    })

    if (req.url.includes('index.js')) server.close();

  }).listen(8382);

}

function createWindow () {

  initial_app_loading = new BrowserWindow({
    width: 425,
    height: 250,
    maxHeight: 250,
    maxWidth: 425,
    titleBarStyle: 'hidden',
    frame: false,
    transparent: true,
    backgroundColor: 'rgba(8, 8, 8, 1)',
    
  })

  initial_app_loading.loadURL(`data:text/html;charset=utf-8,${loading_template}`)

  initial_app_loading.show();

  // Create the browser window.
  win = new BrowserWindow({
    minWidth: 730,
    minHeight: 500,
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
    icon: __dirname + '/logo.png'
  })
  
  win.loadURL(startUrl);

  win.hide();

  win.webContents.on('dom-ready', () => {

      setTimeout(() => {
        initial_app_loading?.hide();

        if (process.argv.includes('--hidden')) {
          win.hide();
        } else {
            win.show();
        }

      }, 500)
  })

  win.once('focus', () => win.flashFrame(false));

  const mainScreen = screen.getPrimaryDisplay();

  notification = new BrowserWindow({
    width: mainScreen.size.width,
    height: mainScreen.size.height,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    x: mainScreen.bounds.x,
    y: mainScreen.bounds.y,
    icon: __dirname + '/logo.png',
  })

  notification.setIgnoreMouseEvents(true);

  notification.setFocusable(false);

  notification.setAlwaysOnTop(true, 'level', 20);

  notification.setVisibleOnAllWorkspaces(true);

  notification.setFullScreenable(false);

  notification.maximize();

  notification.show();

  // Open the DevTools.
  process.env.ELECTRON_START_URL ? win.webContents.openDevTools() : null

  const handleRedirect = (e, url) => {
    e.preventDefault();
    

    shell.openExternal(url);
  }
  
  win.webContents.on('will-navigate', handleRedirect);
  
  win.webContents.on('new-window', handleRedirect);

  win.webContents.on('did-create-window', (window, details) => {
    window.close()
    
    shell.openExternal(details.url);
  })
  
  win.on('close', () => {
    console.log('closing app')
    try {
      let window_data = {
        toggled: hardwareAccelToggled !== data?.toggled ? hardwareAccelToggled : data?.toggled,
        bounds: win.getBounds()
      }
      
      fs.writeFileSync(initPath, JSON.stringify(window_data))
  
      notification?.close();
  
      initial_app_loading?.close();
    } catch (err) {
      return;
    }
  
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
    notification.close();
    initial_app_loading?.close();
  })
  
  ipcMain.on('min', () => {
    win.minimize();
  })

  if (process.argv.includes('--hidden')) {
    console.log(process.argv)
    win.hide();
  }
  
}

ipcMain.handle('SCREEN_SHOT', async () => {
  try {
    const capture = await desktopCapturer.getSources({types: ['window'], thumbnailSize: {width: 1920, height: 1080}})
    .then(captures => {
     
      const pickCurrent = (sources, index = 0) => {
        
        if (sources.length === index) {
          return {error: 'error capturing screen shot'};
        }

        if (sources[index].name.toLowerCase().includes('bubble') || sources[index].name.toLowerCase().includes('overlay')) {
          return pickCurrent(sources, index++);
        }

        return {data: sources[index].thumbnail.toPNG(), preview: sources[index].thumbnail.toDataURL(), text: sources[index].name}
      }
      console.log(captures[0])
      return pickCurrent(captures, 0);
    
    })

    return capture;
  } catch (error) {
    console.log(error);
    return {error: "error capturing screen shot"}
  }
})

ipcMain.handle("DYNAMIC_STATUS", async () => {

  if (inactive) {
    return [{id: "away-status", name: "Away"}]
  }

  const captures = await desktopCapturer.getSources({ types: ['window'], thumbnailSize: {width: 0, height: 0}})
  .then(async sources => {
      const screens = [];
      
      for (const source of sources) {
        
        screens.push({
          id: source.id,
          name: source.name,
        })
      }

      return screens;

  })

  return captures;
})

ipcMain.handle("CLEAR_CACHE", async () => {
  try {
    win.webContents.session.clearCache();
    return;
  } catch (err) {
    console.log(err);
    return;
  }
  
})

ipcMain.handle('GET_SOURCES', async () => {

  const captures = await desktopCapturer.getSources({ types: ['window', 'screen', 'audio'], thumbnailSize: {width: 200, height: 200}, fetchWindowIcons: true})
  .then(async sources => {
      const screens = [];
      
      for (const source of sources) {
        
        screens.push({
          id: source.id,
          name: source.name,
          thumbnail: source.thumbnail.toDataURL(),
          icon: source?.appIcon?.toDataURL()
        })
      }

      return screens;

  })

  return captures;
})

let timeout;


ipcMain.on('RESET_INAC_TIMEOUT', (event, data) => {

  clearTimeout(timeout);

  if (inactive) {
    event.sender.send('now active');
  }

  inactive = false;

  timeout = setTimeout(() => {

    event.sender.send('inactive');

    console.log('user has gone inactive');

  }, 2100000)


})

ipcMain.on("REG_KEYBINDS", (event, data) => {

  const keyCodes = data;
  
  try {
    // clean up listeners on new init of reg keybinds to prevent duplicate calls or outadated key bind listening
    
    let keyDown = false;

    let pushToTalkActive = false;

    clearTimeout(timeout);

    const handle_inactivity = () => {

      if (inactive) {
        event.sender.send('now active');
      }

      inactive = false;

      clearTimeout(timeout);

      timeout = setTimeout(() => {

        event.sender.send('inactive');

        inactive = true;

        console.log('user has gone inactive');

      }, 2100000)
      
    }

    uIOhook.removeAllListeners();

    uIOhook.on('keydown', (key) => {
  
      if (pushToTalkActive) return;
      // push to talk
      
      if (key.keycode === UiohookKey[keyCodes.push_to_talk?.key] || key.keycode === UiohookKey[keyCodes.push_to_talk?.code]) {

        event.sender.send('push to talk', {active: true})

        pushToTalkActive = true;
      
      }

      if (key.keycode === UiohookKey[keyCodes?.push_to_mute?.key] || key.keycode === UiohookKey[keyCodes?.push_to_mute?.code]) {

        event.sender.send('push to mute', {active: true})

        pushToTalkActive = true;
      
      }

      
    
    })

    uIOhook.on('keyup', (key) => {

      handle_inactivity();
      
      if (!pushToTalkActive) return;
      
      // push to talk
      if (key.keycode === UiohookKey[keyCodes.push_to_talk?.key] || key.keycode === UiohookKey[keyCodes.push_to_talk?.code]) {
        event.sender.send('push to talk', {active: false})

        pushToTalkActive = false;
      }

      if (key.keycode === UiohookKey[keyCodes?.push_to_mute?.key] || key.keycode === UiohookKey[keyCodes?.push_to_mute?.code]) {

        event.sender.send('push to mute', {active: false})

        pushToTalkActive = false;
      }

      
    
    })

    uIOhook.on('keyup', (key) => {

      if (key.keycode === UiohookKey[keyCodes.mute_mic?.key] || key.keycode === UiohookKey[keyCodes.mute_mic?.code]) {
        event.sender.send('mute mic', {toggle: true})
      }

      if (key.keycode === UiohookKey[keyCodes.mute_audio?.key] || key.keycode === UiohookKey[keyCodes.mute_audio?.code]) {
        event.sender.send('mute audio', {toggle: true})
      }

      if (key.keycode === UiohookKey[keyCodes.activate_camera?.key] || key.keycode === UiohookKey[keyCodes.activate_camera?.code]) {
        event.sender.send('toggle camera', {toggle: true})
      }

      if (key.keycode === UiohookKey[keyCodes.disconnect?.key] || key.keycode === UiohookKey[keyCodes.disconnect?.code]) {
        event.sender.send('disconnect key', {toggle: true});
      }

      if (key.keycode === UiohookKey[keyCodes.share_screen?.key] || key.keycode === UiohookKey[keyCodes.share_screen?.code]) {
        event.sender.send('screen share', {toggle: true});
      }

      if (key.keycode === UiohookKey[keyCodes.screen_shot?.key] || key.keycode === UiohookKey[keyCodes.screen_shot?.code]) {
        event.sender.send('screen shot', {toggle: true});
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

      if (key.button === keyCodes.share_screen?.keyCode) {
        event.sender.send('share screen', {toggle: true});
      }

      keyDown = false;
    })

    // uIOhook.on('mousemove', () => {
    //   handle_inactivity();
    // })
    
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
    },
    {
      label: "Reset Window", click: () => {
        win.setPosition(0, 0);
      }
    }
  ])

  tray.setTitle("Bubble");

  tray.setContextMenu(ctxMenu);

  session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
    desktopCapturer.getSources({types: ['window', 'screen', 'audio']}).then((sources) => {
      const index = sources.findIndex(s => s.id === window_id);
      console.log(request.frame)
      callback({video: sources[index], audio: 'loopback', enableLocalEcho: true});
    })
  })

  createWindow();

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('before-quit', () => {
  try {
    win?.close();
    notification?.close();
    initial_app_loading?.close();
  } catch (err) {
    return;
  }

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


ipcMain.on('refresh app', () => {
  win.reload();
})

// handle updates
ipcMain.on('check-for-updates', async (event, data) => {

  console.log('checking for update');

  autoUpdater.checkForUpdatesAndNotify().catch(err => {
    console.log(err)
  })

  autoUpdater.on('update-downloaded', () => {
    
    event.sender.send('update-available');

  })

  autoUpdater.on('update-not-available', () => {
    console.log('no update');

    no_update = true;

    event.sender.send('no-update');
  })

})

ipcMain.on('restart-to-update', (event, data) => {
  autoUpdater.quitAndInstall();
})

autoUpdater.on('error', (err) => {
  console.log('update not available to download')
  win.webContents.send("error updating", {error: err})
})

autoUpdater.on('update-not-available', () => {
  console.log('no update')
  win.webContents.send("update not available");
})

autoUpdater.on('update-downloaded', () => {
  win.webContents.send('update-available');

  ipcMain.emit('update-available');
})

// handle open links
ipcMain.on('open-link', async (event, data) => {

  shell.openExternal(data.url);

})

ipcMain.on('set-window-id', (event, data) => {

  window_id = data.id;

  console.log(window_id);
})

ipcMain.on('push notification', (event, data) => {

  try {
    if (notification) {

      let none = '<div style="display: none;"></div>'
      
      let alert = data;

      notification.loadURL(`data:text/html;charset=utf-8,${alert.message}`)

      if (!win.isFocused() && alert.type === 'direct_message') win.flashFrame(true);

      setTimeout(() => {
        notification.loadURL(`data:text/html;charset=utf-8,${none}`);
      }, 3100)

    } else {

      const mainScreen = screen.getPrimaryDisplay();

      notification = new BrowserWindow({
        width: mainScreen.size.width,
        height: mainScreen.size.height,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        x: mainScreen.bounds.x,
        y: mainScreen.bounds.y,
        icon: __dirname + '/logo.png',
      })

      notification.setIgnoreMouseEvents(true);

      notification.setFocusable(false);

      notification.setAlwaysOnTop(true, 'level', 20);

      notification.setVisibleOnAllWorkspaces(true);

      notification.setFullScreenable(false);

      notification.maximize();

      notification.show();

      let none = '<div style="display: none;"></div>'
      
      let alert = data;

      notification.loadURL(`data:text/html;charset=utf-8,${alert.message}`)

      if (!win.isFocused() && alert.type === 'direct_message') win.flashFrame(true);

      setTimeout(() => {
        notification.loadURL(`data:text/html;charset=utf-8,${none}`);
      }, 3100)
    }
    
  } catch (err) {
    return;
  }

})