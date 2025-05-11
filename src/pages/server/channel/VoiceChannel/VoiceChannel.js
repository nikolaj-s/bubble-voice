import React from 'react'

import { VoiceChannelProvider } from '../../../../providers/VoiceChannelProvider/VoiceChannelProvider'

import { MediasoupProvider } from '../../../../context/MediasoupContext'

import { Room } from '../../../../components/Room/Room'
import KeybindProvider from '../../../../providers/KeybindProvider/keybindProvider'
import { MediaPlayerProvider } from '../../../../providers/MediaPlayerProvider/MediaPlayerProvider'

export const VoiceChannel = ({channel}) => {
    return (
    <VoiceChannelProvider key={channel} channel={channel}>
        <KeybindProvider>
            <MediasoupProvider>
                <MediaPlayerProvider>
                    <Room />
                </MediaPlayerProvider>
            </MediasoupProvider>
        </KeybindProvider>
    </VoiceChannelProvider>
    )
}
