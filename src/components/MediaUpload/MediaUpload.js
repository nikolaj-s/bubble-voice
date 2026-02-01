// MediaUpload.jsx
import React from "react";
import PropTypes from "prop-types";
import { Upload, Play, Pause, Film, Volume2, X } from "lucide-react";
import styles from "./MediaUpload.module.css";
import ProgressBar from "../ui/ProgressBar/ProgressBar";

/**
 * MediaUpload
 * - If Electron IPC is available (window.bubbleMediaUpload), uses FFmpeg main-process optimization
 * - Otherwise falls back to browser MediaRecorder optimization
 *
 * Callbacks:
 *   onChange({ file, meta }) | null
 *   onThumbnail({ blob, file, dataUrl, meta })  (best-effort; requires read helpers in Electron)
 *   onError(string)
 *   onFileName(string)
 */
export default function MediaUpload({
  title = "Upload Media",
  maxSizeMB = 8,
  accept = "audio/*,video/*",
  onChange,
  onThumbnail,
  onDuration,
  onError,
  onFileName,
  disabled = false,
  className = "",
  autoOptimize = true,
}) {
  const maxBytes = maxSizeMB * 1024 * 1024;

  const fileInputRef = React.useRef(null);
  const mediaRef = React.useRef(null);

  const mountedRef = React.useRef(false);
  const cancelRef = React.useRef(null);
  const objectUrlRef = React.useRef("");

  const [originalFile, setOriginalFile] = React.useState(null);
  const [optimizedFile, setOptimizedFile] = React.useState(null);

  const [objectUrl, setObjectUrl] = React.useState("");
  const [mediaType, setMediaType] = React.useState(null); // "audio" | "video"
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const [busy, setBusy] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [progress, setProgress] = React.useState(0); // 0..1

  const isElectronOptimizeAvailable =
    !!window?.bubbleMediaUpload?.startOptimization &&
    !!window?.bubbleMediaUpload?.onOptimizationEvent &&
    !!window?.bubbleMediaUpload?.cancelOptimization;

  const safeSet = (fn) => mountedRef.current && fn();

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;

      try {
        cancelRef.current?.();
      } catch {}
      cancelRef.current = null;

      try {
        const el = mediaRef.current;
        if (el) {
          el.pause?.();
          el.src = "";
        }
      } catch {}

      try {
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      } catch {}
      objectUrlRef.current = "";
    };
  }, []);

  const shownFile = optimizedFile || originalFile;
  const sizeLabel = shownFile ? formatBytes(shownFile.size) : "—";

  const fail = (msg) => {
    const m = String(msg || "Something went wrong.");
    safeSet(() => {
      setStatus(m);
      setBusy(false);
      setProgress(0);
    });
    onError?.(m);
  };

  const pickFile = () => {
    if (disabled || busy) return;
    fileInputRef.current?.click();
  };

  const clear = () => {
    try {
      cancelRef.current?.();
    } catch {}
    cancelRef.current = null;

    safeSet(() => {
      setOriginalFile(null);
      setOptimizedFile(null);
      setMediaType(null);
      setDuration(0);
      setCurrentTime(0);
      setIsPlaying(false);
      setStatus("");
      setBusy(false);
      setProgress(0);
    });

    try {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    } catch {}
    objectUrlRef.current = "";
    safeSet(() => setObjectUrl(""));

    onChange?.(null);
  };

  const onSelected = async (e) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;

    // cancel any prior work
    try {
      cancelRef.current?.();
    } catch {}
    cancelRef.current = null;

    try {
      const kind = getMediaType(f);
      if (!kind) return fail("Please select an audio or video file.");

      onFileName?.(f.name);

      // Duration for heuristics + for Electron progress scaling
      const dur = kind === "video" ? await getVideoDuration(f) : await getAudioDuration(f);

      const viability = assessViability({ kind, duration: dur, maxBytes, maxSizeMB });
      if (!viability.ok) {
        clear();
        return fail(viability.reason);
      }

      safeSet(() => {
        setBusy(false);
        setStatus("");
        setProgress(0);
        setOriginalFile(f);
        setOptimizedFile(null);
        setMediaType(kind);
        setDuration(dur);
        onDuration?.(dur);
      });

      // preview URL uses original immediately
      try {
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      } catch {}
      const url = URL.createObjectURL(f);
      objectUrlRef.current = url;
      safeSet(() => setObjectUrl(url));

      onChange?.({
        file: f,
        meta: { source: "original", optimized: false, size: f.size, mime: f.type, kind },
      });

      if (kind === "video") {
        generateVideoThumbnail100(f)
          .then((thumb) => onThumbnail?.(thumb))
          .catch(() => {});
      }

      if (!autoOptimize) return;

      // Choose optimization path
      
      let path;

      if (isElectronOptimizeAvailable) {

        path = await window.bubbleMediaUpload.getPathForFile(f);

        f.path = path;
        console.log(path, f);
      }

      if (isElectronOptimizeAvailable && f?.path) {
        await optimizeViaElectron({ file: f, kind, durationSec: dur, maxBytes });
      } else {
        await optimizeViaBrowser({ file: f, kind, maxBytes });
      }
    } catch (err) {
      clear();
      fail(err?.message || "Failed to load media.");
    }
  };

  async function optimizeViaElectron({ file, kind, durationSec, maxBytes }) {
    const jobId = `mu_${Date.now()}_${Math.random().toString(16).slice(2)}`;

    safeSet(() => {
      setBusy(true);
      setStatus("Optimizing…");
      setProgress(0.02);
    });

    // listen to shared event channel; filter by jobId
    const off = window.bubbleMediaUpload.onOptimizationEvent((evt) => {
      if (!evt || evt.jobId !== jobId) return;

      if (evt.type === "status") {
        safeSet(() => setStatus(evt.data?.text || "Optimizing…"));
      }

      if (evt.type === "progress") {
        const p = Math.min(0.98, clamp01(evt.data?.value));
        safeSet(() => setProgress((prev) => Math.max(prev, p)));
      }

      if (evt.type === "error") {
        // handled by promise result too, but keep UI responsive
        safeSet(() => setStatus(evt.data?.message || "Optimization failed"));
      }
    });

    // cancel handler for unmount/clear
    cancelRef.current = () => {
      try {
        window.bubbleMediaUpload.cancelOptimization(jobId);
      } catch {}
      try {
        off?.();
      } catch {}
      throw new Error("Optimization cancelled");
    };

    const result = await window.bubbleMediaUpload.startOptimization({
      jobId,
      inputPath: file.path,
      kind,
      durationSec,
      maxBytes,
    });

    // stop listening
    try {
      off?.();
    } catch {}

    cancelRef.current = null;

    if (!result?.ok) {
      safeSet(() => {
        setBusy(false);
        setProgress(0);
      });
      return fail(result?.error || "Optimization failed");
    }

    // IMPORTANT: to return a real File to the renderer, you need a preload read helper.
    // We support it if present; otherwise we fall back to returning meta with paths.
    const outPath = result.outPath;
    const thumbPath = result.thumbPath || null;

    // Strict cap
    if (Number(result.outBytes) > maxBytes) {
      safeSet(() => {
        setBusy(false);
        setProgress(0);
      });
      clear();
      return fail(`Couldn’t compress this file under ${maxSizeMB}MB. Try a shorter clip.`);
    }

    let finalFile = null;

    if (typeof window.bubbleMediaUpload.readFileAsArrayBuffer === "function") {
      const buf = await window.bubbleMediaUpload.readFileAsArrayBuffer(outPath);
      const mime = kind === "video" ? "video/mp4" : "audio/mp4";
      const name = makeOutputName(file.name, "mp4");
      finalFile = new File([buf], name, { type: mime });
    }

    // Best-effort thumbnail (requires read helper)
    if (kind === "video" && thumbPath && typeof window.bubbleMediaUpload.readFileAsArrayBuffer === "function") {
      try {
        const tbuf = await window.bubbleMediaUpload.readFileAsArrayBuffer(thumbPath);
        const blob = new Blob([tbuf], { type: "image/webp" });
        const dataUrl = await blobToDataUrl(blob);
        onThumbnail?.({
          blob,
          file: new File([tbuf], "thumbnail-100x100.webp", { type: "image/webp" }),
          dataUrl,
          meta: { size: blob.size, type: "image/webp", width: 100, height: 100 },
        });
      } catch {}
    }

    safeSet(() => {
      setStatus("Optimized!");
      setProgress(1);
      setBusy(false);
    });

    // Return optimized file if we could read it; otherwise return original + path meta
    if (finalFile) {
      onFileName?.(finalFile.name);

      // swap preview to optimized blob
      try {
        const nextUrl = URL.createObjectURL(finalFile);
        try {
          if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        } catch {}
        objectUrlRef.current = nextUrl;
        safeSet(() => setObjectUrl(nextUrl));
      } catch {}

      safeSet(() => setOptimizedFile(finalFile));

      onChange?.({
        file: finalFile,
        meta: {
          source: "optimized_electron_ffmpeg",
          optimized: true,
          size: finalFile.size,
          mime: finalFile.type,
          kind,
          details: { outPath, thumbPath },
        },
      });
    } else {
      // No read helper available — still useful if your upload layer can accept a path,
      // or if you later add readFileAsArrayBuffer to preload.
      onChange?.({
        file,
        meta: {
          source: "optimized_electron_ffmpeg_path_only",
          optimized: true,
          size: Number(result.outBytes),
          mime: kind === "video" ? "video/mp4" : "audio/mp4",
          kind,
          details: { outPath, thumbPath, note: "Add bubbleMediaUpload.readFileAsArrayBuffer to return a real File." },
        },
      });
    }

    setTimeout(() => safeSet(() => setProgress(0)), 700);
  }

  async function optimizeViaBrowser({ file, kind, maxBytes }) {
    safeSet(() => {
      setBusy(true);
      setStatus("Optimizing…");
      setProgress(0.02);
    });

    const { file: outFile, note, details } = await optimizeMediaToUnderBytesCancelable(
      file,
      maxBytes,
      (p) => {
        const capped = Math.min(0.98, clamp01(p));
        safeSet(() => setProgress((prev) => Math.max(prev, capped)));
      },
      (cancelFn) => {
        cancelRef.current = cancelFn;
      }
    );

    cancelRef.current = null;

    if (outFile && outFile.size > maxBytes) {
      clear();
      return fail(`Couldn’t compress this file under ${maxSizeMB}MB. Try a shorter clip.`);
    }

    const finalFile = outFile || file;

    if (finalFile !== file) {
      onFileName?.(finalFile.name);

      safeSet(() => setOptimizedFile(finalFile));

      try {
        const nextUrl = URL.createObjectURL(finalFile);
        try {
          if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        } catch {}
        objectUrlRef.current = nextUrl;
        safeSet(() => setObjectUrl(nextUrl));
      } catch {}

      if (kind === "video") {
        try {
          const thumb = await generateVideoThumbnail100(finalFile);
          onThumbnail?.(thumb);
        } catch {}
      }
    } else {
      safeSet(() => setOptimizedFile(null));
    }

    safeSet(() => {
      setStatus(note || "Ready!");
      setProgress(1);
      setBusy(false);
    });

    onChange?.({
      file: finalFile,
      meta: {
        source: finalFile !== file ? "optimized_browser" : "original",
        optimized: finalFile !== file,
        size: finalFile.size,
        mime: finalFile.type,
        kind,
        details: details || {},
        note: note || "",
      },
    });

    setTimeout(() => safeSet(() => setProgress(0)), 700);
  }

  const onLoadedMetadata = () => {
    const el = mediaRef.current;
    if (!el) return;
    safeSet(() => setDuration(Number.isFinite(el.duration) ? el.duration : duration));
  };

  const onTimeUpdate = () => {
    const el = mediaRef.current;
    if (!el) return;
    safeSet(() => setCurrentTime(el.currentTime || 0));
  };

  const togglePlay = () => {
    const el = mediaRef.current;
    if (!el || busy) return;
    if (isPlaying) el.pause();
    else el.play().catch(() => {});
  };

  const scrubTo = (v) => {
    const el = mediaRef.current;
    if (!el || !duration) return;
    const next = clamp(Number(v) || 0, 0, duration);
    el.currentTime = next;
    safeSet(() => setCurrentTime(next));
  };

  const Icon = mediaType === "video" ? Film : Volume2;

  return (
    <div className={`${styles.wrapper} ${className}`} data-disabled={disabled ? "true" : "false"}>
      <div className={styles.headerRow}>
        <div className={styles.titleRow}>
          <Icon size={16} className={styles.icon} />
          <div className={styles.titleText}>
            <div className={styles.title}>{title}</div>
            <div className={styles.subTitle}>
              {shownFile ? `${shownFile.name} • ${sizeLabel}` : "Upload an audio or video file to preview and optimize."}
            </div>
          </div>
        </div>

        <div className={styles.headerActions}>
          {originalFile ? (
            <button type="button" className={styles.ghostBtn} onClick={clear} disabled={disabled || busy}>
              <X size={16} />
              Clear
            </button>
          ) : (
            <button type="button" className={styles.primaryBtn} onClick={pickFile} disabled={disabled || busy}>
              <Upload size={16} />
              Upload
            </button>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={onSelected}
        style={{ display: "none" }}
        disabled={disabled || busy}
      />

      {originalFile && (
        <div className={styles.playerPanel}>
          {mediaType === "video" ? (
            <video
              ref={mediaRef}
              src={objectUrl}
              preload="metadata"
              className={styles.video}
              controls={false}
              playsInline
              onLoadedMetadata={onLoadedMetadata}
              onTimeUpdate={onTimeUpdate}
              onPlay={() => safeSet(() => setIsPlaying(true))}
              onPause={() => safeSet(() => setIsPlaying(false))}
            />
          ) : (
            <audio
              ref={mediaRef}
              src={objectUrl}
              preload="metadata"
              onLoadedMetadata={onLoadedMetadata}
              onTimeUpdate={onTimeUpdate}
              onPlay={() => safeSet(() => setIsPlaying(true))}
              onPause={() => safeSet(() => setIsPlaying(false))}
            />
          )}

          <div className={styles.controlsRow}>
            <button
              type="button"
              className={styles.playBtn}
              onClick={togglePlay}
              disabled={disabled || busy}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              {isPlaying ? "Pause" : "Play"}
            </button>

            <div className={styles.timePill}>
              <span>{formatTime(currentTime)}</span>
              <span className={styles.timeSep}>/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          <ProgressBar currentTime={currentTime} duration={duration} onSeek={scrubTo}  />
          

          {busy && (
            <div className={styles.progressWrap} aria-label="Optimization progress">
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: `${Math.round(progress * 100)}%` }} />
              </div>
              <div className={styles.progressText}>
                {progress >= 0.98 ? "Finalizing…" : `${Math.round(progress * 100)}%`}
              </div>
            </div>
          )}

          <div className={styles.bottomRow}>
            <div className={styles.status} aria-live="polite">
              {status}
            </div>
            <div className={styles.metaPill} title="Target max size">
              ≤ {maxSizeMB}MB
            </div>
          </div>

          <div className={styles.hint}>
            {isElectronOptimizeAvailable
              ? "Electron detected — using FFmpeg optimization."
              : "Browser mode — using in-browser optimization when possible."}
          </div>
        </div>
      )}
    </div>
  );
}

