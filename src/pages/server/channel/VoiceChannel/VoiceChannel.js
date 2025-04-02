import React from 'react'

import { VoiceChannelProvider } from '../../../../providers/VoiceChannelProvider/VoiceChannelProvider'

import { MediasoupProvider } from '../../../../context/MediasoupContext'

import { Room } from '../../../../components/Room/Room'
import KeybindProvider from '../../../../providers/KeybindProvider/keybindProvider'

export const VoiceChannel = ({channel}) => {
    return (
    <VoiceChannelProvider key={channel?.channel_id} channel={channel}>
        <KeybindProvider>
            <MediasoupProvider>
                <Room />
            </MediasoupProvider>
        </KeybindProvider>
    </VoiceChannelProvider>
    )
}
