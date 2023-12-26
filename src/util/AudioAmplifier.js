import { USER_PREFS } from "./LocalData";

import { audioCtx } from "../features/AudioInit/AudioInit";

export const audioMap = new Map();

export const handleAmplifyLevel = (e) => {
    
    let stream = e.target.className.includes('stream-audio');

    let id = stream ? e.target.className.split('-')[0] : e.target.className.split('user-')[1];

    const consumer_id = e.target.id;

    const prefs = USER_PREFS.get(id);
    
    let amplified = audioMap.get(consumer_id);

    let volume = 1;

    if (prefs) {
        if (stream) {
            volume = prefs.stream_volume;
        } else {
            volume = prefs.volume;
        }
    }

    if (e.target.muted) volume = 0;

    console.log(volume);

    if (e.target.nodeName === 'AUDIO') {
        console.log(amplified)
        if (amplified) {

            amplified.amplify(Number(volume).toFixed(2));

        } else {

            function amplifyMedia(mediaElem, multiplier) {
                
                var context = audioCtx,
                result = {
                    context: context,
                    source: context.createMediaStreamSource(mediaElem.srcObject),
                    compressor: context.createDynamicsCompressor(),
                    gain: context.createGain(),
                    media: mediaElem,
                    amplify: function(multiplier) { result.gain.gain.value = multiplier < 1 ? 0 : multiplier; },
                    getAmpLevel: function() { return result.gain.gain.value; }
                };

                result.source.connect(result.gain);

                result.gain.connect(result.compressor);

                result.compressor.connect(context.destination);

                result.amplify(multiplier);
    
                return result;
            }
          
            amplified = amplifyMedia(e.target, Number(volume).toFixed(2));
        
        }

        audioMap.set(consumer_id, amplified);

    }
}