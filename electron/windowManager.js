const { BrowserWindow, screen } = require('electron');
const path = require('path');

let mainWindow, loadingWindow;

function isValidBounds(bounds, displayBounds) {
  const { x, y, width, height } = bounds || {};
  if (
    x == null || y == null || width == null || height == null ||
    x < displayBounds.x ||
    y < displayBounds.y ||
    x + width > displayBounds.x + displayBounds.width ||
    y + height > displayBounds.y + displayBounds.height
  ) {
    return false;
  }
  return true;
}

function createMainWindow(settings) {
  const display = screen.getPrimaryDisplay();
  const displayBounds = display.bounds;
  const defaultWidth = 1000;
  const defaultHeight = 700;

  const validBounds = isValidBounds(settings?.bounds, displayBounds)
    ? settings.bounds
    : {
        x: displayBounds.x + (displayBounds.width - defaultWidth) / 2,
        y: displayBounds.y + (displayBounds.height - defaultHeight) / 2,
        width: defaultWidth,
        height: defaultHeight
      };

  loadingWindow = new BrowserWindow({
    width: 425,
    height: 250,
    maxHeight: 250,
    maxWidth: 425,
    titleBarStyle: 'hidden',
    frame: false,
    transparent: true,
    backgroundColor: 'rgba(8, 8, 8, 1)',
  });

  const loadingHTML = require('./loadingHTML');
  loadingWindow.loadURL(`data:text/html;charset=utf-8,${loadingHTML}`);
  loadingWindow.show();

  mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 500,
    ...validBounds,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      devTools: true
    },
    titleBarStyle: 'hidden',
    frame: false,
    icon: path.join(__dirname, 'logo.png'),
  });

  const startUrl = process.env.ELECTRON_START_URL || 'http://localhost:3000/';
  mainWindow.loadURL(startUrl);
  mainWindow.hide();

  mainWindow.webContents.on('dom-ready', () => {
    setTimeout(() => {
      loadingWindow?.hide();
      if (!process.argv.includes('--hidden')) mainWindow.show();

      mainWindow.webContents.openDevTools();
    }, 500);
  });

  return mainWindow;
}

module.exports = { createMainWindow };
