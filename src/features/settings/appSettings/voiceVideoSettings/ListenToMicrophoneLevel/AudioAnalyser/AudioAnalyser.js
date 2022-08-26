import React from 'react'
import { useSelector } from 'react-redux';
import { selectActivationColor, selectPrimaryColor } from '../../../appearanceSettings/appearanceSettingsSlice';
import { selectAudioInput } from '../../voiceVideoSettingsSlice';

export const AudioAnalyser = ({audio}) => {

    const audioInput = useSelector(selectAudioInput);

    const primaryColor = useSelector(selectPrimaryColor);

    const activationColor = useSelector(selectActivationColor);

    React.useEffect(() => {

        let audioCtx,
        analyser,
        source,
        scriptProcessor

        setTimeout(() => {
            
            navigator.mediaDevices.getUserMedia({
                audio: {deviceId: {exact: audioInput._id}},
                video: false,
                keyboard: false
            }).then(async (audio) => {
                let el;

                el = document.createElement('audio');

                el.srcObject = audio;

                el.id = 'testing-audio-feedback';

                el.hidden = true;

                el.controls = false;

                el.blur();

                el.autoplay = true;

                audioCtx = new AudioContext();
            
                analyser = audioCtx.createAnalyser();
                
                source = audioCtx.createMediaStreamSource(audio);

                scriptProcessor = audioCtx.createScriptProcessor(2048, 1, 1)

                analyser.smoothingTimeConstant = 0.8;
                
                analyser.fftSize = 1024;

                source.connect(analyser);

                analyser.connect(scriptProcessor)

                scriptProcessor.connect(audioCtx.destination)

                document.getElementsByClassName('listen-to-audio-container')[0].appendChild(el)

                scriptProcessor.onaudioprocess = function() {
                    
                    const array = new Uint8Array(analyser.frequencyBinCount);

                    analyser.getByteFrequencyData(array);

                    const arrSum = array.reduce((a, value) => a + value, 0);

                    const avg = (arrSum / array.length) * 5;

                    const pids = [...document.querySelectorAll('.pid')];

                    const numberOfPidsToColor = Math.round(avg / pids.length)

                    const pidsToColor = pids.slice(0, numberOfPidsToColor);

                    for (const pid of pids) {
                        pid.style.backgroundColor = primaryColor;
                    }

                    for (const pid of pidsToColor) {
                        pid.style.backgroundColor = activationColor;
                    }

                }   
            })
            
        }, 10) 

        return () => {
            if (source && analyser) {
                analyser.disconnect();
                source.disconnect();
                scriptProcessor.disconnect();
                document.getElementById('testing-audio-feedback').remove();
            }


            
        }
    // eslint-disable-next-line
    }, [])



    return (
        <>
        </>
    )
}
