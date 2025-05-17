import React from 'react'

import { ServerDetailsProvider} from '../../providers/ServerDetailsProvider/ServerDetailsProvider'

import { Banner } from '../../components/Banner/Banner';

import styles from './server.module.css';

import { useSelector } from 'react-redux';

import { selectServerBanner } from '../../features/ServerDetails/serverDetailsSlice';

import { Channels } from './channels/Channels';

import { Outlet } from 'react-router';

import { ControlBar } from '../../components/ControlBar/ControlBar';

import { TextChannelOverlay } from './channel/TextChannelOverlay/TextChannelOverlay';

import { Users } from './users/Users';

import { ServerLayoutWrapper } from '../../components/ui/Wrappers/ServerlayoutWrapper/ServerLayoutWrapper';

import { CloseMobileMenu } from '../../components/CloseMobileMenu/CloseMobileMenu';

export const Server = () => {

    const banner = useSelector(selectServerBanner);
    
    const {currentChannel} = useSelector(state => state.channelsSlice);

    const {currentVoiceChannel} = useSelector(state => state.voiceChannelSlice);

    const {currentTextChannel} = useSelector(state => state.textChannelSlice);

    const {isUserMenuOpen, isChannelMenuOpen} = useSelector(state => state.mobileSlice);

    const hideUsers = useSelector(state => state.appearanceSlice.hideUsers);

    return (
        <ServerLayoutWrapper hideUsers={hideUsers}>
            <ServerDetailsProvider>
                    <CloseMobileMenu />
                    <section 
                    style={{
                        height: window?.electron?.ipcRenderer ? 'calc(100svh - 70px)' : null
                    }}
                    className={`${styles.sectionOne} ${isChannelMenuOpen ? styles.sectionOneMobile : ''} ${currentVoiceChannel ? styles.inVoiceChannel : ''}`}
                    >
                        <Banner image={banner} />
                        <Channels currentChannel={currentChannel} />
                        <ControlBar key={'control-bar'} />
                    </section>
                    <section 
                    style={{
                        height: window?.electron?.ipcRenderer ? 'calc(100svh - 70px)' : null
                    }}
                    className={`${styles.sectionTwo}`}>
                    <Outlet  />
                    {currentTextChannel && currentVoiceChannel && (
                        <TextChannelOverlay />
                    )}
                    </section>
                    <section 
                    style={{
                        height: window?.electron?.ipcRenderer ? 'calc(100svh - 70px)' : null
                    }}
                    className={`${styles.sectionThree} ${isUserMenuOpen ? styles.sectionThreeMobile : ''} ${hideUsers ? styles.hideUsers : ''}`}>
                        <Users />
                    </section>
            </ServerDetailsProvider>
        </ServerLayoutWrapper>
    )
}
