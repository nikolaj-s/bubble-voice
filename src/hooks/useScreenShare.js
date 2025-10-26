import { useDispatch, useSelector } from "react-redux";
import {
  setScreenSharing,
  setSelecting,
  clearScreenState,
  setStreamDetails,
  setStreamIcon,
} from "../features/ScreenShare/screenShareSlice";
import { setOverlay, closeOverlay } from "../features/Overlay/overlaySlice";
import { useRef, useCallback } from "react";
import {
  stopSharingScreen,
  throwScreenShareError,
} from "../features/Channel/MediaControl/mediaControlSlice";
import { useNativeAudioCapture } from "./useNativeAudioCapture";
import { triggerAlert } from "../features/Alerts/alertsSlice";

export const useScreenShare = ({ produce, closeProducer }) => {
  const isElectron = !!window?.electron?.ipcRenderer;
  const dispatch = useDispatch();

  const { isSharing, selecting } = useSelector(
    (state) => state.screenShareSlice
  );
  const { isScreenSharing, captureDesktopAudio } = useSelector(
    (state) => state.mediaControlSlice
  );

  const { startStream, stopStream, cleanupAll } = useNativeAudioCapture({
    disable: !isScreenSharing,
  });

  // current stream (never store in Redux)
  const streamRef = useRef(null);

  // --- helpers ---------------------------------------------------------------

  const stopHandler = useCallback(async () => {
    await cleanupStream(true);
  }, []); // defined later; lint is okay because function is hoisted by declaration order below

  const buildElectronConstraints = (sourceId) => ({
    audio: false, // desktop audio handled by native module when enabled
    video: {
      mandatory: {
        chromeMediaSource: "desktop",
        chromeMediaSourceId: sourceId,
        maxWidth: 960,
        maxHeight: 540,
        maxFrameRate: 30,
        cursor: "never",
      },
    },
  });

  const buildWebConstraints = () => ({
    video: {
      cursor: "never",
      width: { max: 960 },
      height: { max: 540 },
      frameRate: { max: 30 },
    },
    audio: true, // best-effort browser capture
  });

  const attachAndProduceTracks = useCallback(
    async (mediaStream) => {
      streamRef.current = mediaStream;

      const videoTrack = mediaStream.getVideoTracks()[0];
      if (typeof produce === "function" && videoTrack) {
        await produce("stream", videoTrack);
      }

      const audioTrack = mediaStream.getAudioTracks()[0];
      if (typeof produce === "function" && audioTrack) {
        await produce("streamAudio", audioTrack);
      }

      // watch for manual end
      const onEnded = () => stopHandler();
      mediaStream.getVideoTracks().forEach((t) => (t.onended = onEnded));
      mediaStream.getAudioTracks().forEach((t) => (t.onended = onEnded));

      return videoTrack;
    },
    [produce]
  );

  // --- cleanup ---------------------------------------------------------------

  const cleanupStream = async (autoClean) => {
    // stop tracks
    if (streamRef.current) {
      try {
        streamRef.current.getTracks().forEach((t) => t.stop());
      } catch {}
      streamRef.current = null;
    }

    // close producers
    if (typeof closeProducer === "function") {
      try {
        await closeProducer("stream");
      } catch {}
      try {
        await closeProducer("streamAudio");
      } catch {}
    }

    // stop any native audio capture
    try {
      cleanupAll();
    } catch {}

    // reset UI state
    dispatch(clearScreenState());

    if (autoClean) {
      dispatch(stopSharingScreen());
    }
  };

  // --- NEW: start directly with a provided electron source object -----------

  const startShareWithSource = useCallback(
    async (source) => {
      if (!source) throw new Error("No source provided");
      // prevent competing picks
      if (selecting) return;

      dispatch(setSelecting(true));
      dispatch(throwScreenShareError(null));

      try {
        if (source.icon) dispatch(setStreamIcon(source.icon));

        // 1) getUserMedia for the video
        const mediaStream = await navigator.mediaDevices
          .getUserMedia(buildElectronConstraints(source.id))
          .catch(async (err) => {
            console.error(err);
            dispatch(triggerAlert("Fatal Error Initializing Screen Share"));
            throw new Error("Error Capturing User Media");
          });

        // 2) attach / produce
        const videoTrack = await attachAndProduceTracks(mediaStream);

        // 3) set state
        dispatch(setScreenSharing(true));
        dispatch(
          setStreamDetails({
            name: source.name,
            ...videoTrack?.getSettings(),
          })
        );

        // 4) (Windows) optional: start PID-scoped audio and produce
        if (captureDesktopAudio) {
          try {
            const audioStream = await startStream(source.id); // your native path; returns MediaStream
            if (audioStream?.getAudioTracks()[0]) {
              await produce("streamAudio", audioStream.getAudioTracks()[0]);
              audioStream.getAudioTracks().forEach(
                (t) => (t.onended = () => stopHandler())
              );
            }
          } catch (error) {
            console.error(error);
            dispatch(
              triggerAlert(
                error?.message || "Unable to start audio capture",
                "error"
              )
            );
          }
        }

        return mediaStream;
      } catch (err) {
        console.error(err);
        dispatch(throwScreenShareError("Failed to get screen stream"));
        await cleanupStream(true);
        throw err;
      } finally {
        dispatch(setSelecting(false));
        dispatch(closeOverlay());
      }
    },
    [attachAndProduceTracks, captureDesktopAudio, selecting]
  );

  // --- electron: pick screen flow -------------------------------------------

  const pickScreen = useCallback(
    () =>
      new Promise(async (resolve, reject) => {
        if (!isElectron) return reject(new Error("Not running in Electron"));

        // always clean before picking
        await cleanupStream();
        if (selecting) return reject(new Error("Already selecting"));

        dispatch(setSelecting(true));
        dispatch(throwScreenShareError(null));
        dispatch(setOverlay("screenPicker"));

        const onSelected = async (e) => {
          const source = e.detail?.source;
          try {
            if (!source) {
              await cleanupStream(true);
              return reject("No screen selected");
            }
            const ms = await startShareWithSource(source);
            resolve(ms);
          } catch (err) {
            reject(err);
          }
        };

        window.addEventListener("bubble:screen-picker-selected", onSelected, {
          once: true,
        });
      }),
    [isElectron, startShareWithSource, selecting]
  );

  // --- web: direct getDisplayMedia ------------------------------------------

  const pickScreenWeb = useCallback(async () => {
    await cleanupStream();
    dispatch(setSelecting(true));
    dispatch(throwScreenShareError(null));

    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia(
        buildWebConstraints()
      );

      const videoTrack = await attachAndProduceTracks(mediaStream);

      dispatch(setScreenSharing(true));
      dispatch(
        setStreamDetails({ name: "Their Screen", ...videoTrack?.getSettings() })
      );

      return mediaStream;
    } catch (err) {
      console.log(err);
      dispatch(throwScreenShareError("Screen share cancelled or failed"));
      await cleanupStream();
      throw err;
    } finally {
      dispatch(setSelecting(false));
    }
  }, [attachAndProduceTracks]);

  // --- public toggle ---------------------------------------------------------

  const handleScreenShare = async (enable) => {
    if (!enable) {
      await cleanupStream();
      return;
    }
    try {
      if (isElectron) {
        await pickScreen();
      } else {
        await pickScreenWeb();
      }
    } catch {
      // already handled
    }
  };

  return {
    handleScreenShare,   // toggle path (electron picker or web picker)
    startShareWithSource, // NEW: call directly with { id, name, icon }
    pickScreen,          // electron picker promise (still exposed)
    cleanupStream,
    isSharing,
    selecting,
    streamRef,
  };
};
