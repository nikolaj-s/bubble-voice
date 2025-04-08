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

    const {currentTextChannel} = useSelector(state => state.textChannelSlice);

    const {isUserMenuOpen, isChannelMenuOpen} = useSelector(state => state.mobileSlice);

    return (
        <ServerLayoutWrapper>
            <ServerDetailsProvider>
                    <CloseMobileMenu />
                    <section 
                    className={`${styles.sectionOne} ${isChannelMenuOpen ? styles.sectionOneMobile : ''} ${currentChannel?.channel_type === 'voice' ? styles.inVoiceChannel : ''}`}
                    >
                        <Banner image={banner} />
                        <Channels currentChannel={currentChannel} />
                        <ControlBar key={'control-bar'} inChannel={currentChannel?.channel_type === 'voice'} />
                    </section>
                    <section 
                    className={`${styles.sectionTwo}`}>
                    <Outlet  />
                    {currentTextChannel && currentChannel?.channel_type === 'voice' && currentChannel.channel_id !== currentTextChannel && (
                        <TextChannelOverlay />
                    )}
                    </section>
                    <section 
                    className={`${styles.sectionThree} ${isUserMenuOpen ? styles.sectionThreeMobile : ''}`}>
                        <Users />
                    </section>
            </ServerDetailsProvider>
        </ServerLayoutWrapper>
    )
}
