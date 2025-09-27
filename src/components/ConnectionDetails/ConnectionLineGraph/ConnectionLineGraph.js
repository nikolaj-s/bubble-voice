// ConnectionLineGraph.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ConnectionLineGraph.module.css';

const METRICS = [
  { key: 'ping', label: 'Ping', unit: 'ms', capKey: 'pingMax' },
  { key: 'jitter', label: 'Jitter', unit: 'ms', capKey: 'jitterMax' },
  { key: 'packetLossUp', label: 'Loss ↑', unit: '%', capKey: 'lossMax' },
  { key: 'packetLossDown', label: 'Loss ↓', unit: '%', capKey: 'lossMax' },
  { key: 'bitrateUp', label: 'Up', unit: 'kbps', capKey: 'bitrateUpMax' },
  { key: 'bitrateDown', label: 'Down', unit: 'kbps', capKey: 'bitrateDownMax' },
];

const DEFAULT_SCALES = {
  pingMax: 300,
  jitterMax: 100,
  lossMax: 10,
  bitrateUpMax: 6000,
  bitrateDownMax: 8000,
};

const WINDOW_MS = 30_000; // 30s
const STORAGE_PREFIX = 'bubble_conn_graph_v1:'; // bump version if schema changes

export default function ConnectionLineGraph({
  sample,
  width = 200,
  height = 92,
  metric = 'ping',
  scales = DEFAULT_SCALES,
  smooth = true,
  showTabs = true,
  storageKey = 'default', // ← namespace for this graph (e.g., `${serverId}:${channelId}`)
}) {
  const canvasRef = useRef(null);

  // in-memory buffers used for rendering
  const dataRef = useRef([]); // selected metric only (array of {ts, value})
  const lastTsRef = useRef(0);

  // persisted buffers for ALL metrics: { metricKey: Array<{ts,value}> }
  const storeRef = useRef(initEmptyStore());
  const lastSaveRef = useRef(0);

  const [selected, setSelected] = useState(metric);

  // keep external metric prop in sync if it changes
  useEffect(() => setSelected(metric), [metric]);

  // Load from sessionStorage on mount / when storageKey changes
  useEffect(() => {
    const key = makeKey(storageKey);
    const loaded = safeLoad(key) || initEmptyStore();
    // prune anything older than window (in case we re-open much later)
    const cutoff = Date.now() - WINDOW_MS;
    for (const m of METRICS) {
      loaded[m.key] = (loaded[m.key] || []).filter(p => p.ts >= cutoff);
    }
    storeRef.current = loaded;
    dataRef.current = loaded[selected] || [];
    // eslint-disable-next-line
  }, [storageKey, selected]);

  // Push incoming sample: update ALL metric buffers, then render the selected
  useEffect(() => {
    if (!sample) return;
    const ts = typeof sample.ts === 'number' ? sample.ts : Date.now();
    lastTsRef.current = ts;

    const cutoff = ts - WINDOW_MS;
    const store = storeRef.current;

    // update each metric if present
    for (const m of METRICS) {
      const val = sample[m.key];
      if (typeof val === 'number' && !Number.isNaN(val)) {
        const arr = store[m.key] || (store[m.key] = []);
        arr.push({ ts, value: val });
        // prune to window
        while (arr.length && arr[0].ts < cutoff) arr.shift();
      }
    }

    // set the currently selected series for draw/stats
    dataRef.current = store[selected] || [];

    // throttle persist (≤ 2 writes/sec)
    const now = performance.now();
    if (now - lastSaveRef.current > 500) {
      safeSave(makeKey(storageKey), store);
      lastSaveRef.current = now;
    }
  }, [sample, selected, storageKey]);

  // Redraw on changes
  useEffect(() => {
    draw();
    // eslint-disable-next-line
  }, [width, height, scales, selected, sample, storageKey, smooth]);

  const currentMetricMeta = useMemo(
    () => METRICS.find(m => m.key === selected) || METRICS[0],
    [selected]
  );

  const cap = useMemo(() => {
    const k = currentMetricMeta.capKey;
    return Math.max(1, scales[k] ?? DEFAULT_SCALES[k]); // avoid div-by-zero
  }, [currentMetricMeta, scales]);

  // expose min/max/now for the mini header
  const stats = useMemo(() => {
    const arr = dataRef.current;
    if (arr.length === 0) return { now: null, min: null, max: null };
    let min = Infinity, max = -Infinity;
    for (const p of arr) {
      if (p.value < min) min = p.value;
      if (p.value > max) max = p.value;
    }
    return { now: arr[arr.length - 1].value, min, max };
  }, [sample, selected, storageKey]);

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Colors from CSS variables (fallbacks included)
    const getVar = (name, fallback) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

    const bg = getVar('--card-background-color', '#1d2d44');
    const grid = 'rgba(255,255,255,0.08)';
    const stroke = getVar('--button-background', '#5c9dbd');
    const fill = getVar('--accent-color', '#3b7a6e');

    // Background
    roundRect(ctx, 0, 0, width, height, 10);
    ctx.fillStyle = bg;
    ctx.fill();

    // Grid lines (horizontal thirds)
    ctx.strokeStyle = grid;
    ctx.lineWidth = 1;
    ctx.beginPath();
    const padL = 6, padR = 2, padT = 4, padB = 16;
    const plotW = width - padL - padR;
    const plotH = height - padT - padB;
    for (let i = 1; i <= 2; i++) {
      const y = padT + (plotH * i) / 3;
      ctx.moveTo(padL, y);
      ctx.lineTo(width - padR, y);
    }
    ctx.stroke();

    // X axis labels: -30s, -15s, now
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.font = '10px Inter, system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('-30s', padL, height - 4);
    ctx.textAlign = 'center';
    ctx.fillText('-15s', padL + plotW / 2, height - 4);
    ctx.textAlign = 'right';
    ctx.fillText('now', width - padR, height - 4);

    // Build path
    const arr = dataRef.current;
    if (arr.length < 2) return;

    const nowTs = lastTsRef.current || Date.now();

    const xForTs = (ts) => {
      const t = (ts - (nowTs - WINDOW_MS)) / WINDOW_MS; // 0..1
      return padL + Math.max(0, Math.min(1, t)) * plotW;
    };
    const yForVal = (val) => {
      const n = Math.max(0, Math.min(1, val / cap)); // clamp
      return padT + (1 - n) * plotH; // invert
    };

    // Optional smoothing (EMA)
    const alpha = 0.35;
    let ema = arr[0].value;
    const pts = arr.map(({ ts, value }) => {
      if (smooth) ema = alpha * value + (1 - alpha) * ema;
      const v = smooth ? ema : value;
      return { x: xForTs(ts), y: yForVal(v) };
    });

    // Area fill
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.lineTo(pts[pts.length - 1].x, padT + plotH);
    ctx.lineTo(pts[0].x, padT + plotH);
    ctx.closePath();
    ctx.fillStyle = hexToRgba(fill || '#3b7a6e', 0.18);
    ctx.fill();

    // Stroke
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.strokeStyle = stroke || '#5c9dbd';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Current dot
    const last = pts[pts.length - 1];
    ctx.beginPath();
    ctx.arc(last.x, last.y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = stroke || '#5c9dbd';
    ctx.fill();
  }

  return (
    <div className={styles.container} style={{ width }}>
      <div className={styles.topRow}>
        <div className={styles.title}>Connection • {currentMetricMeta.label}</div>
        <div className={styles.now}>
          {stats.now != null ? `${formatNum(stats.now)} ${currentMetricMeta.unit}` : '—'}
        </div>
      </div>

      <canvas ref={canvasRef} className={styles.canvas} />

      <div className={styles.bottomRow}>
        <div className={styles.minmax}>
          <span className={styles.mmLabel}>min</span>
          <span className={styles.mmVal}>{stats.min != null ? formatNum(stats.min) : '—'}</span>
          <span className={styles.sep}>•</span>
          <span className={styles.mmLabel}>max</span>
          <span className={styles.mmVal}>{stats.max != null ? formatNum(stats.max) : '—'}</span>
        </div>

        {showTabs && (
          <div className={styles.tabs}>
            {METRICS.map(m => (
              <button
                key={m.key}
                className={`${styles.tab} ${selected === m.key ? styles.active : ''}`}
                onClick={() => {
                  setSelected(m.key);
                  // switch to the already-persisted series for that metric
                  dataRef.current = (storeRef.current[m.key] || []);
                }}
                title={m.label}
              >
                {m.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

ConnectionLineGraph.propTypes = {
  sample: PropTypes.shape({
    ping: PropTypes.number,
    jitter: PropTypes.number,
    packetLossUp: PropTypes.number,
    packetLossDown: PropTypes.number,
    bitrateUp: PropTypes.number,
    bitrateDown: PropTypes.number,
    ts: PropTypes.number,
  }),
  width: PropTypes.number,
  height: PropTypes.number,
  metric: PropTypes.oneOf(METRICS.map(m => m.key)),
  scales: PropTypes.shape({
    pingMax: PropTypes.number,
    jitterMax: PropTypes.number,
    lossMax: PropTypes.number,
    bitrateUpMax: PropTypes.number,
    bitrateDownMax: PropTypes.number,
  }),
  smooth: PropTypes.bool,
  showTabs: PropTypes.bool,
  storageKey: PropTypes.string,
};

// ---------------- helpers ----------------
function initEmptyStore() {
  const obj = {};
  for (const m of METRICS) obj[m.key] = [];
  return obj;
}

function makeKey(ns) {
  return `${STORAGE_PREFIX}${ns}`;
}

function safeLoad(key) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // light schema guard
    if (typeof parsed !== 'object' || !parsed) return null;
    for (const m of METRICS) {
      if (!Array.isArray(parsed[m.key])) parsed[m.key] = [];
      else parsed[m.key] = parsed[m.key]
        .filter(p => p && typeof p.ts === 'number' && typeof p.value === 'number' && !Number.isNaN(p.value));
    }
    return parsed;
  } catch {
    return null;
  }
}

function safeSave(key, storeObj) {
  try {
    sessionStorage.setItem(key, JSON.stringify(storeObj));
  } catch {
    // storage quota errors etc. — ignore
  }
}

function roundRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function hexToRgba(hex, a = 1) {
  if (!hex) return `rgba(0,0,0,${a})`;
  const c = hex.replace('#', '');
  const bigint = parseInt(c.length === 3 ? c.split('').map(ch => ch + ch).join('') : c, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r},${g},${b},${a})`;
}

function formatNum(n) {
  if (n == null || Number.isNaN(n)) return '—';
  if (n >= 1000 && Number.isFinite(n)) return Math.round(n).toLocaleString();
  if (n >= 100) return Math.round(n);
  if (n >= 10) return (Math.round(n * 10) / 10).toFixed(1);
  return (Math.round(n * 100) / 100).toFixed(2);
}