MediaUpload.propTypes = {
  title: PropTypes.string,
  maxSizeMB: PropTypes.number,
  accept: PropTypes.string,
  onChange: PropTypes.func,
  onThumbnail: PropTypes.func,
  onError: PropTypes.func,
  onFileName: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  autoOptimize: PropTypes.bool,
};

/* =========================
   Viability heuristics
   ========================= */

function assessViability({ kind, duration, maxBytes, maxSizeMB }) {
  const dur = Math.max(0, Number(duration) || 0);
  if (dur <= 0.05) return { ok: false, reason: "That file looks empty or unsupported." };

  // Conservative floors for "can we ever fit" checks
  const audioMinBps = 24000;
  const videoMinBps = 200000;
  const videoAudioMinBps = 24000;

  const minTotalBps = kind === "audio" ? audioMinBps : videoMinBps + videoAudioMinBps;
  const minPossibleBytes = (dur * minTotalBps) / 8;

  if (minPossibleBytes > maxBytes * 1.05) {
    const suggested = kind === "audio" ? "shorter audio" : "shorter video (or trim it)";
    return {
      ok: false,
      reason: `This ${kind} is too long to reasonably compress under ${maxSizeMB}MB. Try ${suggested}.`,
    };
  }

  // Guardrails (client + electron sanity)
  if (kind === "video" && dur > 240) return { ok: false, reason: "Please upload a clip under 4 minutes." };
  if (kind === "audio" && dur > 900) return { ok: false, reason: "Please upload audio under 15 minutes." };

  return { ok: true };
}

