import React from 'react'

import { ServerDetailsProvider} from '../../providers/ServerDetailsProvider/ServerDetailsProvider'

import { Banner } from '../../components/Banner/Banner';

import styles from './server.module.css';

import { useDispatch, useSelector } from 'react-redux';

import { selectServerBanner } from '../../features/ServerDetails/serverDetailsSlice';

import { Channels } from './channels/Channels';

import { Outlet } from 'react-router';

import { ControlBar } from '../../components/ControlBar/ControlBar';

import { Users } from './users/Users';

import { ServerLayoutWrapper } from '../../components/ui/Wrappers/ServerlayoutWrapper/ServerLayoutWrapper';

import { CloseMobileMenu } from '../../components/CloseMobileMenu/CloseMobileMenu';
import { VoiceChannel } from './channel/VoiceChannel/VoiceChannel';
import { setCurrentVoiceChannel } from '../../features/Channel/VoiceChannel/voiceChannelSlice';

export const Server = () => {

    const dispatch = useDispatch();

    const banner = useSelector(selectServerBanner);
    
    const {currentChannel} = useSelector(state => state.channelsSlice);

    const {currentVoiceChannel, focused} = useSelector(state => state.voiceChannelSlice);

    const {server_id} = useSelector(state => state.serverDetailsSlice);

    const {isUserMenuOpen, isChannelMenuOpen} = useSelector(state => state.mobileSlice);

    const hideUsers = useSelector(state => state.appearanceSlice.hideUsers);

    const {fullscreen} = useSelector(state => state.uiSlice);

    React.useEffect(() => {

        return () => {
          
            dispatch(setCurrentVoiceChannel(null));
        }
    }, [dispatch, server_id])

    return (
        <ServerLayoutWrapper hideUsers={hideUsers} isFullscreen={fullscreen}>
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
                    className={`${styles.sectionTwo} ${fullscreen ? styles.fullscreen : ''}`}>
                        <div className={styles.routeWrapper}>
                            <Outlet  />
                        </div>
                        {currentVoiceChannel && (
                        <VoiceChannel focused={focused} channel={currentVoiceChannel} />
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
