import React from 'react'
import { useSelector } from 'react-redux';
import { selectAmplifyLevel } from './AudioInitSlice';
import { USER_PREFS } from '../../util/LocalData';

export let audioCtx;

export const AudioInit = () => {

    const amplifyLevel = useSelector(selectAmplifyLevel);

    React.useEffect(() => {

        if (audioCtx) return;

        audioCtx = new AudioContext();

    }, []);

    const handleAmplifyLevel = (e) => {

        let id = e.target.className.split('user-')[1];
        
        const prefs = USER_PREFS.get(id);

        if (e.target.nodeName === 'AUDIO' && prefs?.volume > 1) {
            
            function amplifyMedia(mediaElem, multiplier) {
            var context = new (window.AudioContext || window.webkitAudioContext),
                result = {
                    context: context,
                    source: context.createMediaStreamSource(mediaElem.srcObject),
                    gain: context.createGain(),
                    media: mediaElem,
                    amplify: function(multiplier) { result.gain.gain.value = multiplier; },
                    getAmpLevel: function() { return result.gain.gain.value; }
                };
                result.source.connect(result.gain);
                result.gain.connect(context.destination);
                result.amplify(multiplier);

                return result;
            }

            amplifyMedia(e.target, prefs.volume);

        }
    }

    React.useEffect(() => {

        

    }, [amplifyLevel])

    React.useEffect(() => {

        if (!audioCtx) return;

    //    document.getElementById('live-chat-wrapper').addEventListener("DOMNodeInserted", handleAmplifyLevel);

    }, [audioCtx])

    return (
        <></>
    )
}
