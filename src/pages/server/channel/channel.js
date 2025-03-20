import React from 'react';

import { ChannelProvider } from '../../../providers/ChannelProvider/ChannelProvider';

import { useSelector } from 'react-redux';

import { RoomProvider } from '../../../providers/RoomProvider/RoomProvider';
import { MediasoupProvider } from '../../../context/MediasoupContext';
import { Room } from '../../../components/Room/Room';

export const Channel = () => {

    const channel = useSelector(state => state.channelsSlice.currentChannel);
   
    return (
        <ChannelProvider>
            {channel ?
            channel?.channel_type === 'voice' ?
            <RoomProvider key={channel?.channel_id} channel={channel} >
                <MediasoupProvider>
                    <Room />
                </MediasoupProvider>
            </RoomProvider>
            :
            <></>
            : null}
        </ChannelProvider>
    )
}
