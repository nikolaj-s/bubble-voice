

export const GetImageColorData = (e) => {
    try {
        const imgEl = e.target;
            
        imgEl.setAttribute('crossOrigin', 'anonymous');

        let blockSize = 5,
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

        if (!context) {
            return `rgba(0, 0, 0, 0)`;
        }
    
        height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
        width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
    
        context.drawImage(imgEl, 0, 0);
    
        try {
            data = context.getImageData(0, 0, width, height);
        } catch(e) {
            /* security error, img on diff domain */

            return `rgba(0, 0, 0, 0)`;
        }
    
        length = data.data.length;
    
        while ( (i += blockSize * 4) < length ) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i+1];
            rgb.b += data.data[i+2];
        }
    
        // ~~ used to floor values
        rgb.r = ~~(rgb.r/count);
        rgb.g = ~~(rgb.g/count);
        rgb.b = ~~(rgb.b/count);

        return `rgba(${rgb.r},${rgb.g},${rgb.b}, 1)`
    } catch (error) {
        return `rgba(0, 0, 0, 0)`;
    }
}