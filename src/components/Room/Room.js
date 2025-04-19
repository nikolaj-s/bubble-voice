import React from 'react';

import styles from './Room.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useMediasoup } from '../../context/MediasoupContext';
import { throwMicrophoneError, throwWebcamError, toggleMediaControlLoading, toggleWebcam } from '../../features/MediaControl/mediaControlSlice';
import { getMicrophoneMedia, getWebcamMedia } from '../../lib/services/getUserMedia';
import { RoomUserWrapper } from './RoomUserWrapper/RoomUserWrapper';
import { useDetectSpeech } from '../../hooks/useDetectSpeech';
import { ChannelBackground } from '../ChannelBackground/ChannelBackground';
import { RoomOverlay } from './RoomOverlay/RoomOverlay';
import { usePushToTalk } from '../../hooks/usePushToTalk';

export const Room = () => {
    
    const dispatch = useDispatch();

    const { users, channel_background } = useSelector(state => state.channelsSlice.currentChannel);

    const { produce, resumeProducer, pauseProducer, closeProducer, getConsumers, getProducers } = useMediasoup();

    const { isMicrophoneMuted, isWebcamOn, voiceThreshold, usingPushToTalk, isPushToTalkActive } = useSelector(state => state.mediaControlSlice);

    const { user_id: account_id} = useSelector(state => state.accountSlice.account);

    const {selectedMicrophone, selectedWebcam} = useSelector(state => state.deviceSlice);

    const consumers = getConsumers();

    const producers = getProducers();

    const isTextChannelOpen = useSelector(state => state.textChannelSlice.currentTextChannel);

    // microphoneMuteState effect
    React.useEffect(() => {
        const handleMicrophone = async (state) => {

            dispatch(throwMicrophoneError(false));

            dispatch(toggleMediaControlLoading(true));

            if (state) {
                await closeProducer('microphone');
            } else {
                const track = await getMicrophoneMedia(selectedMicrophone?.deviceId);
               
                if (track.error) {
                    dispatch(throwMicrophoneError(track.errorMessage));

                    return dispatch(toggleMediaControlLoading(false));
                }

                await produce('microphone', track);

                await pauseProducer('microphone');
            }

            dispatch(toggleMediaControlLoading(false));
        };
        
        handleMicrophone(isMicrophoneMuted);

    }, [isMicrophoneMuted, selectedMicrophone]);

    // handle webcam
    React.useEffect(() => {

        const handleWebcam = async (state) => {

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
        }

        handleWebcam(isWebcamOn);
        
    }, [isWebcamOn, selectedWebcam])

    // Hook for detecting speech
    useDetectSpeech(isMicrophoneMuted, pauseProducer, resumeProducer, voiceThreshold, usingPushToTalk);

    usePushToTalk(isMicrophoneMuted, usingPushToTalk, isPushToTalkActive, resumeProducer, pauseProducer);

    // Memoizing combinedUsers to update only when the length of consumers changes
    const combinedUsers = React.useMemo(() => {
        // If the length of consumers has changed, recalculate combinedUsers
        if (!users) return;

        const updatedUsers = users.map(user => {
            // Find all consumers that match the current user's user_id
            const userConsumers = user === account_id ? producers.get('webcam') ? [producers.get('webcam')] : [] : Array.from(consumers.values()).filter(consumer => consumer.user_id === user);
        
            // Return user with the matched consumers
            return { user_id: user, consumers: userConsumers };
        });

        return updatedUsers;
        
    }, [users, consumers, producers]);

    return (
        <div className={`${styles.container} ${isTextChannelOpen ? styles.textChannelOpen : ''}`}>
    
            <RoomUserWrapper users={combinedUsers} />
            <ChannelBackground channel_background={channel_background} />
            <RoomOverlay />
        
        </div>
    );
};