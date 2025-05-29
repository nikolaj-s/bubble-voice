import React from 'react';

import styles from './Room.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useMediasoup } from '../../context/MediasoupContext';
import { throwWebcamError, toggleMediaControlLoading, toggleWebcam } from '../../features/Channel/MediaControl/mediaControlSlice';
import { getMicrophoneMedia, getWebcamMedia } from '../../lib/services/getUserMedia';
import { RoomUserWrapper } from './RoomUserWrapper/RoomUserWrapper';
import { useDetectSpeech } from '../../hooks/useDetectSpeech';
import { ChannelBackground } from '../ChannelBackground/ChannelBackground';
import { RoomOverlay } from './RoomOverlay/RoomOverlay';
import { usePushToTalk } from '../../hooks/usePushToTalk';
import { useMicrophoneToggle } from '../../hooks/useMicrophoneToggle';
import { useScreenShare } from '../../hooks/useScreenShare';

export const Room = () => {
    
    const dispatch = useDispatch();

    const {useBlackVoiceChannelBackground} = useSelector(state => state.appearanceSlice)

    const { currentVoiceChannel } = useSelector(state => state.voiceChannelSlice);

    const { users, channel_background, disable_streams } = useSelector(state => state.channelsSlice.channels[currentVoiceChannel]);

    const { produce, resumeProducer, pauseProducer, closeProducer, getConsumers, getProducers } = useMediasoup();

    const { isMicrophoneMuted, isWebcamOn, voiceThreshold, usingPushToTalk, isPushToTalkActive, echoCancellation, noiseSuppression, autoGainControl, isScreenSharing } = useSelector(state => state.mediaControlSlice);

    const { user_id: account_id} = useSelector(state => state.accountSlice.account);

    const {selectedMicrophone, selectedWebcam} = useSelector(state => state.deviceSlice);

    const consumers = getConsumers();

    const producers = getProducers();

    const handleMicrophone = useMicrophoneToggle({selectedMicrophone, echoCancellation, autoGainControl, noiseSuppression, getMicrophoneMedia, produce, pauseProducer, closeProducer});
 
    const { handleScreenShare } = useScreenShare({produce, closeProducer});
    // microphoneMuteState effect
    React.useEffect(() => {

        if (typeof closeProducer !== 'function') return;

        if (disable_streams) {
            closeProducer('microphone');

            return;
        }
        
        handleMicrophone(isMicrophoneMuted);
    // eslint-disable-next-line
    }, [isMicrophoneMuted, disable_streams]);

    React.useEffect(() => {

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
        
    // eslint-disable-next-line
    }, [isWebcamOn, selectedWebcam, disable_streams])

    // Hook for detecting speech
    useDetectSpeech((disable_streams || isMicrophoneMuted), pauseProducer, resumeProducer, voiceThreshold, usingPushToTalk);

    usePushToTalk((disable_streams || isMicrophoneMuted), usingPushToTalk, isPushToTalkActive, resumeProducer, pauseProducer);

    // Memoizing combinedUsers to update only when the length of consumers changes
    const combinedUsers = React.useMemo(() => {
        // If the length of consumers has changed, recalculate combinedUsers
        if (!users || disable_streams) return [];

        const updatedUsers = users.map(user => {
            // Find all consumers that match the current user's user_id
            const webcam = user === account_id ? producers.get('webcam') : Array.from(consumers.values()).filter(consumer => consumer.user_id === user && consumer.appData.type === 'webcam')[0];
            
            const stream = user === account_id ? producers.get('screen') : Array.from(consumers.values()).filter(consumer => consumer.user_id === user && consumer.appData.type === 'screen')[0]
            // Return user with the matched consumers
            return { user_id: user, webcam, stream };
        });

        return updatedUsers;
        
    }, [users, consumers, producers, disable_streams, account_id]);
   
    return (
        
            <div 
            style={{
                backgroundColor: useBlackVoiceChannelBackground ? 'black' : null,
            }}
            id='voice-channel'
            data-context={JSON.stringify({type: 'room'})}
            className={`${styles.container}`}>
                <RoomUserWrapper users={combinedUsers} disable_streams={disable_streams} />
                <ChannelBackground channel_background={channel_background} />
                <RoomOverlay />
            </div>
    );
};

