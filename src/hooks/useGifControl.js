// src/hooks/useGifControl.js
import { useRef, useEffect, useCallback } from 'react';
import { gifRegistry }                  from '../lib/GifRegistry';

/**
 * Hook to pause/play only GIFs by swapping to a static frame, if CORS allows.
 *
 * @param {{ scale?: number }} options — fraction (0<scale≤1) to scale down pause frame
 * @returns {{ ref, pause, play }}
 */
export function useGifControl({ scale = 1 } = {}) {
  const imgRef    = useRef(null);
  const staticRef = useRef(null);

  // Only operate on .gif URLs
  const isGif = src => /\.gif($|\?|\#)/i.test(src);

  // Pause the GIF (draw static frame or hide)
  const pause = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;

    const animatedSrc = img.dataset.animatedSrc;
    if (!isGif(animatedSrc)) return;

    // capture static frame once
    if (!staticRef.current) {
      try {
        const w = img.naturalWidth  * scale;
        const h = img.naturalHeight * scale;
        const canvas = document.createElement('canvas');
        canvas.width  = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        staticRef.current = canvas.toDataURL('image/png');
      } catch (err) {
        console.warn('GIF capture failed (tainted?):', err);
        staticRef.current = null;
      }
    }

    if (staticRef.current) {
      img.src = staticRef.current;
      img.style.visibility = 'visible';
    } else {
      // fallback: hide to stop animation
      img.style.visibility = 'hidden';
    }
  }, [scale]);

  // Resume the GIF
  const play = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;

    const animatedSrc = img.dataset.animatedSrc;
    if (!isGif(animatedSrc)) return;

    img.src = animatedSrc;
    img.style.visibility = 'visible';
  }, []);

  // Only register this controller if we actually have a GIF img
  useEffect(() => {
    if (!imgRef.current) return;
    // double-check it’s a GIF
    if (!isGif(imgRef.current.dataset.animatedSrc)) return;

    const controller = { pause, play };
    gifRegistry.register(controller);
    return () => gifRegistry.unregister(controller);
  }, [pause, play]);

  // Ref callback: only set up CORS / data-attrs for GIFs
  const ref = useCallback(node => {
    if (!node) return;
    const src = node.src;
    if (!isGif(src)) {
      imgRef.current = null;
      return;
    }
    // allow canvas readback if server CORS permits
    node.crossOrigin = 'anonymous';
    // stash original URL for play()
    node.dataset.animatedSrc = src;
    node.style.visibility = 'visible';
    imgRef.current = node;
  }, []);

  return { ref, pause, play };
}
