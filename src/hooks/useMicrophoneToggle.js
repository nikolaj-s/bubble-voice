import { useRef, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  throwMicrophoneError,
  toggleMediaControlLoading,
} from "../features/Channel/MediaControl/mediaControlSlice"; // Update the path
// Import your own logic here:
// import { getMicrophoneMedia, produce, pauseProducer, closeProducer } from "...";

export const useMicrophoneToggle = ({
  echoCancellation,
  autoGainControl,
  noiseSuppression,
  getMicrophoneMedia,
  produce,
  pauseProducer,
  closeProducer,
  debounceMs = 350,
}) => {
  const dispatch = useDispatch();
  const timerRef = useRef();

  const debouncedToggle = useCallback(
    (state, selectedMicrophone) => {
      if (timerRef.current) clearTimeout(timerRef.current);
    //  console.log(`changing microphone state of ${selectedMicrophone?.deviceId} is muted ${state}`)
      timerRef.current = setTimeout(async () => {
        dispatch(throwMicrophoneError(false));
        dispatch(toggleMediaControlLoading(true));

        if (state) {
          await closeProducer("microphone");
        } else {
          const track = await getMicrophoneMedia(
            selectedMicrophone?.deviceId,
            echoCancellation,
            autoGainControl,
            noiseSuppression
          );

          if (track.error) {
            dispatch(throwMicrophoneError(track.errorMessage));
            return dispatch(toggleMediaControlLoading(false));
          }

          await produce("microphone", track);
          await pauseProducer("microphone");
        }

        dispatch(toggleMediaControlLoading(false));
      }, debounceMs);
    },
    [
      dispatch,
      echoCancellation,
      autoGainControl,
      noiseSuppression,
      getMicrophoneMedia,
      produce,
      pauseProducer,
      closeProducer,
      debounceMs,
    ]
  );

  // Optional: clear timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return debouncedToggle;
};
