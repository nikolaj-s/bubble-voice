import React from 'react'

import { VoiceChannelProvider } from '../../../../providers/VoiceChannelProvider/VoiceChannelProvider'

import { MediasoupProvider } from '../../../../context/MediasoupContext'

import { Room } from '../../../../components/Room/Room'
import KeybindProvider from '../../../../providers/KeybindProvider/keybindProvider'
import { MediaPlayerProvider } from '../../../../providers/MediaPlayerProvider/MediaPlayerProvider'

import styles from './VoiceChannel.module.css'
import { UserAudioProvider } from '../../../../context/UserAudioContext'
import { ChannelStatusProvider } from '../../../../providers/ChannelStatusProvider/ChannelStatusProvider'
import { useDispatch } from 'react-redux'
import { setFullscreen } from '../../../../features/Ui/uiSlice'
import { ChannelProvider } from '../../../../providers/ChannelProvider/ChannelProvider'

export const VoiceChannel = ({channel, focused}) => {

    const dispatch = useDispatch();

    React.useEffect(() => {

        return () => {
            dispatch(setFullscreen(false));
        }
        
    }, [dispatch])

    return (
        
        <div className={styles.container} style={{zIndex: focused ? 2 : null}}>  
            <ChannelProvider overlay={true} channel_id_prop={channel}>
                <UserAudioProvider>
                    <KeybindProvider>
                        <VoiceChannelProvider key={channel} channel={channel}>
                            <ChannelStatusProvider>
                                <MediasoupProvider>
                                    <MediaPlayerProvider>
                                        <Room />
                                    </MediaPlayerProvider>
                                </MediasoupProvider>
                            </ChannelStatusProvider>
                        </VoiceChannelProvider>
                    </KeybindProvider>
                </UserAudioProvider>
            </ChannelProvider>
        </div>
      
    )
}
