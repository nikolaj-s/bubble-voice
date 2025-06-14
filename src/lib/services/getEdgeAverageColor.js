export function getEdgeAverageColor(ctx, w, h, edgeThickness = 1) {
  try {
    const { data } = ctx.getImageData(0, 0, w, h);
    let r = 0, g = 0, b = 0, count = 0;

    // Top and Bottom edges
    for (let y = 0; y < edgeThickness; y++) {
      for (let x = 0; x < w; x++) {
        let i = (y * w + x) * 4;
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }
    }
    for (let y = h - edgeThickness; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let i = (y * w + x) * 4;
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }
    }

    // Left and Right edges (excluding corners, already included)
    for (let y = edgeThickness; y < h - edgeThickness; y++) {
      for (let x of [0, w - 1]) {
        let i = (y * w + x) * 4;
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }
    }

    r = Math.round(r / count);
    g = Math.round(g / count);
    b = Math.round(b / count);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  } catch {
    return "#000000";
  }
}
