// library's
import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

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

import { closeServerErrorMessage, selectCurrentChannelId, selectServerErrorMessage, selectServerErrorState } from '../server/ServerSlice';
import { selectNewAccountState } from '../settings/appSettings/accountSettings/accountSettingsSlice';
import { CreateChannelMenu } from '../server/ChannelRoom/CreateChannelMenu/CreateChannelMenu';
import { Error } from '../../components/Error/Error';

export const ContentScreen = () => {
    // content
    const channelId = useSelector(selectCurrentChannelId);

    const dispatch = useDispatch();

    const newAccount = useSelector(selectNewAccountState);

    const error = useSelector(selectServerErrorState);

    const errorMessage = useSelector(selectServerErrorMessage);

    const closeError = () => {
        dispatch(closeServerErrorMessage());
    }

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
            <CreateChannelMenu />
            {error ? <Error action={closeError} errorMessage={errorMessage} position='fixed' /> : null}
            {newAccount ? <NewAccount /> : null}
        </>
    )
}
