// library's
import React from 'react'
import { useNavigate, useRoutes } from 'react-router'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';

// state
import { cleanUpJoiningNewServerState, closeJoinServerError, joinNewServer, selectServerToJoin, selectServerToJoinErrorMessage, selectServerToJoinErrorState, selectServerToJoinLoading, selectServerToJoinPassword, setJoinServerState, setServerToJoin } from './joinServerSlice';

// components
import { Image } from '../../components/Image/Image';

// style
import "./JoinServer.css";
import { setHeaderTitle } from '../contentScreen/contentScreenSlice';
import { selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { InputTitle } from '../../components/titles/inputTitle/InputTitle';
import { TextInput } from '../../components/inputs/TextInput/TextInput';
import { ApplyCancelButton } from '../../components/buttons/ApplyCancelButton/ApplyCancelButton';
import { LoadingErrorComponent } from '../../components/LoadingErrorComponent/LoadingErrorComponent';
import { handleLeavingServer, selectServerId } from '../server/ServerSlice';
import { playSoundEffect } from '../settings/soundEffects/soundEffectsSlice';
import { clearWidgetOverLay } from '../server/ChannelRoom/Room/RoomActionOverlay/RoomActionOverlaySlice';


export const JoinServer = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const server = useSelector(selectServerToJoin);

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const textColor = useSelector(selectTextColor);

    const loading = useSelector(selectServerToJoinLoading);

    const error = useSelector(selectServerToJoinErrorState);

    const errorMessage = useSelector(selectServerToJoinErrorMessage);

    const password = useSelector(selectServerToJoinPassword);

    const currentServer = useSelector(selectServerId);
    
    React.useEffect(() => {

        dispatch(setHeaderTitle("Join Server"))

        return () => {
            dispatch(setHeaderTitle("Select Server")) 
        }
    // eslint-disable-next-line
    }, [])
    
    const handleCancel = () => {
        dispatch(cleanUpJoiningNewServerState());
    }

    const closeError = () => {
        dispatch(closeJoinServerError());
    }

    const handleInput = (value, state) => {
        dispatch(setJoinServerState({value: value, state: state}));
    }

    const join = () => {

        if (currentServer) {

            dispatch(playSoundEffect("disconnected"));

            dispatch(clearWidgetOverLay());

            dispatch(handleLeavingServer());

            navigate('/dashboard');

            setTimeout(() => {

                dispatch(joinNewServer());

            }, 500)
        } else {

            dispatch(joinNewServer());
        
        }

        dispatch(setServerToJoin({}))
        
    }

    return (
        <>
        {server?.server_name ?
        <motion.div 
        style={{backgroundColor: secondaryColor}}
        className='join-server-container'>
            <div className='join-server-inner-container'>
                <div className='join-server-banner-container'>
                    <Image image={server?.server_banner} />
                    <h1 style={{
                        color: textColor,
                        backgroundColor: primaryColor,
                    }}>{server?.server_name}</h1>
                </div>
                <InputTitle title={"Enter Password"} />
                <TextInput type='password' stateSelector='password' action={handleInput} inputValue={password} placeholder={"Password"} />
                <ApplyCancelButton apply={join} cancel={handleCancel} name='Join' />
            </div>
            <LoadingErrorComponent action={closeError}  loading={loading} errorMessage={errorMessage}
            error={error}  />
        </motion.div>
        : null}
    </>
    )
}

