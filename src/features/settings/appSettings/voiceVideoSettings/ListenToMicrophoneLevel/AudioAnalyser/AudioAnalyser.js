import React from 'react'
import { useSelector } from 'react-redux';
import { selectActivationColor, selectPrimaryColor } from '../../../appearanceSettings/appearanceSettingsSlice';
import { selectAudioInput, selectEchoCancellatio, selectMicInputVolume, selectNoiseSuppression, selectVoiceActivationSensitivity, selectVoiceActivityState } from '../../voiceVideoSettingsSlice';

export const AudioAnalyser = ({audio, throwError}) => {

    const audioInput = useSelector(selectAudioInput);

    const primaryColor = useSelector(selectPrimaryColor);

    const activationColor = useSelector(selectActivationColor);

    const echoCancellation = useSelector(selectEchoCancellatio);

    const noiseSuppression = useSelector(selectNoiseSuppression);

    const micInputVolume = useSelector(selectMicInputVolume);

    const voiceActivationSensitivity = useSelector(selectVoiceActivationSensitivity);

    const voiceActivity = useSelector(selectVoiceActivityState);

    React.useEffect(() => {

        let audioCtx,
        analyser,
        source,
        scriptProcessor,
        filter,
        compressor,
        gainNode
        
        try {
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

                gainNode.gain.value = micInputVolume;

                analyser.connect(scriptProcessor)

                source = audioCtx.createMediaStreamSource(audio);

                source.connect(analyser);

                source.connect(gainNode)

                gainNode.connect(audioCtx.destination)

                scriptProcessor.connect(gainNode)

                analyser.connect(gainNode)

                scriptProcessor.connect(audioCtx.destination)
                
               // el.srcObject = source.mediaStream;

               // document.getElementsByClassName('listen-to-audio-container')[0].appendChild(el);

                scriptProcessor.onaudioprocess = function() {
                    
                    const array = new Uint8Array(analyser.frequencyBinCount);

                    analyser.getByteFrequencyData(array);

                    const arrSum = array.reduce((a, value) => a + value, 0);

                    const pids = [...document.querySelectorAll('.pid')];

                    const avg = (arrSum / array.length) * pids.length;

                    const numberOfPidsToColor = Math.round(avg / pids.length)

                    const pidsToColor = pids.slice(0, numberOfPidsToColor);

                    for (const pid of pids) {
                        pid.style.backgroundColor = primaryColor;
                    }

                    for (const pid of pidsToColor) {
                        pid.style.backgroundColor = activationColor;
                    }

                    if (voiceActivity) {

                        const calc_avg = (arrSum / array.length) * 5;
                        
                        if (calc_avg >= voiceActivationSensitivity) {
                            
                            console.log('activating')
  
                        } else if (calc_avg < voiceActivationSensitivity) {

                            console.log('deactivating')
                        }
                        

                    }

                }   
            }).catch(error => {
                console.log(error)
                throwError("Error Capturing Microphone Input");
            })
        } catch (error) {
            console.log(error);
            throwError("Error Capturing Microphone Input");

        }  

        return () => {

            const pids = [...document.querySelectorAll('.pid')];

            for (const pid of pids) {
                pid.style.backgroundColor = primaryColor;
            }

            if (source && analyser) {
                analyser?.disconnect();
                filter?.disconnect();
                gainNode?.disconnect();
                compressor?.disconnect();
                source?.disconnect();
                scriptProcessor?.disconnect();
                document.getElementById('testing-audio-feedback')?.remove();
            }
            
        }
    // eslint-disable-next-line
    }, [echoCancellation, noiseSuppression, micInputVolume, voiceActivity])



    return (
        <>
        </>
    )
}
