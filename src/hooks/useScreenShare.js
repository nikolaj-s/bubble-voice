import { useDispatch, useSelector } from "react-redux";
import {
  setScreenSharing,
  setSelecting,
  clearScreenState,
  setStreamDetails,
  setStreamIcon,
} from "../features/ScreenShare/screenShareSlice";
import { setOverlay, closeOverlay } from "../features/Overlay/overlaySlice";
import { useRef } from "react";
import { stopSharingScreen, throwScreenShareError } from "../features/Channel/MediaControl/mediaControlSlice";
import { useNativeAudioCapture } from "./useNativeAudioCapture";
import { triggerAlert } from "../features/Alerts/alertsSlice";

export const useScreenShare = ({produce, closeProducer}) => {
  const isElectron = window?.electron?.ipcRenderer;

  const dispatch = useDispatch();

  const { isSharing, selecting } = useSelector(state => state.screenShareSlice);

  const {startStream, stopStream, cleanupAll} = useNativeAudioCapture();

  // Track current stream in ref (do NOT put in Redux)
  const streamRef = useRef(null);

  // Ensure only one stream active at a time
  const cleanupStream = async (autoClean) => {

    if (streamRef.current) {

      streamRef.current.getTracks().forEach(t => t.stop());

      streamRef.current = null;

    }

    if (typeof closeProducer === "function") {

      await closeProducer("stream");

      await closeProducer("streamAudio");

    }

    try {cleanupAll()} catch {};

    dispatch(clearScreenState());

    if (autoClean) dispatch(stopSharingScreen());

  };

  // Pick screen and produce
  const pickScreen = () =>
    new Promise(async (resolve, reject) => {

      await cleanupStream(); 
      // Always cleanup before picking new one
      dispatch(setSelecting(true));

      dispatch(throwScreenShareError(null));

  //    dispatch(setScreenSharing(false));

      if (isElectron) {

        dispatch(setOverlay("screenPicker"));

        const handleSource = async (source) => {

          dispatch(closeOverlay());

          dispatch(setSelecting(false));
          console.log(source)
          // if no source is selected clean up, and toggle state to disable stream status
          if (!source) {
            await cleanupStream(true);
            return reject("No screen selected");
          }
          if (source.icon) dispatch(setStreamIcon(source.icon))
          
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
            }).catch(async err => {
              console.log(err)
              dispatch(triggerAlert("Fatal Error Initializing Screen Share"));

              await cleanupStream(true);

              return reject("Error Capturing User Media");

            })

            streamRef.current = mediaStream;

            const videoTrack = mediaStream.getVideoTracks()[0]
           
            if (typeof produce === "function") {
              await produce("stream", videoTrack);

              if (mediaStream.getAudioTracks()[0]) {
                await produce("streamAudio", mediaStream.getAudioTracks()[0]);
              }
            }
            
            dispatch(setScreenSharing(true));

            dispatch(setStreamDetails({name: source.name, ...videoTrack.getSettings()}));
            // Listen for manual stream end (user stops sharing)
            const stopHandler = async () => {
              await cleanupStream(true);
            };
            // Only add once
            mediaStream.getVideoTracks().forEach((track) => {
              track.onended = stopHandler;
            });

            mediaStream.getAudioTracks().forEach((track) => {
              track.onended = stopHandler;
            });

          try {
            const audioStream = await startStream(source.id);
           
            if (audioStream) {
              await produce("streamAudio", audioStream.getAudioTracks()[0])
            }

             if (audioStream) {
              audioStream.getAudioTracks().forEach(track => {
                track.onended = stopHandler;
              })
            }

          } catch (error) {
            console.log(error);
            dispatch(triggerAlert("This Stream Failed To Establish An Audio Source", "error"))
          }

            resolve(mediaStream);

          } catch (err) {
            console.log(err)
            dispatch(throwScreenShareError("Failed to get screen stream"));

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

          const videoTrack = mediaStream.getVideoTracks()[0]

          if (typeof produce === "function") {

            await produce("stream", videoTrack);

            if (mediaStream.getAudioTracks()[0]) {
              await produce("streamAudio", mediaStream.getAudioTracks()[0]);
            }
          }

          dispatch(setScreenSharing(true));

          dispatch(setStreamDetails({name: 'Their Screen', ...videoTrack.getSettings()}));

          dispatch(setSelecting(false));
          // Listen for manual stream end (user stops sharing)
          const stopHandler = async () => {
            await cleanupStream();
          };
          mediaStream.getVideoTracks().forEach((track) => {
            track.onended = stopHandler;
          });
          mediaStream.getAudioTracks().forEach(track => {
            track.onended = stopHandler;
          })

          resolve(mediaStream);

        } catch (err) {
          console.log(err)
          dispatch(throwScreenShareError("Screen share cancelled or failed"));

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
