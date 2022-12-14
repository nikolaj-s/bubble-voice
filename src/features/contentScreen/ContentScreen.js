// library's
import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

// components
import { NoServerSelectedDisplay } from './NoServerSelectedDisplay/NoServerSelectedDisplay';
import { SettingsRoutesWrapper } from '../settings/SettingsRoutestWrapper/SettingsRoutesWrapper';
import { CreateServerMenu } from '../createServer/createServerMenu/CreateServerMenu';
import { ChannelRoom } from '../server/ChannelRoom/ChannelRoom';
import { JoinServer } from '../joinServer/JoinServer';
import { Disconnected } from '../../components/disconnected/Disconnected';
import { ExpandContent } from '../ExpandContent/ExpandContent';
import { NewAccount } from '../../components/NewAccount/NewAccount';
import { AudioInit } from '../AudioInit/AudioInit';

// state
import { selectSecondaryColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { HeaderTitle } from '../../components/titles/headerTitle/headerTitle';
import { selectHeaderTitle } from './contentScreenSlice';

// style's
import "./ContentScreen.css";

export const ContentScreen = () => {
    // color schema
    const secondaryColor = useSelector(selectSecondaryColor);

    // content display state

    const headerTitleState = useSelector(selectHeaderTitle);

    return (
        <motion.div className='content-screen-container' >
            <HeaderTitle title={headerTitleState} spacing={true} />
            <div style={{backgroundColor: secondaryColor}} className='content-screen-inner-container'>
                <Disconnected />
                <NoServerSelectedDisplay />
                <SettingsRoutesWrapper />
                <CreateServerMenu />
                <JoinServer />
                <ChannelRoom />
                <ExpandContent />
                <NewAccount />
            </div>
            <AudioInit />
        </motion.div>
    )
}
