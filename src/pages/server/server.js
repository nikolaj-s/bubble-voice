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

export const Server = () => {

    const banner = useSelector(selectServerBanner);
    
    const {currentChannel} = useSelector(state => state.channelsSlice);

    const {currentTextChannel} = useSelector(state => state.textChannelSlice);

    return (
        <ServerLayoutWrapper>
            <ServerDetailsProvider>
                    <section 
                    className={styles.sectionOne}
                    style={{
                        gridTemplateRows: currentChannel?.channel_type === 'voice' ? '80px minmax(0px, 1fr) 110px' : '80px minmax(0px, 1fr) 65px'
                    }}
                    >
                        <Banner image={banner} />
                        <Channels currentChannel={currentChannel} />
                        <ControlBar key={'control-bar'} inChannel={currentChannel?.channel_type === 'voice'} />
                    </section>
                    <section 
                    className={styles.sectionTwo}>
                    <Outlet  />
                    {currentTextChannel && currentChannel?.channel_type === 'voice' && currentChannel.channel_id !== currentTextChannel && (
                        <TextChannelOverlay />
                    )}
                    </section>
                    <section 
                    className={styles.sectionThree}>
                        <Users />
                    </section>
            </ServerDetailsProvider>
        </ServerLayoutWrapper>
    )
}
