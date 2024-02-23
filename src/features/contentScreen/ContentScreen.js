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

import { closeServerErrorMessage, selectKickedMessage, selectKickedState, selectServerErrorMessage, selectServerErrorState, setKickedState } from '../server/ServerSlice';
import { selectAccountVerified, selectNewAccountState } from '../settings/appSettings/accountSettings/accountSettingsSlice';
import { CreateChannelMenu } from '../server/ChannelRoom/CreateChannelMenu/CreateChannelMenu';
import { Error } from '../../components/Error/Error';
import { MemberPanel } from '../server/ChannelRoom/MemberPanel/MemberPanel';
import { KickedMessage } from './KickedMessage/KickedMessage';
import { VerifyAccount } from '../VerifyAccount/VerifyAccount';
import { SocialFilterMenu } from '../../components/SocialFilterMenu/SocialFilterMenu';

export const ContentScreen = () => {
    // content

    const dispatch = useDispatch();

    const newAccount = useSelector(selectNewAccountState);

    const error = useSelector(selectServerErrorState);

    const errorMessage = useSelector(selectServerErrorMessage);

    const kickedState = useSelector(selectKickedState);

    const kickedMessage = useSelector(selectKickedMessage);

    const verified = useSelector(selectAccountVerified);

    const closeError = () => {
        dispatch(closeServerErrorMessage());
    }

    const closeKickedMessage = () => {
        dispatch(setKickedState({kicked: false, kickedMessage: ""}))
    }
    console.log(verified)
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
            <MemberPanel />
            <SocialFilterMenu />
            {kickedState ? <KickedMessage close={closeKickedMessage} message={kickedMessage} /> : null}
            {error ? <Error action={closeError} errorMessage={errorMessage} position='fixed' /> : null}
            {newAccount ? <NewAccount /> : null}
        </>
    )
}
