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
import { selectHeaderTitle } from './contentScreenSlice';

// style's
import "./ContentScreen.css";
import { selectAddServerMenuVisible } from '../createServer/createServerSlice';

export const ContentScreen = () => {
    // content display state

    const headerTitleState = useSelector(selectHeaderTitle);

    const addServerMenuVisisble = useSelector(selectAddServerMenuVisible);

    return (
        <>
            <motion.div className='content-screen-container' >
                <HeaderTitle title={headerTitleState} spacing={true} />
                <div style={{marginLeft: 1}} className='content-screen-inner-container'>
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
        </>
    )
}