/* =========================
   Browser optimization (cancelable)
   ========================= */

function getMediaType(file) {
  const t = file?.type || "";
  if (t.startsWith("video/")) return "video";
  if (t.startsWith("audio/")) return "audio";
  return null;
}

async function optimizeMediaToUnderBytesCancelable(file, maxBytes, onProgress, setCancelFn) {
  if (file.size <= maxBytes) {
    onProgress?.(1);
    return { file, note: "Already under size limit.", details: { bypassed: true } };
  }
  if (typeof MediaRecorder === "undefined") {
    onProgress?.(1);
    return { file, note: "Optimization not supported here. Using original.", details: { reason: "MediaRecorder unavailable" } };
  }

  const kind = getMediaType(file);
  if (!kind) {
    onProgress?.(1);
    return { file, note: "Unsupported file type.", details: { reason: "unsupported" } };
  }

  if (kind === "audio") return optimizeAudioWebmCancelable(file, maxBytes, onProgress, setCancelFn);
  return optimizeVideoWebmCancelable(file, maxBytes, onProgress, setCancelFn);
}

async function optimizeAudioWebmCancelable(file, maxBytes, onProgress, setCancelFn) {
  const mime =
    (MediaRecorder.isTypeSupported?.("audio/webm;codecs=opus") && "audio/webm;codecs=opus") ||
    (MediaRecorder.isTypeSupported?.("audio/webm") && "audio/webm") ||
    "";

  if (!mime) {
    onProgress?.(1);
    return { file, note: "Audio optimization not supported in this browser.", details: { reason: "no audio/webm support" } };
  }

  const duration = await getAudioDuration(file);
  const targetBps = clamp(estimateTargetBitrate(duration, maxBytes), 24000, 192000);

  const passes = [
    targetBps,
    clamp(Math.floor(targetBps * 0.7), 24000, 128000),
    clamp(Math.floor(targetBps * 0.55), 24000, 96000),
  ];

  let best = null;

  for (let i = 0; i < passes.length; i++) {
    const out = await encodeAudioToWebmOpusCancelable(file, {
      mimeType: mime,
      bitrate: passes[i],
      duration,
      onProgress: (p) => {
        const base = i / passes.length;
        const span = 1 / passes.length;
        onProgress?.(base + p * span);
      },
      setCancelFn,
    });

    if (!best || out.blob.size < best.blob.size) best = out;
    if (out.blob.size <= maxBytes) break;
  }

  const outFile = new File([best.blob], makeOutputName(file.name, "webm"), { type: best.blob.type || "audio/webm" });
  return {
    file: outFile,
    note: outFile.size <= maxBytes ? "Optimized!" : "Optimized, but still over limit — consider a shorter clip.",
    details: { duration, bitrate: best.bitrate },
  };
}

