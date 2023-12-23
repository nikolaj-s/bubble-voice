import React from 'react'
import { useSelector } from 'react-redux';
import { selectAmplifyLevel } from './AudioInitSlice';
import { USER_PREFS } from '../../util/LocalData';

export let audioCtx;

export let audioDest;

export const AudioInit = () => {

    const amplifyLevel = useSelector(selectAmplifyLevel);

    React.useEffect(() => {

        if (audioCtx) return;

        audioCtx = new AudioContext();

        audioDest = audioCtx.createMediaStreamDestination();

    }, []);

    

    React.useEffect(() => {

        

    }, [amplifyLevel])

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
