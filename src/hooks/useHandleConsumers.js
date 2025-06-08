

import { useCallback } from 'react';

import { useSocket } from '../context/SocketContext';

import { useDispatch, useSelector } from 'react-redux';

import { setStreamLoadingState } from '../features/UserStreamState/userStreamStateSlice';

export const useHandleConsumers = () => {

    const dispatch = useDispatch();

    const socket = useSocket();

    const {currentVoiceChannel} = useSelector(state => state.voiceChannelSlice);

    const loading = useSelector(state => state.userStreamStateSlice.loading);

    const resumeConsumer = useCallback(async (consumerID) => {
        try {

            if (loading || !currentVoiceChannel || !socket) return;

            dispatch(setStreamLoadingState(true));

            await socket.request('resumeConsumer', {consumerID});

        } catch (error) {
            console.log(error);
        }

        dispatch(setStreamLoadingState(false));
    }, [socket, currentVoiceChannel, loading, dispatch])

    const pauseConsumer = useCallback(async (consumerID) => {
        try {
            
            if (loading || !currentVoiceChannel || !socket) return;

            dispatch(setStreamLoadingState(true));

            await socket.request('pauseConsumer', {consumerID});

        } catch (error) {
            console.log(error);

        }

        dispatch(setStreamLoadingState(false));
    }, [socket, currentVoiceChannel, loading, dispatch])

    
    return {resumeConsumer, pauseConsumer}
}
