// pcm-worklet.js — accepts S16 or F32 interleaved, converts to F32, bounded queue
class PCMWriter extends AudioWorkletProcessor {
  constructor(opts) {
    super();
    const po = (opts && opts.processorOptions) || {};
    this.srcCh = Math.max(1, po.channels | 0) || 2;  // expected source channels (can change per-chunk if hinted)
    this.outCh = 0;                                   // from outputs on first process()
    this.maxQueueBytes = (po.maxQueueBytes | 0) || (512 * 1024);

    // queue of {u8: Uint8Array, fmt: 's16'|'f32', ch: number}
    this.q = [];
    this.qBytes = 0;
    this.readIdx = 0;

    this.port.onmessage = (ev) => {
      const { type, data, fmt, ch } = ev.data || {};
      if (type !== 'enqueue-s16' && type !== 'enqueue-f32' && type !== 'enqueue') return;
      if (!data) return;

      const u8 = new Uint8Array(data); // zero-copy view (ArrayBuffer was transferred)
      const hintedFmt = fmt || (type === 'enqueue-f32' ? 'f32' : (type === 'enqueue-s16' ? 's16' : null));
      const hintedCh = (ch | 0) > 0 ? (ch | 0) : this.srcCh;

      // If no fmt hint, infer per chunk
      let useFmt = hintedFmt;
      if (!useFmt) {
        const s16Frame = hintedCh * 2;
        const f32Frame = hintedCh * 4;
        if (u8.byteLength % f32Frame === 0) useFmt = 'f32';
        else if (u8.byteLength % s16Frame === 0) useFmt = 's16';
        else {
          // fall back to s16
          useFmt = 's16';
        }
      }

      // Bounded queue: drop oldest until room for this chunk
      if (u8.byteLength > this.maxQueueBytes) {
        this.q.length = 0;
        this.qBytes = 0;
        // keep only tail that fits
        const tail = u8.subarray(u8.byteLength - this.maxQueueBytes);
        this.q.push({ u8: tail, fmt: useFmt, ch: hintedCh });
        this.qBytes = tail.byteLength;
        this.readIdx = 0;
        return;
      }
      while (this.qBytes + u8.byteLength > this.maxQueueBytes && this.q.length) {
        this.qBytes -= this.q[0].u8.byteLength - this.readIdx;
        this.q.shift();
        this.readIdx = 0;
      }
      this.q.push({ u8, fmt: useFmt, ch: hintedCh });
      this.qBytes += u8.byteLength;
    };
  }

  process(_inputs, outputs) {
    const out = outputs[0];
    if (!out || out.length === 0) return true;

    if (!this.outCh) this.outCh = out.length;

    const framesNeeded = out[0].length;

    // Fast clear when underrun; we’ll write over the produced part below.
    for (let ch = 0; ch < this.outCh; ch++) out[ch].fill(0);

    let produced = 0;

    while (produced < framesNeeded && this.q.length) {
      const head = this.q[0];
      const { u8, fmt, ch } = head;

      const bytesAvail = u8.length - this.readIdx;
      const frameBytes = ch * (fmt === 'f32' ? 4 : 2);
      if (bytesAvail < frameBytes) {
        // not even one frame left in this chunk; drop it
        this.q.shift();
        this.qBytes -= u8.length;
        this.readIdx = 0;
        continue;
      }

      const framesAvail = (bytesAvail / frameBytes) | 0;
      const framesToCopy = Math.min(framesNeeded - produced, framesAvail);

      if (fmt === 'f32') {
        // Interpret in-place as float32
        const f32 = new Float32Array(u8.buffer, u8.byteOffset, u8.byteLength >> 2);
        // interleaved -> deinterleave
        for (let i = 0; i < framesToCopy; i++) {
          const base = (this.readIdx >> 2) + i * ch;
          for (let oc = 0; oc < this.outCh; oc++) {
            const sc = oc < ch ? oc : (ch - 1); // duplicate last src channel if upmixing
            out[oc][produced + i] = f32[base + sc];
          }
        }
      } else {
        // S16LE -> F32
        const b0 = u8; // alias
        for (let i = 0; i < framesToCopy; i++) {
          let base = this.readIdx + i * frameBytes;
          for (let oc = 0; oc < this.outCh; oc++) {
            const sc = oc < ch ? oc : (ch - 1);
            const lo = b0[base + sc * 2];
            const hi = b0[base + sc * 2 + 1];
            const s = (hi << 8) | lo;
            const s16 = (s & 0x8000) ? s - 0x10000 : s;
            out[oc][produced + i] = s16 / 32768;
          }
        }
      }

      this.readIdx += framesToCopy * frameBytes;
      produced += framesToCopy;

      if (this.readIdx >= u8.length) {
        this.q.shift();
        this.qBytes -= u8.length;
        this.readIdx = 0;
      }
    }

    return true;
  }
}

registerProcessor('pcm-writer', PCMWriter);
