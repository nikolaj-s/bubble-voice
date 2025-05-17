const { Tray, Menu, nativeImage, app } = require('electron');
const path = require('path');

let tray;

function setupTray(win) {
  const icon = nativeImage.createFromPath(path.join(__dirname, '..', 'logo512.ico'));

  tray = new Tray(icon);

  const ctxMenu = Menu.buildFromTemplate([
    { label: "Show App", click: () => win.show() },
    { label: "Hide App", click: () => win.hide() },
    { label: 'Quit App', click: () => app.quit() },
    { label: "Reset Window", click: () => win.setPosition(0, 0) },
  ]);

  tray.setTitle("Bubble");
  tray.setContextMenu(ctxMenu);
}

module.exports = { setupTray };