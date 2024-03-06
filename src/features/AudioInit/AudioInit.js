import React from 'react'
import { useSelector } from 'react-redux';
import { selectAudioOutput, selectExperimentalAudioCapture } from '../settings/appSettings/voiceVideoSettings/voiceVideoSettingsSlice';
import { selectScreenShareState } from '../controlBar/ControlBarSlice';
import { handleAmplifiedAudioOnStream } from '../../util/AudioAmplifier';

export let audioCtx;

export let audioDest;

export let streaming = false;

export const AudioInit = () => {

    const audioOutputDevice = useSelector(selectAudioOutput);

    const sharingScreen = useSelector(selectScreenShareState);

    const streamAudio = useSelector(selectExperimentalAudioCapture);

    React.useEffect(() => {

        if (audioCtx) return;
        console.log('Initializing Audio')
        audioCtx = new AudioContext();

    }, []);
    
    React.useEffect(() => {
        try {
            let id = "";

            if (audioOutputDevice?._id !== 'default') {
                id = audioOutputDevice?._id
            }

            if (audioCtx) {
                audioCtx.setSinkId(id)
            }
        } catch (e) {
            return;
        }
    }, [audioOutputDevice])

    
    React.useEffect(() => {
        console.log(sharingScreen)
        if (!sharingScreen && streamAudio) {
            handleAmplifiedAudioOnStream(true);
        } else {
            handleAmplifiedAudioOnStream(false);
        }

    }, [sharingScreen, streamAudio])


    React.useEffect(() => {

        if (!audioCtx) return;

    //    document.getElementById('live-chat-wrapper').addEventListener("DOMNodeInserted", handleAmplifyLevel);

    }, [audioCtx])

    return (
        <>
        <audio id='room-audio-source' /> 
        </>
    )
}
