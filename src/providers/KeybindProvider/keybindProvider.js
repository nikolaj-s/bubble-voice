import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAudioMute, toggleMicrophone, togglePushToTalkActive, toggleWebcam } from "../../features/Channel/MediaControl/mediaControlSlice"; // Update with correct path

const KeybindProvider = ({ children }) => {
  
  const dispatch = useDispatch();

  const keybinds = useSelector((state) => state.keybindsSlice.keybinds);

  const activeKeysRef = useRef(new Set()); // Persistent state

  const handleActionTrigger = (action) => {
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
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.code;
      if (!key) return;

      // Prevent browser back/forward navigation for Mouse Button 4 & 5
      if (event.button === 3 || event.button === 4) {
        event.preventDefault();
      }

      if (key === keybinds["pushToTalk"]?.keyCode && activeKeysRef.current.has(key)) {
        return;
      }

      activeKeysRef.current.add(key);

      if (key === keybinds["pushToTalk"]?.keyCode) {
        event.preventDefault();
        handlePushToTalk(true);
      }
    };

    const handleKeyUp = (event) => {
      const key = event.code;
      if (!key) return;

      activeKeysRef.current.delete(key);

      if (key === keybinds["pushToTalk"]?.keyCode) {
        event.preventDefault();
        handlePushToTalk(false);
      } else {
        Object.entries(keybinds).forEach(([action, boundKey]) => {
          if (key === boundKey?.keyCode && action !== "pushToTalk") {
            event.preventDefault();
            console.log(`${action} triggered`);
            handleActionTrigger(action);
          }
        });
      }
    };

    const handleMouseDown = (event) => {
      if (event.button === 0 || event.button === 2) return; // Ignore Left & Right Clicks

      const mouseKey = `Mouse${event.button}`;

      if (mouseKey === keybinds["pushToTalk"]?.keyCode && activeKeysRef.current.has(mouseKey)) {
        return;
      }

      activeKeysRef.current.add(mouseKey);

      if (mouseKey === keybinds["pushToTalk"]?.keyCode) {
        event.preventDefault();
        handlePushToTalk(true);
      }
    };

    const handleMouseUp = (event) => {
      const mouseKey = `Mouse${event.button}`;
      activeKeysRef.current.delete(mouseKey);

      if (mouseKey === keybinds["pushToTalk"]?.keyCode) {
        event.preventDefault();
        handlePushToTalk(false);
      } else {
        Object.entries(keybinds).forEach(([action, boundKey]) => {
          if (mouseKey === boundKey?.keyCode && action !== "pushToTalk") {
            event.preventDefault();
            console.log(`${action} triggered (Mouse)`);
            handleActionTrigger(action);
          }
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [keybinds, dispatch]);

  return <>{children}</>;
};

export default KeybindProvider;
