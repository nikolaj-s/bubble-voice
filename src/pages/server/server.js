import React from 'react'

import { ServerDetailsProvider} from '../../providers/ServerDetailsProvider/ServerDetailsProvider'

import { Banner } from '../../components/Banner/Banner';

import styles from './server.module.css';

import { useDispatch, useSelector } from 'react-redux';

import { selectServerBanner } from '../../features/ServerDetails/serverDetailsSlice';

import { Channels } from './channels/Channels';

import { Outlet } from 'react-router';

import { ControlBar } from '../../components/ControlBar/ControlBar';

import { ServerLayoutWrapper } from '../../components/ui/Wrappers/ServerlayoutWrapper/ServerLayoutWrapper';

import { CloseMobileMenu } from '../../components/CloseMobileMenu/CloseMobileMenu';
import { VoiceChannel } from './channel/VoiceChannel/VoiceChannel';
import { setCurrentVoiceChannel } from '../../features/Channel/VoiceChannel/voiceChannelSlice';
import { SectionThree } from './SectionThree/SectionThree';
import { ServerUsersProvider } from '../../providers/ServerUsersProvider/ServerUsersProvider';
import ScrollLoadWrapper from '../../components/ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper';
import StickyWrapper from '../../components/ui/Wrappers/StickyWrapper/StickyWrapper';
import { ServerNav } from '../../layout/Navigation/ServerNav/ServerNav';
import { useSearchParams } from 'react-router-dom';
import { isValidObjectId } from '../../lib/services/helperFunctions';

export const Server = () => {

    const dispatch = useDispatch();

    const banner = useSelector(selectServerBanner);

    const [searchParams, setSearchParams] = useSearchParams();
    
    const {currentChannel} = useSelector(state => state.channelsSlice);

    const {currentVoiceChannel, focused} = useSelector(state => state.voiceChannelSlice);

    const {server_id} = useSelector(state => state.serverDetailsSlice);

    const {isUserMenuOpen, isChannelMenuOpen} = useSelector(state => state.mobileSlice);

    const hideUsers = useSelector(state => state.appearanceSlice.hideUsers);

    const {fullscreen} = useSelector(state => state.uiSlice);

    React.useEffect(() => {

        if (!searchParams.get('voice-channel')) return;

        if (isValidObjectId(searchParams.get('voice-channel'))) {
            dispatch(setCurrentVoiceChannel(searchParams.get('voice-channel')));

            setSearchParams({});
        }

    }, [searchParams])

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
                        height: window?.electron?.ipcRenderer ? 'calc(100svh - 75px)' : null
                    }}
                    className={`${styles.sectionOne} ${isChannelMenuOpen ? styles.sectionOneMobile : ''} ${currentVoiceChannel ? styles.inVoiceChannel : ''}`}
                    >
                        <ScrollLoadWrapper context={{createChannel: true, createCategory: true, type: "channelList"}}>
                            <Banner image={banner} />
                            <StickyWrapper>
                                <ServerNav />
                            </StickyWrapper>
                            <Channels currentChannel={currentChannel} />

                        </ScrollLoadWrapper>
                        <ControlBar key={'control-bar'} />
                    </section>
                    <section 
                    style={{
                        height: fullscreen ? '100vh' : window?.electron?.ipcRenderer ? 'calc(100svh - 75px)' : null
                    }}
                    className={`${styles.sectionTwo} ${fullscreen ? styles.fullscreen : ''}`}>
                        <div style={{
                            opacity: focused && currentVoiceChannel ? 0 : null
                        }} className={styles.routeWrapper}>
                            <Outlet  />
                        </div>
                        {currentVoiceChannel && (
                        <VoiceChannel focused={focused} channel={currentVoiceChannel} />
                        )}
                    </section>
                    <section 
                    style={{
                        height: window?.electron?.ipcRenderer ? 'calc(100svh - 75px)' : null
                    }}
                    className={`${styles.sectionThree} ${isUserMenuOpen ? styles.sectionThreeMobile : ''} ${hideUsers ? styles.hideUsers : ''}`}>
                        <ServerUsersProvider>
                            <SectionThree />
                        </ServerUsersProvider>
                    </section>
            </ServerDetailsProvider>
        </ServerLayoutWrapper>
    )
}
