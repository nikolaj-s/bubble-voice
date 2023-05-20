// library's
import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

// components
import { NoServerSelectedDisplay } from './NoServerSelectedDisplay/NoServerSelectedDisplay';
import { SettingsRoutesWrapper } from '../settings/SettingsRoutestWrapper/SettingsRoutesWrapper';
import { CreateServerMenu } from '../createServer/createServerMenu/CreateServerMenu';
import { ChannelRoom } from '../server/ChannelRoom/ChannelRoom';

import { Disconnected } from '../../components/disconnected/Disconnected';
import { ExpandContent } from '../ExpandContent/ExpandContent';
import { NewAccount } from '../../components/NewAccount/NewAccount';
import { AudioInit } from '../AudioInit/AudioInit';

// state
import { HeaderTitle } from '../../components/titles/headerTitle/headerTitle';

// style's
import "./ContentScreen.css";
import { selectAddServerMenuVisible } from '../createServer/createServerSlice';
import { selectCurrentChannelId } from '../server/ServerSlice';
import { RoomAmbiance } from '../../components/RoomAmbiance/RoomAmbiance';

export const ContentScreen = () => {
    // content display state

    const addServerMenuVisisble = useSelector(selectAddServerMenuVisible);

    const channelId = useSelector(selectCurrentChannelId);

    return (
        <>
            <motion.div className='content-screen-container' >
                <HeaderTitle spacing={true} />
                <div className='content-screen-inner-container'>
                    <Disconnected />
                    <NoServerSelectedDisplay />
                    <SettingsRoutesWrapper />
                    {addServerMenuVisisble ? <CreateServerMenu /> : null}
                    <ChannelRoom />
                    
                    <NewAccount />
                </div>
                <AudioInit />
            </motion.div>
            <ExpandContent />
            {channelId ? <RoomAmbiance /> : null}
        </>
    )
}
