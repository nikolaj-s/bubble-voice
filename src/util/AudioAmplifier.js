import { USER_PREFS } from "./LocalData";

import { audioCtx } from "../features/AudioInit/AudioInit";

export const audioMap = new Map();

let streaming = false;

export const handleAmplifiedAudioOnStream = (stream_state) => {
    console.log(streaming)
    streaming = stream_state;

    for (const [key, entry] of audioMap.entries()) {
        if (stream_state) {
            if (entry.volume >= 1) {
                entry.media.volume = 0.99;
                entry.amplify(0);
            }
        } else {
            if (entry.volume >= 1) {
                entry.media.volume = 0;
                entry.amplify(entry.volume);
            }
        }
    }
}

export const handleAmplifyLevel = (e) => {
    
    let stream = e.target.className.includes('stream-audio');

    let id = stream ? e.target.className.split('-')[0] : e.target.className.split('user-')[1];

    const consumer_id = e.target.id;

    const prefs = USER_PREFS.get(id);
    
    let amplified = audioMap.get(consumer_id);

    let volume = 1;

    if (prefs) {
        if (stream) {
            volume = prefs?.stream_volume ? Number(prefs.stream_volume) : 1;
        } else {
            volume = prefs?.volume ? Number(prefs.volume) : 1;
        }
    } 
    console.log(streaming);
    if (streaming) {
        volume = volume >= 1 ? 0.99 : volume;
    }

    if (e.target.muted) volume = 0;

    if (volume >= 1) e.target.volume = 0;
   

    if (e.target.nodeName === 'AUDIO') {
        
        if (amplified) {

            amplified.amplify(Number(Number(volume).toFixed(2)));

            amplified.volume = Number(Number(volume).toFixed(2));

        } else {

            function amplifyMedia(mediaElem, multiplier) {
                
                var context = audioCtx,
                result = {
                    context: context,
                    source: context.createMediaStreamSource(mediaElem.srcObject),
                    gain: context.createGain(),
                    media: mediaElem,
                    volume: Number(volume),
                    amplify: function(multiplier) { result.gain.gain.value = multiplier < 1 ? 0 : multiplier; },
                    getAmpLevel: function() { return result.gain.gain.value; }
                };

                result.source.connect(result.gain);

                result.gain.connect(result.context.destination);
                
                result.amplify(multiplier);
    
                return result;
            }
          
            amplified = amplifyMedia(e.target, Number(volume).toFixed(2));
        
        }
    
        audioMap.set(consumer_id, amplified);

    }
}

handleAmplifyLevel.bind(streaming);