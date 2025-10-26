// useNativeAudioCapture.js (renderer)
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export function useNativeAudioCapture(opts = {}) {

  const {platform} = useSelector(state => state.osSlice);

  const ipcRenderer = window?.electron?.ipcRenderer;

  if (!ipcRenderer || platform !== 'win32') {
    return {
      stream: null, id: null, sampleRate: null, channels: null, status: 'unsupported', error: 'Not in Electron',
      startStream: async () => { throw new Error(platform !== 'win32' ? "Audio Capture Only Supprted on Windows 10, build october 2023+" : 'Not in Electron'); },
      stopStream: async () => {},
      cleanupAll: async () => {}
    };
  }

  const workletUrl = useMemo(
    () => (opts.workletUrl ? opts.workletUrl : new URL('../audio/pcm-worklet.js', import.meta.url)),
    [opts.workletUrl]
  );

  const [stream, setStream] = useState(null);
  const [meta, setMeta] = useState({ id: null, sampleRate: null, channels: null });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const ctxRef  = useRef(null);
  const nodeRef = useRef(null);
  const idRef   = useRef(null);
  const portRef = useRef(null);

  const readyResolveRef = useRef(null);
  const readyRejectRef  = useRef(null);

  const stopStream = useCallback(async () => {
    const id = idRef.current;
    try { await ipcRenderer.invoke('audio:closeById', id); } catch {}

    try { portRef.current?.close(); } catch {}
    try { nodeRef.current?.disconnect(); } catch {}
    try { await ctxRef.current?.close(); } catch {}

    idRef.current = null;
    nodeRef.current = null;
    ctxRef.current = null;
    portRef.current = null;

    setStream(null);
    setMeta({ id: null, sampleRate: null, channels: null });
    setStatus('stopped');
  }, [ipcRenderer]);

  const cleanupAll = useCallback(async () => {
    try { await ipcRenderer.invoke('audio:closeAll'); } catch {}
    await stopStream();
  }, [ipcRenderer, stopStream]);

  const extractPidFromSourceId = (sourceId) => {
    if (!sourceId || typeof sourceId !== 'string') return null;
    const m = sourceId.match(/(\d+)/);
    const pid = m ? parseInt(m[1], 10) : NaN;
    return Number.isInteger(pid) && pid > 0 ? pid : null;
  };

  const startStream = useCallback(async (windowProcessIdStr) => {
    if (idRef.current) await stopStream();

    const pid = extractPidFromSourceId(windowProcessIdStr);
    if (!pid) {
      const msg = 'Invalid or missing PID in source id string.';
      setError(msg); setStatus('error'); throw new Error(msg);
    }

    setError(null);
    setStatus('starting');

    // One-shot window message handler to receive the transferred MessagePort
    const onWinMsg = async (e) => {
      const d = e.data;
      console.log(d);
      if (!d || d.__fromNativeAudio !== true || d.type !== 'audio:port') return;
      if (!e.ports || !e.ports[0]) { setError('No MessagePort received'); setStatus('error'); cleanup(); return; }

      const port = e.ports[0];
      portRef.current = port;

      const { id, sampleRate, channels } = d.payload || {};
      if (!id) { setError('Missing capture id'); setStatus('error'); cleanup(); return; }

      try {
        const ctx = new AudioContext({ sampleRate });
        ctxRef.current = ctx;
        await ctx.audioWorklet.addModule(workletUrl);

        const node = new AudioWorkletNode(ctx, 'pcm-writer', {
          numberOfInputs: 0,
          numberOfOutputs: 1,
          outputChannelCount: [channels],
          processorOptions: { channels: channels, sampleRate, maxQueueBytes: 512 * 1024 }
        });
        nodeRef.current = node;

        port.onmessage = (ev) => {
            const msg = ev.data;
      
            if (!msg) return;
            if (msg.type === 'error') { setError(msg.message || 'audio error'); return; }
            if (msg.type === 'closed') { stopStream(); return; }
            if (!msg.data) return;

            const ab = msg.data; // ArrayBuffer (transferable)
            const ch = msg.ch || channels;

            // Prefer explicit fmt from main
            let fmt = msg.fmt;

            // If fmt unknown, detect by size
            if (!fmt || fmt === 'unknown') {
                if (ab.byteLength % (ch * 4) === 0) fmt = 'f32';
                else if (ab.byteLength % (ch * 2) === 0) fmt = 's16';
            }

            if (fmt === 'f32') {
                // Convert F32 interleaved -> S16 interleaved (worklet expects S16 fast-path)
                const f32 = new Float32Array(ab);
                const out = new Int16Array(f32.length);
                for (let i = 0; i < f32.length; i++) {
                let s = Math.max(-1, Math.min(1, f32[i]));
                out[i] = (s < 0 ? s * 32768 : s * 32767) | 0;
                }
                const outBuf = out.buffer; // transferable
                node.port.postMessage({ type: 'enqueue-s16', data: outBuf, ch }, [outBuf]);
            } else {
                // assume s16
                node.port.postMessage({ type: 'enqueue-s16', data: ab, ch }, [ab]);
            }
        };

        port.start?.();

        const dest = ctx.createMediaStreamDestination();
        node.connect(dest);
        if (ctx.state !== 'running') { try { await ctx.resume(); } catch {} }

        const ms = dest.stream;
        idRef.current = id;
        setStream(ms);
        setMeta({ id, sampleRate, channels });
        setStatus('running');

        readyResolveRef.current?.(ms);
        readyResolveRef.current = null;
      } catch (e2) {
        setError(e2?.message || String(e2));
        setStatus('error');
        readyRejectRef.current?.(e2);
        readyRejectRef.current = null;
      } finally {
        window.removeEventListener('message', onWinMsg);
      }
    };

    const cleanup = () => window.removeEventListener('message', onWinMsg);
    window.addEventListener('message', onWinMsg);

    // Promise resolves once MediaStream is built
    const ready = new Promise((resolve, reject) => {
      readyResolveRef.current = resolve;
      readyRejectRef.current = reject;
    });

    // Kick off native capture (main will respond with webContents.postMessage that our preload relays)
    const res = await ipcRenderer.invoke('audio:getByPid', pid);

    if (!res || res.ok === false) {
      cleanup();
      const msg = res?.error || 'audio:getByPid failed';
      setError(msg); setStatus('error'); throw new Error(msg);
    }
    // idRef will be set when the port arrives & graph is ready
    return ready;
  }, [ipcRenderer, workletUrl, stopStream]);

  useEffect(() => () => { stopStream(); }, [stopStream]);

  return {
    stream,
    id: meta.id,
    sampleRate: meta.sampleRate,
    channels: meta.channels,
    status,
    error,
    startStream,
    stopStream,
    cleanupAll,
  };
}
