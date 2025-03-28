import React from 'react';

import { ChannelProvider } from '../../../providers/ChannelProvider/ChannelProvider';

import { useSelector } from 'react-redux';

import { VoiceChannel } from './VoiceChannel/VoiceChannel';
import { TextChannel } from './TextChannel/TextChannel';

export const Channel = () => {

    const channel = useSelector(state => state.channelsSlice.currentChannel);

    const textChannel = useSelector(state => state.textChannelSlice.currentTextChannel);
   
    return (
        <ChannelProvider>
            {channel ?
            channel?.channel_type === 'voice' ?
            <VoiceChannel channel={channel} />
            : channel?.channel_type === 'text' ?
            <TextChannel channel={textChannel} />
            : null : null}
        </ChannelProvider>
    )
}
