import { useCallback, useRef } from "react";

/**
 * Organic switch toggles:
 *  - playEnable(): crisp click + tiny upward thunk
 *  - playDisable(): crisp click + tiny downward thunk
 *
 * Notes:
 *  - Contact "tick": very short bandpassed noise + square blip
 *  - Mechanical "thunk": low sine with fast exponential decay
 */
export function useBubbleSounds({ masterGain = 0.6 } = {}) {
  const ctxRef = useRef(null);
  const compRef = useRef(null);
  const masterRef = useRef(null);

  const getCtx = () => {
    if (!ctxRef.current) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();

      // Gentle glue for transients
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.setValueAtTime(-20, ctx.currentTime);
      comp.knee.setValueAtTime(20, ctx.currentTime);
      comp.ratio.setValueAtTime(3, ctx.currentTime);
      comp.attack.setValueAtTime(0.002, ctx.currentTime);
      comp.release.setValueAtTime(0.12, ctx.currentTime);

      const master = ctx.createGain();
      master.gain.value = masterGain;

      comp.connect(master);
      master.connect(ctx.destination);

      ctxRef.current = ctx;
      compRef.current = comp;
      masterRef.current = master;
    }
    return ctxRef.current;
  };

  // utils
  const rand = (min, max) => Math.random() * (max - min) + min;
  const jitter = (v, pct = 0.06) => v * (1 + rand(-pct, pct));

  const makeNoiseBuffer = (ctx, duration = 0.018) => {
    const frames = Math.floor(duration * ctx.sampleRate);
    const buf = ctx.createBuffer(1, frames, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < frames; i++) {
      // quick decay to emulate a contact click
      const env = 1 - i / frames;
      data[i] = (Math.random() * 2 - 1) * env;
    }
    return buf;
  };

  // --- building blocks -------------------------------------------------------

  // Contact tick: bandpassed noise + tiny square blip
  const contactTick = (ctx, t, {
    noiseDur = 0.018,
    noiseFreq = 2500,
    noiseQ = 8,
    noiseGain = 0.22,
    blipFreq = 1800,
    blipDur = 0.014,
    blipGain = 0.15,
    pan = 0
  }) => {
    // Noise burst
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = makeNoiseBuffer(ctx, noiseDur);

    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(noiseFreq, t);
    bp.Q.setValueAtTime(noiseQ, t);

    const nG = ctx.createGain();
    nG.gain.setValueAtTime(noiseGain, t);
    nG.gain.exponentialRampToValueAtTime(0.0008, t + noiseDur);

    // Square blip for a mechanical edge
    const osc = ctx.createOscillator();
    osc.type = "square";
    osc.frequency.setValueAtTime(blipFreq, t);

    const oG = ctx.createGain();
    oG.gain.setValueAtTime(blipGain, t);
    oG.gain.exponentialRampToValueAtTime(0.0008, t + blipDur);

    const p = ctx.createStereoPanner?.();
    if (p) {
      p.pan.setValueAtTime(pan, t);
      nSrc.connect(bp); bp.connect(nG); nG.connect(p);
      osc.connect(oG); oG.connect(p);
      p.connect(compRef.current);
    } else {
      nSrc.connect(bp); bp.connect(nG); nG.connect(compRef.current);
      osc.connect(oG); oG.connect(compRef.current);
    }

    nSrc.start(t);
    nSrc.stop(t + noiseDur + 0.01);

    osc.start(t);
    osc.stop(t + blipDur + 0.01);
  };

  // Mechanical thunk: damped sine with subtle pitch glide
  const thunk = (ctx, t, {
    startFreq = 140,
    endFreq = 130,
    duration = 0.11,
    gain = 0.22,
    pan = 0
  }) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    const g = ctx.createGain();
    const p = ctx.createStereoPanner?.();

    osc.frequency.setValueAtTime(startFreq, t);
    osc.frequency.exponentialRampToValueAtTime(endFreq, t + duration);

    // Fast attack, quick decay—feels like a small part settling
    g.gain.setValueAtTime(0.0008, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0008, t + duration);

    // Slight body texture: a super-quiet detuned helper
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.detune.value = rand(-6, 6);
    osc2.frequency.setValueAtTime(startFreq, t);
    osc2.frequency.exponentialRampToValueAtTime(endFreq, t + duration);

    osc.connect(g);
    osc2.connect(g);

    if (p) {
      p.pan.setValueAtTime(pan, t);
      g.connect(p);
      p.connect(compRef.current);
    } else {
      g.connect(compRef.current);
    }

    osc.start(t);
    osc2.start(t);
    osc.stop(t + duration + 0.03);
    osc2.stop(t + duration + 0.03);
  };

  // subtle body resonance (lowpassed noise “body”)
  const bodyRustle = (ctx, t, {
    duration = 0.035,
    freq = 500,
    q = 0.7,
    gain = 0.06,
  }) => {
    const src = ctx.createBufferSource();
    src.buffer = makeNoiseBuffer(ctx, duration);

    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(freq, t);
    lp.Q.setValueAtTime(q, t);

    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0008, t + duration);

    src.connect(lp);
    lp.connect(g);
    g.connect(compRef.current);

    src.start(t);
    src.stop(t + duration + 0.01);
  };

  // --- public toggles --------------------------------------------------------

  const playEnable = useCallback(async () => {
    const ctx = getCtx();
    // ensure audio context is running on first user gesture
    if (ctx.state !== "running") { try { await ctx.resume(); } catch {} }

    const t = ctx.currentTime + 0.001;

    // Tiny stereo variance
    const pan = rand(-0.07, 0.07);

    // Click: slightly brighter for "on"
    contactTick(ctx, t, {
      noiseDur: jitter(0.018, 0.2),
      noiseFreq: jitter(2700, 0.1),
      noiseQ: 8,
      noiseGain: 0.23,
      blipFreq: jitter(1900, 0.08),
      blipDur: 0.012,
      blipGain: 0.16,
      pan
    });

    // Thunk: slight upward glide for "engage"
    thunk(ctx, t + 0.002, {
      startFreq: jitter(150, 0.08),
      endFreq: jitter(170, 0.06), // small rise
      duration: jitter(0.11, 0.1),
      gain: 0.21,
      pan
    });

    // Whisper of body rustle
    bodyRustle(ctx, t + 0.004, { duration: 0.03, freq: 580, gain: 0.05 });
  }, []);

  const playDisable = useCallback(async () => {
    const ctx = getCtx();
    if (ctx.state !== "running") { try { await ctx.resume(); } catch {} }

    const t = ctx.currentTime + 0.001;

    const pan = rand(-0.07, 0.07);

    // Click: a touch darker/mellower for "off"
    contactTick(ctx, t, {
      noiseDur: jitter(0.017, 0.2),
      noiseFreq: jitter(2200, 0.1),
      noiseQ: 7,
      noiseGain: 0.20,
      blipFreq: jitter(1600, 0.08),
      blipDur: 0.012,
      blipGain: 0.14,
      pan
    });

    // Thunk: slight downward glide for "release"
    thunk(ctx, t + 0.002, {
      startFreq: jitter(140, 0.08),
      endFreq: jitter(120, 0.06), // small fall
      duration: jitter(0.12, 0.1),
      gain: 0.19,
      pan
    });

    bodyRustle(ctx, t + 0.004, { duration: 0.03, freq: 520, gain: 0.045 });
  }, []);

  return { playEnable, playDisable };
}
