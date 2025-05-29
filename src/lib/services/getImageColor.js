
export const getImageColor = async (imgSrc) => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      // Create a tiny canvas (smaller = faster, less accurate)
      const w = 10, h = 10;
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;

      let r = 0, g = 0, b = 0, a = 0;
      let count = w * h;

      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        a += data[i + 3];
      }
      r = Math.round(r / count);
      g = Math.round(g / count);
      b = Math.round(b / count);
      a = Math.round(a / count);

      resolve({ r, g, b, a, hex: `#${[r, g, b].map(x => x.toString(16).padStart(2, "0")).join("")}` });
    };
    img.onerror = reject;
    img.src = imgSrc;
  }).catch(err => {
    console.log(err);
    return {}
  })
}