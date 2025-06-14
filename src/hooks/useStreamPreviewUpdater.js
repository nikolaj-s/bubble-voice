import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updatePreview, clearPreview } from "../features/StreamPreview/streamPreviewSlice";

const getAverageColor = (ctx, width, height) => {
  try {
    const { data } = ctx.getImageData(0, 0, width, height);
    let r = 0, g = 0, b = 0;
    const count = data.length / 4;
    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }
    r = Math.round(r / count);
    g = Math.round(g / count);
    b = Math.round(b / count);
    // Convert to hex string
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)}`;
    return hex;
  } catch {
    return "#000000";
  }
};

export const useStreamPreviewUpdater = ({ user_id, isStreaming }) => {
  const dispatch = useDispatch();
  const timerRef = useRef();
  const initialTimeoutRef = useRef();
  const pollTimeoutRef = useRef();

  useEffect(() => {
    if (!user_id || !isStreaming) {
      dispatch(clearPreview({ user_id }));
      return;
    }

    let didGrab = false;
    let maxPolls = 20; // poll up to 4 seconds (20 * 200ms)

    const grabFrame = async () => {
      const video = document.getElementById(`video-stream-source-for-${user_id}`);
      if (!video) return;

      // Only proceed if video has data loaded
      if (video.readyState < 2 && maxPolls > 0) {
        maxPolls--;
        pollTimeoutRef.current = setTimeout(grabFrame, 200);
        return;
      }

      let wasPaused = video.paused;
      try {
        if (wasPaused) {
          await video.play();
        }

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 300;
        canvas.height = 200;

        // First, fill with black and draw the frame to get avg color
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, 300, 200);

        const videoAR = video.videoWidth / video.videoHeight;
        const canvasAR = 300 / 200;

        let drawWidth, drawHeight, dx, dy;
        if (videoAR > canvasAR) {
          drawWidth = 300;
          drawHeight = 300 / videoAR;
          dx = 0;
          dy = (200 - drawHeight) / 2;
        } else {
          drawHeight = 200;
          drawWidth = 200 * videoAR;
          dx = (300 - drawWidth) / 2;
          dy = 0;
        }

        ctx.drawImage(
          video,
          0,
          0,
          video.videoWidth,
          video.videoHeight,
          dx,
          dy,
          drawWidth,
          drawHeight
        );

        // Compute average color from this video frame
        const avgColor = getAverageColor(ctx, 300, 200);

        // Now: clear and fill with avgColor, then redraw the video on top
        ctx.clearRect(0, 0, 300, 200);
        ctx.fillStyle = avgColor;
        ctx.fillRect(0, 0, 300, 200);
        ctx.drawImage(
          video,
          0,
          0,
          video.videoWidth,
          video.videoHeight,
          dx,
          dy,
          drawWidth,
          drawHeight
        );

        const dataUri = canvas.toDataURL("image/jpeg", 0.7);
        dispatch(updatePreview({ user_id, dataUri, avgColor }));

        if (wasPaused) {
          video.pause();
        }
      } catch (err) {
        // Fail silently
      }
      didGrab = true;
    };


    // Delay initial grab to let video load
    initialTimeoutRef.current = setTimeout(() => {
      grabFrame();
      // Only set interval if we successfully grabbed once
      if (!didGrab) return;
      timerRef.current = setInterval(grabFrame, 3 * 60 * 1000);
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
      clearTimeout(initialTimeoutRef.current);
      clearTimeout(pollTimeoutRef.current);
      dispatch(clearPreview({ user_id }));
    };
    // eslint-disable-next-line
  }, [user_id, isStreaming, dispatch]);
};
