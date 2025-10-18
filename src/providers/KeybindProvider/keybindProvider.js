import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAudioMute,
  toggleMicrophone,
  togglePushToTalkActive,
  toggleWebcam,
} from "../../features/Channel/MediaControl/mediaControlSlice";
import { toggleMediaPlayerMuted } from "../../features/MediaPlayer/mediaPlayerSlice";
import { useScreenshot } from "../../hooks/useScreenshot";
import { useAppFocus } from "../../hooks/useAppFocus";
import { setCurrentVoiceChannel } from "../../features/Channel/VoiceChannel/voiceChannelSlice";

const KeybindProvider = ({ children }) => {
  const dispatch = useDispatch();

  const keybinds = useSelector((state) => state.keybindsSlice.keybinds);

  const focused = useAppFocus();

  const activeKeysRef = useRef(new Set());
  const cooldownRef = useRef({});
  const COOLDOWN_MS = 300;
  const isElectron = !!window?.electron?.ipcRenderer;

  const {captureScreenshot} = useScreenshot();

  const handlers = useRef({
      muteMicrophone: () => dispatch(toggleMicrophone()),
      deafen: () => dispatch(toggleAudioMute()),
      enableWebcam: () => dispatch(toggleWebcam()),
      pushToTalk: (_, payload) => dispatch(togglePushToTalkActive(payload?.active)),
      muteMediaPlayer: () => dispatch(toggleMediaPlayerMuted()),
      screenshot: () => {captureScreenshot()},
      disconnect: () => {dispatch(setCurrentVoiceChannel(null))}
  })

  const handleActionTrigger = (action) => {
    console.log(action)
    const now = Date.now();
    const lastUsed = cooldownRef.current[action] || 0;

    if (now - lastUsed < COOLDOWN_MS) return;

    cooldownRef.current[action] = now;

    handlers.current[action]?.()
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
    const ipc = window?.electron?.ipcRenderer;
    if (!ipc) return;

    // First, ensure no duplicate listeners
    Object.entries(handlers.current).forEach(([channel, fn]) => {
      ipc.removeListener(channel, fn);
    });

    // Only attach when NOT focused
    if (!focused) {
      Object.entries(handlers.current).forEach(([channel, fn]) => {
        ipc.on(channel, fn);
      });
    }

    // Cleanup on unmount or dependency change
    return () => {
      Object.entries(handlers.current).forEach(([channel, fn]) => {
        ipc.removeListener(channel, fn);
      });
    };
  }, [focused]);


  useEffect(() => {
    console.log(keybinds)
    if (isElectron) {
      window.electron.ipcRenderer.send("REG_KEYBINDS", keybinds);
  
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
  // eslint-disable-next-line
  }, [keybinds, dispatch, isElectron]);

  return <>{children}</>;
};

export default KeybindProvider;
