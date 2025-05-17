const fs = require('fs');
const path = require('path');
const { app } = require('electron');

const initPath = path.join(app.getPath('userData'), '../init.json');

function loadUserSettings() {
  if (!fs.existsSync(initPath)) {
    fs.writeFileSync(initPath, JSON.stringify({ toggled: false }));
  }

  try {
    const data = JSON.parse(fs.readFileSync(initPath, 'utf-8'));
    return {
      hardwareAccel: data?.toggled,
      bounds: data?.bounds,
      disableAutoLaunch: data?.disable_auto_launch,
    };
  } catch (error) {
    console.log(error);
    return {};
  }
}

module.exports = { loadUserSettings, initPath };