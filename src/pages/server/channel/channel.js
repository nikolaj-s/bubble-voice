import React from 'react';

import { ChannelProvider } from '../../../providers/ChannelProvider/ChannelProvider';

import { useSelector } from 'react-redux';

import { VoiceChannel } from './VoiceChannel/VoiceChannel';
import { TextChannel } from './TextChannel/TextChannel';

export const Channel = () => {

    const voiceChannel = useSelector(state => state.voiceChannelSlice.currentVoiceChannel);

    const textChannel = useSelector(state => state.textChannelSlice.currentTextChannel);
   
    return (
        <ChannelProvider>
            {voiceChannel ?
            <VoiceChannel channel={voiceChannel} />
            : textChannel ?
            <TextChannel channel={textChannel} />
            : null}
        </ChannelProvider>
    )
}
