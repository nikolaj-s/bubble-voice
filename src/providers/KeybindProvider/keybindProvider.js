import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAudioMute,
  toggleMicrophone,
  togglePushToTalkActive,
  toggleWebcam,
} from "../../features/Channel/MediaControl/mediaControlSlice";

const KeybindProvider = ({ children }) => {
  const dispatch = useDispatch();
  const keybinds = useSelector((state) => state.keybindsSlice.keybinds);

  const activeKeysRef = useRef(new Set());
  const cooldownRef = useRef({});
  const COOLDOWN_MS = 300;
  const isElectron = !!window?.electron?.ipcRenderer;

  const handleActionTrigger = (action) => {
    const now = Date.now();
    const lastUsed = cooldownRef.current[action] || 0;

    if (now - lastUsed < COOLDOWN_MS) return;

    cooldownRef.current[action] = now;

    switch (action) {
      case "muteMicrophone":
        dispatch(toggleMicrophone());
        break;
      case "deafen":
        dispatch(toggleAudioMute());
        break;
      case "enableWebcam":
        dispatch(toggleWebcam());
        break;
      default:
        console.log(action);
        return;
    }
  };

  const handlePushToTalk = (state) => {
    dispatch(togglePushToTalkActive(state));
  };

  const handleDomKeyDown = (event) => {
    const key = event.code;
    if (!key) return;
    if (event.button === 3 || event.button === 4) event.preventDefault();

    if (key === keybinds["pushToTalk"]?.keyCode && activeKeysRef.current.has(key)) return;

    activeKeysRef.current.add(key);

    if (key === keybinds["pushToTalk"]?.keyCode) {
     // event.preventDefault();
      handlePushToTalk(true);
    }
  };

  const handleDomKeyUp = (event) => {
    const key = event.code;
    if (!key) return;

    activeKeysRef.current.delete(key);

    if (key === keybinds["pushToTalk"]?.keyCode) {
     // event.preventDefault();
      handlePushToTalk(false);
    } else {
      Object.entries(keybinds).forEach(([action, boundKey]) => {
        if (key === boundKey?.keyCode && action !== "pushToTalk") {
          event.preventDefault();
          handleActionTrigger(action);
        }
      });
    }
  };

  const handleDomMouseDown = (event) => {
    if (event.button === 0 || event.button === 2) return;
    const mouseKey = `Mouse${event.button}`;

    if (mouseKey === keybinds["pushToTalk"]?.keyCode && activeKeysRef.current.has(mouseKey)) return;

    activeKeysRef.current.add(mouseKey);

    if (mouseKey === keybinds["pushToTalk"]?.keyCode) {
      event.preventDefault();
      handlePushToTalk(true);
    }
  };

  const handleDomMouseUp = (event) => {
    const mouseKey = `Mouse${event.button}`;
    activeKeysRef.current.delete(mouseKey);

    if (mouseKey === keybinds["pushToTalk"]?.keyCode) {
      event.preventDefault();
      handlePushToTalk(false);
    } else {
      Object.entries(keybinds).forEach(([action, boundKey]) => {
        if (mouseKey === boundKey?.keyCode && action !== "pushToTalk") {
          event.preventDefault();
          handleActionTrigger(action);
        }
      });
    }
  };

  useEffect(() => {
    if (!window?.electron?.ipcRenderer?.on) return;

    const ipc = window.electron.ipcRenderer;

    const handlers = {
      muteMicrophone: () => dispatch(toggleMicrophone()),
      deafen: () => dispatch(toggleAudioMute()),
      enableWebcam: () => dispatch(toggleWebcam()),
      'push to talk': (_, payload) => dispatch(togglePushToTalkActive(payload?.active)),
    };

    // Attach listeners
    Object.entries(handlers).forEach(([channel, fn]) => {
      ipc.on(channel, fn);
    });

    // Cleanup
    return () => {
      Object.entries(handlers).forEach(([channel, fn]) => {
        ipc.removeListener(channel, fn);
      });
    };
  }, [dispatch]);



  useEffect(() => {
    if (isElectron) {
      window.electron.ipcRenderer.send("REG_KEYBINDS", keybinds);
      return;
    }
    console.log('using dom key events listener');

    window.addEventListener("keydown", handleDomKeyDown);
    window.addEventListener("keyup", handleDomKeyUp);
    window.addEventListener("mousedown", handleDomMouseDown);
    window.addEventListener("mouseup", handleDomMouseUp);

    return () => {
      window.removeEventListener("keydown", handleDomKeyDown);
      window.removeEventListener("keyup", handleDomKeyUp);
      window.removeEventListener("mousedown", handleDomMouseDown);
      window.removeEventListener("mouseup", handleDomMouseUp);
    };
  }, [keybinds, dispatch, isElectron]);

  return <>{children}</>;
};

export default KeybindProvider;
