/**
 * Probe a URL for video duration (in seconds).
 * - YouTube links: uses IFrame Player API (no data API key required)
 * - Direct video links (mp4/webm/ogv): loads metadata via HTMLVideoElement
 *
 * @param {string} url
 * @param {number} timeoutMs optional timeout
 * @returns {Promise<number>} duration in seconds
 */
export function probeVideoDuration(url, timeoutMs = 10000) {
  const ytId = extractYouTubeId(url);
  return ytId ? probeYouTubeDuration(ytId, timeoutMs)
              : probeFileDuration(url, timeoutMs);
}

/* ---------------------- Direct file probe ---------------------- */

function probeFileDuration(src, timeoutMs) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    let done = false;
    const finish = (ok, val) => {
      if (done) return;
      done = true;
      // stop further loading + cleanup
      try { video.removeAttribute('src'); video.load(); } catch {}
      video.remove();
      ok ? resolve(val) : reject(val);
    };

    const timer = setTimeout(() => finish(false, new Error('Timeout loading metadata')), timeoutMs);

    video.preload = 'metadata';
    video.muted = true;                       // avoid autoplay prompts
    video.playsInline = true;
    video.crossOrigin = 'anonymous';          // helps if server allows CORS

    video.addEventListener('loadedmetadata', () => {
      clearTimeout(timer);
      const dur = Number(video.duration);
      if (!Number.isFinite(dur) || dur <= 0) {
        finish(false, new Error('Could not determine duration'));
      } else {
        finish(true, dur);
      }
    }, { once: true });

    video.addEventListener('error', () => {
      clearTimeout(timer);
      finish(false, new Error('Failed to load video metadata'));
    }, { once: true });

    // Attach and start loading
    video.style.display = 'none';
    document.body.appendChild(video);
    video.src = src;
    // Some browsers need an explicit load() to fetch metadata promptly
    try { video.load(); } catch {}
  });
}

/* ---------------------- YouTube probe ---------------------- */

function probeYouTubeDuration(videoId, timeoutMs) {
  return new Promise(async (resolve, reject) => {
    try {
      await ensureYouTubeIframeAPI(timeoutMs);
    } catch (e) {
      reject(new Error('YouTube IFrame API failed to load'));
      return;
    }

    const holder = document.createElement('div');
    holder.style.cssText = 'position:absolute;left:-99999px;top:-99999px;width:0;height:0;overflow:hidden;';
    document.body.appendChild(holder);

    let finished = false;
    const finish = (ok, val, player) => {
      if (finished) return;
      finished = true;
      try { player?.destroy(); } catch {}
      holder.remove();
      ok ? resolve(val) : reject(val);
    };

    const timer = setTimeout(() => finish(false, new Error('Timeout getting YouTube duration')), timeoutMs);

    // eslint-disable-next-line no-undef
    const player = new YT.Player(holder, {
      videoId,
      playerVars: {
        autoplay: 0, controls: 0, modestbranding: 1, playsinline: 1,
      },
      events: {
        onReady: () => {
          try {
            // getDuration() returns seconds (can be 0 briefly until ready)
            const dur = Number(player.getDuration());
            clearTimeout(timer);
            if (!Number.isFinite(dur) || dur <= 0) {
              // A tiny delay/retry can help for shorts/slow connections
              setTimeout(() => {
                const d2 = Number(player.getDuration());
                if (!Number.isFinite(d2) || d2 <= 0) {
                  finish(false, new Error('Could not determine YouTube duration'), player);
                } else {
                  finish(true, d2, player);
                }
              }, 250);
            } else {
              finish(true, dur, player);
            }
          } catch (e) {
            clearTimeout(timer);
            finish(false, e, player);
          }
        },
        onError: () => {
          clearTimeout(timer);
          finish(false, new Error('YouTube player error'), player);
        },
      },
    });
  });
}

function ensureYouTubeIframeAPI(timeoutMs) {
  return new Promise((resolve, reject) => {
    if (window.YT?.Player) return resolve();

    const onReady = () => resolve();
    const timer = setTimeout(() => reject(new Error('YouTube API load timeout')), timeoutMs);

    window.onYouTubeIframeAPIReady = () => {
      clearTimeout(timer);
      onReady();
    };

    const s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    s.async = true;
    s.onerror = () => {
      clearTimeout(timer);
      reject(new Error('Failed to load YouTube IFrame API'));
    };
    document.head.appendChild(s);
  });
}

/* ---------------------- Utilities ---------------------- */

function extractYouTubeId(u) {
  try {
    const url = new URL(u);
    if (/^(?:www\.)?youtube\.com$/.test(url.hostname)) {
      if (url.pathname === '/watch') return url.searchParams.get('v');
      if (url.pathname.startsWith('/embed/')) return url.pathname.split('/')[2];
      if (url.pathname.startsWith('/shorts/')) return url.pathname.split('/')[2];
    }
    if (/^(?:youtu\.be)$/.test(url.hostname)) {
      return url.pathname.slice(1);
    }
  } catch {}
  return null;
}
