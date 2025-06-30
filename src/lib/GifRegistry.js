// lib/GifRegistry.js
class GifRegistry {
  constructor() {
    this.items = new Set();
    this.onWindowFocus  = this.onWindowFocus.bind(this);
    this.onWindowBlur   = this.onWindowBlur.bind(this);
    this._listening     = false;
  }

  register(item) {
    this.items.add(item);
    if (!this._listening) this._startListening();
  }

  unregister(item) {
    this.items.delete(item);
    if (this.items.size === 0) this._stopListening();
  }

  _startListening() {
    window.addEventListener('focus', this.onWindowFocus);
    window.addEventListener('blur',  this.onWindowBlur);
    this._listening = true;
  }

  _stopListening() {
    window.removeEventListener('focus', this.onWindowFocus);
    window.removeEventListener('blur',  this.onWindowBlur);
    this._listening = false;
  }

  onWindowBlur() {
    // pause all — batch them asynchronously
    window.requestAnimationFrame(() => {
      for (const item of this.items) item.pause();
    });
  }

  onWindowFocus() {
    window.requestAnimationFrame(() => {
      for (const item of this.items) item.play();
    });
  }
}

export const gifRegistry = new GifRegistry();
