import React from 'react'
import { useSelector } from 'react-redux';
import { selectActivationColor, selectPrimaryColor } from '../../../appearanceSettings/appearanceSettingsSlice';
import { selectAudioInput, selectEchoCancellatio, selectMicInputVolume, selectNoiseSuppression } from '../../voiceVideoSettingsSlice';

export const AudioAnalyser = ({audio}) => {

    const audioInput = useSelector(selectAudioInput);

    const primaryColor = useSelector(selectPrimaryColor);

    const activationColor = useSelector(selectActivationColor);

    const echoCancellation = useSelector(selectEchoCancellatio);

    const noiseSuppression = useSelector(selectNoiseSuppression);

    const micInputVolume = useSelector(selectMicInputVolume);

    React.useEffect(() => {

        let audioCtx,
        analyser,
        source,
        scriptProcessor,
        filter,
        compressor,
        gainNode

        navigator.mediaDevices.getUserMedia({
            audio: {
                deviceId: {exact: audioInput._id},
                echoCancellation: echoCancellation,
                noiseSuppression: noiseSuppression,
                sampleRate: 48000
            },
            video: false,
            keyboard: false
        }).then(async (audio) => {
            let el;

            el = document.createElement('audio');

            el.id = 'testing-audio-feedback';

            el.hidden = true;

            el.controls = false;

            el.blur();

            el.autoplay = true;

            audioCtx = new AudioContext();
        
            analyser = audioCtx.createAnalyser();

            scriptProcessor = audioCtx.createScriptProcessor(2048, 1, 1)

            analyser.smoothingTimeConstant = 0.8;
            
            analyser.fftSize = 1024;

            gainNode = audioCtx.createGain();

            if (noiseSuppression) {

                compressor = audioCtx.createDynamicsCompressor();

                compressor.threshold.setValueAtTime(-50, audioCtx.currentTime);

                compressor.knee.setValueAtTime(40, audioCtx.currentTime);

                compressor.ratio.setValueAtTime(12, audioCtx.currentTime);

                compressor.attack.setValueAtTime(0, audioCtx.currentTime)

                compressor.release.setValueAtTime(0.25, audioCtx.currentTime);
                // biquad filters
                filter = audioCtx.createBiquadFilter();

                filter.Q.setValueAtTime(8.30, audioCtx.currentTime);

                filter.frequency.setValueAtTime(355, audioCtx.currentTime);

                filter.gain.setValueAtTime(3.0, audioCtx.currentTime);

                filter.type = 'highpass';
                
                filter.connect(compressor)

                //compressor.connect(audioCtx.destination);
                filter.connect(audioCtx.destination);
            }  

            gainNode.gain.setValueAtTime(0, audioCtx.currentTime)

            analyser.connect(scriptProcessor)

            scriptProcessor.connect(audioCtx.destination)

            source = audioCtx.createMediaStreamSource(audio);

            source.connect(analyser);

            if (noiseSuppression) {

               source.connect(filter)

            }

            source.connect(gainNode)

            gainNode.connect(audioCtx.destination)
            
            el.srcObject = source.mediaStream;

            document.getElementsByClassName('listen-to-audio-container')[0].appendChild(el);

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
        }).catch(error => {
            console.log(error)
        })
            

        return () => {

            const pids = [...document.querySelectorAll('.pid')];

            for (const pid of pids) {
                pid.style.backgroundColor = primaryColor;
            }

            if (source && analyser) {
                analyser.disconnect();
                filter?.disconnect();
                gainNode?.disconnect();
                compressor?.disconnect();
                source.disconnect();
                scriptProcessor.disconnect();
                document.getElementById('testing-audio-feedback').remove();
            }
            
        }
    // eslint-disable-next-line
    }, [echoCancellation, noiseSuppression, micInputVolume])



    return (
        <>
        </>
    )
}
