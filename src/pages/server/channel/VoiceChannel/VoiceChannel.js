import React from 'react'

import { VoiceChannelProvider } from '../../../../providers/VoiceChannelProvider/VoiceChannelProvider'

import { MediasoupProvider } from '../../../../context/MediasoupContext'

import { Room } from '../../../../components/Room/Room'

export const VoiceChannel = ({channel}) => {
    return (
    <VoiceChannelProvider key={channel?.channel_id} channel={channel}>
        <MediasoupProvider>
            <Room />
        </MediasoupProvider>
    </VoiceChannelProvider>
    )
}