async function optimizeVideoWebmCancelable(file, maxBytes, onProgress, setCancelFn) {
  const mime =
    (MediaRecorder.isTypeSupported?.("video/webm;codecs=vp9,opus") && "video/webm;codecs=vp9,opus") ||
    (MediaRecorder.isTypeSupported?.("video/webm;codecs=vp8,opus") && "video/webm;codecs=vp8,opus") ||
    (MediaRecorder.isTypeSupported?.("video/webm") && "video/webm") ||
    "";

  if (!mime) {
    onProgress?.(1);
    return { file, note: "Video optimization not supported in this browser.", details: { reason: "no video/webm support" } };
  }

  const duration = await getVideoDuration(file);
  const targetTotalBps = clamp(estimateTargetBitrate(duration, maxBytes), 220000, 2500000);

  const passes = [
    { a: clamp(64000, 24000, 128000), v: clamp(targetTotalBps - 64000, 150000, 2400000) },
    { a: clamp(48000, 24000, 96000), v: clamp(Math.floor((targetTotalBps - 48000) * 0.7), 120000, 1400000) },
    { a: clamp(32000, 24000, 64000), v: clamp(Math.floor((targetTotalBps - 32000) * 0.55), 100000, 1000000) },
  ];

  let best = null;

  for (let i = 0; i < passes.length; i++) {
    const out = await transcodeVideoViaCaptureStreamCancelable(file, {
      mimeType: mime,
      videoBitsPerSecond: passes[i].v,
      audioBitsPerSecond: passes[i].a,
      duration,
      onProgress: (p) => {
        const base = i / passes.length;
        const span = 1 / passes.length;
        onProgress?.(base + p * span);
      },
      setCancelFn,
    });

    if (!best || out.blob.size < best.blob.size) best = out;
    if (out.blob.size <= maxBytes) break;
  }

  const outFile = new File([best.blob], makeOutputName(file.name, "webm"), { type: best.blob.type || "video/webm" });
  return {
    file: outFile,
    note: outFile.size <= maxBytes ? "Optimized!" : "Optimized, but still over limit — consider a shorter clip.",
    details: { duration, videoBps: best.videoBps, audioBps: best.audioBps, mime },
  };
}

