export const getImageColorFromFile = async (fileOrBlob) => {
  if (!fileOrBlob || !(fileOrBlob instanceof Blob)) return null;

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 16;
        canvas.height = 16;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        try {
          const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
          let r = 0, g = 0, b = 0, count = 0;
          for (let i = 0; i < data.length; i += 4) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            count++;
          }
          // Cleanup
          canvas.width = canvas.height = 0;
          resolve(
            "#" +
              [r, g, b]
                .map((c) => Math.round(c / count).toString(16).padStart(2, "0"))
                .join("")
          );
        } catch (e) {
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
      img.src = reader.result;
    };

    reader.onerror = () => resolve(null);
    reader.readAsDataURL(fileOrBlob);
  });
};
