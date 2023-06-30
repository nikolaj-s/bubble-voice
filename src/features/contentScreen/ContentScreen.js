// library's
import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

// components
import { NoServerSelectedDisplay } from './NoServerSelectedDisplay/NoServerSelectedDisplay';
import { SettingsRoutesWrapper } from '../settings/SettingsRoutestWrapper/SettingsRoutesWrapper';
import { ChannelRoom } from '../server/ChannelRoom/ChannelRoom';

import { Disconnected } from '../../components/disconnected/Disconnected';
import { ExpandContent } from '../ExpandContent/ExpandContent';
import { NewAccount } from '../../components/NewAccount/NewAccount';

// state
import { HeaderTitle } from '../../components/titles/headerTitle/headerTitle';

// style's
import "./ContentScreen.css";

import { selectCurrentChannelId } from '../server/ServerSlice';
import { RoomAmbiance } from '../../components/RoomAmbiance/RoomAmbiance';
import { selectNewAccountState } from '../settings/appSettings/accountSettings/accountSettingsSlice';
export const ContentScreen = () => {
    // content
    const channelId = useSelector(selectCurrentChannelId);

    const newAccount = useSelector(selectNewAccountState);

    return (
        <>
            <motion.div className='content-screen-container' >
                <HeaderTitle spacing={true} />
                <div className='content-screen-inner-container'>
                    <NoServerSelectedDisplay />
                    <SettingsRoutesWrapper />
                    <ChannelRoom />
                    <Disconnected />
                </div>
            </motion.div>
            <ExpandContent />
            {newAccount ? <NewAccount /> : null}
            {channelId ? <RoomAmbiance /> : null}
        </>
    )
}
