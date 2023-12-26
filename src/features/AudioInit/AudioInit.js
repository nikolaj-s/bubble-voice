import React from 'react'
import { useSelector } from 'react-redux';
import { selectAudioOutput } from '../settings/appSettings/voiceVideoSettings/voiceVideoSettingsSlice';

export let audioCtx;

export let audioDest;

export const AudioInit = () => {

    const audioOutputDevice = useSelector(selectAudioOutput);

    React.useEffect(() => {

        if (audioCtx) return;

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

        if (!audioCtx) return;

    //    document.getElementById('live-chat-wrapper').addEventListener("DOMNodeInserted", handleAmplifyLevel);

    }, [audioCtx])

    return (
        <>
        <audio id='room-audio-source' /> 
        </>
    )
}