/* =========================
   Browser media helpers
   ========================= */

async function getAudioDuration(file) {
  const buf = await file.arrayBuffer();
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  try {
    const decoded = await ctx.decodeAudioData(buf);
    return decoded.duration || 1;
  } finally {
    try {
      await ctx.close();
    } catch {}
  }
}

async function getVideoDuration(file) {
  const url = URL.createObjectURL(file);
  try {
    const v = document.createElement("video");
    v.src = url;
    v.muted = true;
    v.playsInline = true;
    await waitFor(v, "loadedmetadata");
    return v.duration || 1;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function estimateTargetBitrate(durationSeconds, maxBytes) {
  const secs = Math.max(1, Number(durationSeconds) || 1);
  return Math.floor((maxBytes * 8 * 0.92) / secs);
}

async function encodeAudioToWebmOpusCancelable(file, { mimeType, bitrate, duration, onProgress, setCancelFn }) {
  const arrayBuf = await file.arrayBuffer();
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const decoded = await ctx.decodeAudioData(arrayBuf);

  const source = ctx.createBufferSource();
  source.buffer = decoded;

  const dest = ctx.createMediaStreamDestination();
  source.connect(dest);

  const recorder = new MediaRecorder(dest.stream, {
    mimeType: mimeType || undefined,
    audioBitsPerSecond: bitrate,
  });

  const chunks = [];
  recorder.ondataavailable = (e) => e.data?.size && chunks.push(e.data);

  let cancelled = false;
  const cancel = () => {
    cancelled = true;
    try {
      recorder.state !== "inactive" && recorder.stop();
    } catch {}
    try {
      source.stop();
    } catch {}
    try {
      ctx.close();
    } catch {}
  };
  setCancelFn?.(cancel);

  const stopped = new Promise((resolve, reject) => {
    recorder.onstop = () => (cancelled ? reject(new Error("Optimization cancelled")) : resolve());
    recorder.onerror = () => reject(new Error("MediaRecorder error while optimizing audio"));
  });

  const dur = Math.max(0.5, Number(duration) || decoded.duration || 1);
  const startAt = performance.now();
  const tick = setInterval(() => {
    const t = (performance.now() - startAt) / 1000;
    onProgress?.(clamp01(t / dur));
  }, 120);

  recorder.start(250);
  source.start();

  await sleep(Math.ceil(dur * 1000) + 120).catch(() => {});
  try {
    recorder.state !== "inactive" && recorder.stop();
  } catch {}
  try {
    source.stop();
  } catch {}

  await stopped.finally(() => clearInterval(tick));

  try {
    await ctx.close();
  } catch {}

  return { blob: new Blob(chunks, { type: recorder.mimeType || "audio/webm" }), bitrate };
}

async function transcodeVideoViaCaptureStreamCancelable(
  file,
  { mimeType, videoBitsPerSecond, audioBitsPerSecond, duration, onProgress, setCancelFn }
) {
  const url = URL.createObjectURL(file);
  let recorder = null;
  let video = null;
  let cancelled = false;

  const cancel = () => {
    cancelled = true;
    try {
      recorder && recorder.state !== "inactive" && recorder.stop();
    } catch {}
    try {
      video && video.pause();
    } catch {}
    try {
      video && (video.src = "");
    } catch {}
    try {
      URL.revokeObjectURL(url);
    } catch {}
  };
  setCancelFn?.(cancel);

  try {
    video = document.createElement("video");
    video.src = url;
    video.muted = true;
    video.playsInline = true;

    await waitFor(video, "loadedmetadata");

    const stream = video.captureStream?.();
    if (!stream) throw new Error("This browser can’t optimize video in-browser.");

    recorder = new MediaRecorder(stream, {
      mimeType: mimeType || undefined,
      videoBitsPerSecond,
      audioBitsPerSecond,
    });

    const chunks = [];
    recorder.ondataavailable = (e) => e.data?.size && chunks.push(e.data);

    const dur = Math.max(0.5, Number(duration) || video.duration || 1);

    const onTU = () => onProgress?.(clamp01((video.currentTime || 0) / dur));
    video.addEventListener("timeupdate", onTU);

    const stopped = new Promise((resolve, reject) => {
      recorder.onstop = () => (cancelled ? reject(new Error("Optimization cancelled")) : resolve());
      recorder.onerror = () => reject(new Error("MediaRecorder error while optimizing video"));
    });

    recorder.start(250);
    await video.play().catch(() => {});
    await sleep(Math.ceil(dur * 1000) + 240);

    if (!cancelled) {
      try {
        recorder.state !== "inactive" && recorder.stop();
      } catch {}
    }

    await stopped.finally(() => {
      video.removeEventListener("timeupdate", onTU);
      try {
        video.pause();
      } catch {}
    });

    const blob = new Blob(chunks, { type: recorder.mimeType || "video/webm" });
    return { blob, videoBps: videoBitsPerSecond, audioBps: audioBitsPerSecond };
  } finally {
    try {
      URL.revokeObjectURL(url);
    } catch {}
  }
}

/* =========================
   Thumbnail generation (browser)
   ========================= */

async function generateVideoThumbnail100(file) {
  const url = URL.createObjectURL(file);
  try {
    const video = document.createElement("video");
    video.src = url;
    video.muted = true;
    video.playsInline = true;

    await waitFor(video, "loadedmetadata");
    const seekTime = Math.min(1, Math.max(0, (video.duration || 1) * 0.15));
    video.currentTime = seekTime;
    await waitFor(video, "seeked");

    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");

    const vw = video.videoWidth || 1;
    const vh = video.videoHeight || 1;
    const scale = Math.max(200 / vw, 200 / vh);
    const sw = 200 / scale;
    const sh = 200 / scale;
    const sx = (vw - sw) / 2;
    const sy = (vh - sh) / 2;

    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, 200, 200);

    const blob = await canvasToBlob(canvas, "image/webp", 0.8);
    const finalBlob = blob || (await canvasToBlob(canvas, "image/png"));

    const thumbFile = new File([finalBlob], "thumbnail-100x100.webp", { type: finalBlob.type || "image/webp" });
    const dataUrl = await blobToDataUrl(finalBlob);

    return {
      blob: finalBlob,
      file: thumbFile,
      dataUrl,
      meta: { size: finalBlob.size, type: finalBlob.type, width: 200, height: 200 },
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}

/* =========================
   Utilities
   ========================= */

function makeOutputName(originalName, ext = "mp4") {
  const base = String(originalName || "media").replace(/\.[^/.]+$/, "").slice(0, 60);
  return `${base}-bubble.${ext}`;
}

function clamp(n, min, max) {
  const v = Number(n) || 0;
  return Math.max(min, Math.min(max, v));
}
function clamp01(v) {
  const n = Number(v) || 0;
  return Math.max(0, Math.min(1, n));
}

function formatTime(t) {
  const sec = Math.max(0, Number(t) || 0);
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatBytes(bytes) {
  const b = Math.max(0, Number(bytes) || 0);
  if (b < 1024) return `${b} B`;
  const kb = b / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function waitFor(el, eventName) {
  return new Promise((resolve, reject) => {
    const onOk = () => cleanup(resolve);
    const onErr = () => cleanup(() => reject(new Error(`Failed to load media (${eventName})`)));

    const cleanup = (done) => {
      el.removeEventListener(eventName, onOk);
      el.removeEventListener("error", onErr);
      done();
    };

    el.addEventListener(eventName, onOk, { once: true });
    el.addEventListener("error", onErr, { once: true });
  });
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve) => {
    if (!canvas.toBlob) return resolve(null);
    canvas.toBlob((b) => resolve(b), type, quality);
  });
}

function blobToDataUrl(blob) {
  return new Promise((resolve) => {
    const r = new FileReader();
    r.onloadend = () => resolve(String(r.result || ""));
    r.readAsDataURL(blob);
  });
}
