import { useDispatch, useSelector } from "react-redux";
import {
  setScreenSharing,
  setSelecting,
  setScreenError,
  clearScreenState,
  setStreamDetails,
} from "../features/ScreenShare/screenShareSlice";
import { setOverlay, closeOverlay } from "../features/Overlay/overlaySlice";
import { useRef } from "react";
import { stopSharingScreen } from "../features/Channel/MediaControl/mediaControlSlice";

export const useScreenShare = ({produce, closeProducer}) => {
  const isElectron = !!window?.electron?.ipcRenderer;
  const dispatch = useDispatch();
  const { isSharing, selecting } = useSelector(state => state.screenShareSlice);

  // Track current stream in ref (do NOT put in Redux)
  const streamRef = useRef(null);

  // Ensure only one stream active at a time
  const cleanupStream = async () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (typeof closeProducer === "function") {
      await closeProducer("screen");
    }
    dispatch(clearScreenState());

    dispatch(stopSharingScreen());
  };

  // Pick screen and produce
  const pickScreen = () =>
    new Promise(async (resolve, reject) => {
      await cleanupStream(); // Always cleanup before picking new one
      dispatch(setSelecting(true));
      dispatch(setScreenError(null));
      dispatch(setScreenSharing(false));

      if (isElectron) {
        dispatch(setOverlay("screenPicker"));

        const handleSource = async (source) => {
          dispatch(closeOverlay());
          dispatch(setSelecting(false));
          
          if (!source) {
            await cleanupStream();
            return reject("No screen selected");
          }
          try {

            const mediaStream = await navigator.mediaDevices.getUserMedia({
              audio: false,
              video: {
                mandatory: {
                  chromeMediaSource: "desktop",
                  chromeMediaSourceId: source.id,
                  maxWidth: 960,
                  maxHeight: 540,
                  maxFrameRate: 30,
                  cursor: 'never'
                },
              },
            });

            streamRef.current = mediaStream;

            if (typeof produce === "function") {
              await produce("screen", mediaStream.getVideoTracks()[0]);
            }

            dispatch(setScreenSharing(true));

            dispatch(setStreamDetails({name: source.name, thumbnail: source.thumbnail}));
            // Listen for manual stream end (user stops sharing)
            const stopHandler = async () => {
              await cleanupStream();
            };
            // Only add once
            mediaStream.getVideoTracks().forEach((track) => {
              track.onended = stopHandler;
            });
            resolve(mediaStream);
          } catch (err) {
            dispatch(setScreenError("Failed to get screen stream"));
            await cleanupStream();
            reject(err);
          }
        };

        window.addEventListener(
          "bubble:screen-picker-selected",
          (e) => {
            handleSource(e.detail?.source);
          },
          { once: true }
        );
      } else {
        try {
          const mediaStream = await navigator.mediaDevices.getDisplayMedia({
            video: {
              cursor: "never",
              width: { max: 960 },
              height: { max: 540 },
              frameRate: { max: 30 },
            },
            audio: true,
          });
          
          streamRef.current = mediaStream;
          if (typeof produce === "function") {
            await produce("screen", mediaStream.getVideoTracks()[0]);
          }
          dispatch(setScreenSharing(true));
          dispatch(setStreamDetails({name: 'Screen'}))
          dispatch(setSelecting(false));
          // Listen for manual stream end (user stops sharing)
          const stopHandler = async () => {
            await cleanupStream();
          };
          mediaStream.getVideoTracks().forEach((track) => {
            track.onended = stopHandler;
          });
          resolve(mediaStream);
        } catch (err) {
          dispatch(setScreenError("Screen share cancelled or failed"));
          await cleanupStream();
          reject(err);
        }
      }
    });

  // Main handler for toggling screen share
  const handleScreenShare = async (isSharingScreen) => {
    if (!isSharingScreen) {
      await cleanupStream();
      return;
    }
    try {
      await pickScreen();
    } catch (err) {
      // Already cleaned up on error
    }
  };

  return {
    handleScreenShare,
    cleanupStream,
    isSharing,
    selecting,
    // Expose the ref in case you want it (for preview, etc)
    streamRef,
  };
};
