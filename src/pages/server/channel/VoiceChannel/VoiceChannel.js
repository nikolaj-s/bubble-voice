import React from 'react'

import { VoiceChannelProvider } from '../../../../providers/VoiceChannelProvider/VoiceChannelProvider'

import { MediasoupProvider } from '../../../../context/MediasoupContext'

import { Room } from '../../../../components/Room/Room'
import KeybindProvider from '../../../../providers/KeybindProvider/keybindProvider'
import { MediaPlayerProvider } from '../../../../providers/MediaPlayerProvider/MediaPlayerProvider'

import styles from './VoiceChannel.module.css'
import { UserAudioProvider } from '../../../../context/UserAudioContext'

export const VoiceChannel = ({channel, focused}) => {

    return (
        
        <div className={styles.container} style={{zIndex: focused ? 2 : null}}>

            <UserAudioProvider>
                <KeybindProvider>
                    <VoiceChannelProvider key={channel} channel={channel}>
                        
                        <MediasoupProvider>
                            <MediaPlayerProvider>
                                <Room />
                            </MediaPlayerProvider>
                        </MediasoupProvider>
                        
                    </VoiceChannelProvider>
                </KeybindProvider>
            </UserAudioProvider>
        </div>
    )
}
