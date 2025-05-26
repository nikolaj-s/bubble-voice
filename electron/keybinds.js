const { uIOhook, UiohookKey } = require('uiohook-napi');
const { ipcMain } = require('electron');

let keybinds = {};
let pushToTalkActive = false;
let timeout;
let inactive = false;

const COOLDOWN_MS = 300;
const cooldownMap = {};

function shouldThrottle(action) {
  const now = Date.now();
  const last = cooldownMap[action] || 0;
  if (now - last < COOLDOWN_MS) return true;
  cooldownMap[action] = now;
  return false;
}

function matchesKeyOrMouse(input, target) {
  if (!target) return false;

  const isKeyboardMatch =
    typeof input.keycode !== 'undefined' &&
    (input.keycode === UiohookKey[target?.key] || input.keycode === UiohookKey[target?.code]);

  const isMouseMatch =
    typeof input.button !== 'undefined' &&
    typeof target.keyCode === 'string' &&
    target.keyCode.startsWith('Mouse') &&
    (`Mouse${input.button}` === target.keyCode || target.key.includes(input.button));

  return isKeyboardMatch || isMouseMatch;
}


function setupKeybinds(eventSender, binds) {
  keybinds = binds;

  clearTimeout(timeout);
  uIOhook.removeAllListeners();

  const handleInactivity = () => {
    if (inactive) eventSender.send('now active');
    inactive = false;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      eventSender.send('inactive');
      inactive = true;
    }, 1500000);
  };

  // Key down
  uIOhook.on('keydown', (key) => {
    if (matchesKeyOrMouse(key, keybinds.pushToTalk) && !pushToTalkActive) {
      eventSender.send('push to talk', { active: true });
      pushToTalkActive = true;
      return;
    }

    for (const action of Object.keys(keybinds)) {
      if (action === 'pushToTalk') continue;
      if (matchesKeyOrMouse(key, keybinds[action])) {
        eventSender.send(action, { toggle: true });
      }
    }
  });

  // Key up
  uIOhook.on('keyup', (key) => {
    if (matchesKeyOrMouse(key, keybinds.pushToTalk) && pushToTalkActive) {
      eventSender.send('push to talk', { active: false });
      pushToTalkActive = false;
    }

    handleInactivity();
  });

  // Mouse down
  uIOhook.on('mousedown', (mouse) => {
    if (matchesKeyOrMouse(mouse, keybinds.pushToTalk) && !pushToTalkActive) {
      eventSender.send('push to talk', { active: true });
      pushToTalkActive = true;
      return;
    }

    for (const action of Object.keys(keybinds)) {
      if (action === 'pushToTalk') continue;
      if (matchesKeyOrMouse(mouse, keybinds[action])) {
        eventSender.send(action, { toggle: true });
      }
    }
  });

  // Mouse up
  uIOhook.on('mouseup', (mouse) => {
    if (matchesKeyOrMouse(mouse, keybinds.pushToTalk) && pushToTalkActive) {
      eventSender.send('push to talk', { active: false });
      pushToTalkActive = false;
    }

    handleInactivity();
  });

  uIOhook.start();
}

module.exports = {setupKeybinds}
