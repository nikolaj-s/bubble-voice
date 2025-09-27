/**
 * Convert a base64/URLEncoded data URL to a File object
 *
 * @param {string} dataUrl  - The data URL (e.g. "data:image/png;base64,...")
 * @param {string} fileName - Desired file name (e.g. "screenshot.png")
 * @returns {File}
 */
export function dataUrlToFile(dataUrl, fileName) {
  const [header, base64] = dataUrl.split(',');
  const mimeMatch = header.match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/png';

  const binary = atob(base64);
  const len = binary.length;
  const u8arr = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    u8arr[i] = binary.charCodeAt(i);
  }

  return new File([u8arr], fileName, { type: mime });
}
