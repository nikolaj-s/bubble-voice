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
import { selectOverlayOpenState, toggleOverlay } from '../server/ChannelRoom/Room/Music/MusicSlice';
import { selectAccentColor, selectGlassColor, selectSecondaryColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { MusicWidget } from '../../components/widgets/Widgets/MusicWIdget/MusicWIdget';
import { CloseIcon } from '../../components/Icons/CloseIcon/CloseIcon';

export const ContentScreen = () => {
    // content

    const dispatch = useDispatch();

    const newAccount = useSelector(selectNewAccountState);

    const error = useSelector(selectServerErrorState);

    const errorMessage = useSelector(selectServerErrorMessage);

    const kickedState = useSelector(selectKickedState);

    const kickedMessage = useSelector(selectKickedMessage);

    const verified = useSelector(selectAccountVerified);

    const mediaOverlay = useSelector(selectOverlayOpenState);

    const glassColor = useSelector(selectGlassColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const accentColor = useSelector(selectAccentColor)

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
            {mediaOverlay ?
            <div
            onClick={() => {dispatch(toggleOverlay())}}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                backgroundColor: glassColor,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                zIndex: 10
            }}
            >   
                <div
                style={{
                    backgroundColor: accentColor,
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 40,
                    right: 40,
                    cursor: 'pointer',
                    borderRadius: '50%',
                    zIndex: 10
                }}
                >
                    <CloseIcon />
                </div>
                <motion.div
                onClick={(e) => {e.stopPropagation()}}
                className='media-widget-room-wrapper'
                >   
                    <MusicWidget roomOverlay={true} />
            </motion.div>
            </div>
            

            : null}
            {kickedState ? <KickedMessage close={closeKickedMessage} message={kickedMessage} /> : null}
            {error ? <Error action={closeError} errorMessage={errorMessage} position='fixed' /> : null}
            {newAccount ? <NewAccount /> : null}
        </>
    )
}
