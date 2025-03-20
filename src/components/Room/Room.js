import React from 'react';

import styles from './Room.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useMediasoup } from '../../context/MediasoupContext';
import { toggleMediaControlLoading } from '../../features/MediaControl/mediaControlSlice';
import { getMicrophoneMedia } from '../../lib/services/getUserMedia';
import { RoomUserWrapper } from './RoomUserWrapper/RoomUserWrapper';
import { useDetectSpeech } from '../../hooks/useDetectSpeech';

export const Room = () => {
    const dispatch = useDispatch();

    const { users } = useSelector(state => state.channelsSlice.currentChannel);

    const { produce, resumeProducer, pauseProducer, closeProducer, getConsumers, getProducers } = useMediasoup();

    const { isMicrophoneMuted } = useSelector(state => state.mediaControlSlice);

    const { user_id: account_id} = useSelector(state => state.accountSlice.account);
   
    const consumers = getConsumers();

    const producers = getProducers();

    // microphoneMuteState effect
    React.useEffect(() => {
        const handleMicrophone = async (state) => {
            dispatch(toggleMediaControlLoading(true));

            if (state) {
                await closeProducer('microphone');
            } else {
                const track = await getMicrophoneMedia();
                
                if (track.error) return;

                await produce('microphone', track);
                await pauseProducer('microphone');
            }

            dispatch(toggleMediaControlLoading(false));
        };
        
        handleMicrophone(isMicrophoneMuted);
    }, [isMicrophoneMuted]);

    // Hook for detecting speech
    useDetectSpeech(isMicrophoneMuted, pauseProducer, resumeProducer);

    // Memoizing combinedUsers to update only when the length of consumers changes
    const combinedUsers = React.useMemo(() => {
        // If the length of consumers has changed, recalculate combinedUsers
        
        const updatedUsers = users.map(user => {
            // Find all consumers that match the current user's user_id
            const userConsumers = user === account_id ? producers.get('webcam') ? [producers.get('webcam')] : [] : Array.from(consumers.values()).filter(consumer => consumer.user_id === user);
        
            // Return user with the matched consumers
            return { user_id: user, consumers: userConsumers };
        });

        return updatedUsers;
        
    }, [users, consumers, producers]);

    return (
        <div className={styles.container}>
            <RoomUserWrapper users={combinedUsers} />
        </div>
    );
};