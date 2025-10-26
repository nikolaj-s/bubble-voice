import React from 'react';

import styles from './Room.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useMediasoup } from '../../context/MediasoupContext';
import { throwScreenShareError, throwWebcamError, toggleMediaControlLoading, toggleWebcam } from '../../features/Channel/MediaControl/mediaControlSlice';
import { getMicrophoneMedia, getWebcamMedia } from '../../lib/services/getUserMedia';
import { RoomUserWrapper } from './RoomUserWrapper/RoomUserWrapper';
import { useDetectSpeech } from '../../hooks/useDetectSpeech';
import { ChannelBackground } from '../ChannelBackground/ChannelBackground';
import { RoomOverlay } from './RoomOverlay/RoomOverlay';
import { usePushToTalk } from '../../hooks/usePushToTalk';
import { useMicrophoneToggle } from '../../hooks/useMicrophoneToggle';
import { useScreenShare } from '../../hooks/useScreenShare';
import { UserStreamStateProvider } from '../../providers/UserStreamStateProvider/UserStreamStateProvider';
import { playSoundEffect } from '../../features/SoundEffects/soundEffectsSlice';
import { useAdaptiveSpeechDetection } from '../../hooks/useAdaptiveSpeechDetection';

export const Room = () => {
    
    const dispatch = useDispatch();

    const {useBlackVoiceChannelBackground} = useSelector(state => state.appearanceSlice)

    const { currentVoiceChannel } = useSelector(state => state.voiceChannelSlice);

    const { users, channel_background, disable_streams } = useSelector(state => state.channelsSlice.channels[currentVoiceChannel]);

    const { produce, resumeProducer, pauseProducer, closeProducer, getConsumers, getProducers } = useMediasoup();

    const { isMicrophoneMuted, isWebcamOn, voiceThreshold, usingPushToTalk, isPushToTalkActive, echoCancellation, noiseSuppression, autoGainControl, isScreenSharing, useAdaptiveVoiceDetection } = useSelector(state => state.mediaControlSlice);

    const { user_id: account_id} = useSelector(state => state.accountSlice.account);

    const {selectedMicrophone, selectedWebcam} = useSelector(state => state.deviceSlice);

    const consumers = getConsumers();

    const producers = getProducers();

    const handleMicrophone = useMicrophoneToggle({echoCancellation, autoGainControl, noiseSuppression, getMicrophoneMedia, produce, pauseProducer, closeProducer});
 
    const { handleScreenShare } = useScreenShare({produce, closeProducer});
    // microphoneMuteState effect
    React.useEffect(() => {

        if (typeof closeProducer !== 'function') return;

        if (disable_streams) {
            closeProducer('microphone');

            return;
        }
        
        handleMicrophone(isMicrophoneMuted, selectedMicrophone);
    // eslint-disable-next-line
    }, [isMicrophoneMuted, disable_streams, selectedMicrophone]);

    React.useEffect(() => {
        console.log(isScreenSharing)
        if (disable_streams) dispatch(throwScreenShareError("Streams Are Disabled In This Channel"))
      
        handleScreenShare(disable_streams ? false : isScreenSharing);

    //eslint-disable-next-line
    }, [disable_streams, isScreenSharing])

    // handle webcam
    React.useEffect(() => {

        if (typeof closeProducer !== 'function') return;

        if (disable_streams) {

            closeProducer('webcam');

            return;
        }

        const handleWebcam = async (state) => {

            try {
                dispatch(throwWebcamError(false));

                dispatch(toggleMediaControlLoading(true));

                if (state) {
                    const track = await getWebcamMedia(selectedWebcam?.deviceId);

                    if (track.error) {

                        dispatch(throwWebcamError(track.errorMessage));

                        return dispatch(toggleMediaControlLoading(false));

                    }

                    track.onended = (isWebcamOn) => {
                        if (isWebcamOn) {
                            dispatch(toggleWebcam());
                        }
                    } 

                    await produce('webcam', track);
                } else {
                    await closeProducer('webcam');
                }

                dispatch(toggleMediaControlLoading(false));
            } catch (error) {
                console.log(error);

                dispatch(throwWebcamError(JSON.stringify(error)));

                return dispatch(toggleMediaControlLoading(false));
            }
        }

        handleWebcam(isWebcamOn);
        
    // eslint-disable-next-line
    }, [isWebcamOn, selectedWebcam, disable_streams])

    // Hook for detecting speech
    useDetectSpeech((disable_streams || isMicrophoneMuted || useAdaptiveVoiceDetection), pauseProducer, resumeProducer, voiceThreshold, usingPushToTalk, selectedMicrophone?.deviceId, echoCancellation, noiseSuppression, autoGainControl);

    // handle adaptive speech
    useAdaptiveSpeechDetection({
        enabled: (!disable_streams && !usingPushToTalk && useAdaptiveVoiceDetection),
        isMicrophoneMuted,
        deviceId: selectedMicrophone?.deviceId,
        echoCancellation,
        noiseSuppression,
        autoGainControl: true,
        onSpeechEnd: pauseProducer,
        onSpeechStart: resumeProducer
    })

    usePushToTalk((disable_streams || isMicrophoneMuted), usingPushToTalk, isPushToTalkActive, resumeProducer, pauseProducer);

    // Memoizing combinedUsers to update only when the length of consumers changes
    const combinedUsers = React.useMemo(() => {
        // If the length of consumers has changed, recalculate combinedUsers
        if (!users || disable_streams) return [];

        const updatedUsers = users.map(user => {
            // Find all consumers that match the current user's user_id
            const webcam = user === account_id ? producers.get('webcam') : Array.from(consumers.values()).filter(consumer => consumer.user_id === user && consumer.appData.type === 'webcam')[0];
            
            //const stream = user === account_id ? producers.get('stream') : Array.from(consumers.values()).filter(consumer => consumer.user_id === user && consumer.appData.type === 'stream')[0]
            // Return user with the matched consumers
            return { user_id: user, webcam, type: 'user', id: `room-user-card-${user}`};
        });

        return updatedUsers;
        
    }, [users, consumers, producers, disable_streams, account_id]);

    const streams = React.useMemo(() => {

        let arr = [];

        const stream = producers.get('stream') ? {stream: producers.get('stream'), type: 'stream', id: `stream-src-for-${account_id}`, user_id: account_id} : null;

        const streams = Array.from(consumers.values()).filter(consumer => consumer.appData.type === 'stream').map(c => ({stream: c, type: 'stream', user_id: c.user_id, id: `stream-src-for-${c.user_id}`}));

        arr = streams;

        if (stream) arr.unshift(stream);

        return arr;
    }, [consumers, producers, account_id])

    React.useEffect(() => {
        console.log('joining')
        dispatch(playSoundEffect('channelConnected'));

        return () => {
            console.log('leaving')
            dispatch(playSoundEffect('channelDisconnected'));
        }
    }, [dispatch])
   
    return (
            <div 
            style={{
                backgroundColor: useBlackVoiceChannelBackground ? 'black' : null,
            }}
            id='voice-channel'
            data-context={JSON.stringify({type: 'room'})}
            className={`${styles.container}`}>
                <RoomUserWrapper users={[...combinedUsers, ...streams]} disable_streams={disable_streams} />
                <ChannelBackground channel_background={channel_background} />
                <RoomOverlay />
                <UserStreamStateProvider consumers={consumers} />
            </div>
    );
};

