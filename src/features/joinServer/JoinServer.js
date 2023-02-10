// library's
import React from 'react'
import { useNavigate, useRoutes } from 'react-router'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';

// state
import { cleanUpJoiningNewServerState, closeJoinServerError, joinNewServer, selectServerToJoin, selectServerToJoinErrorMessage, selectServerToJoinErrorState, selectServerToJoinLoading, selectServerToJoinPassword, setJoinServerState } from './joinServerSlice';

// components
import { Image } from '../../components/Image/Image';

// style
import "./JoinServer.css";
import { setHeaderTitle } from '../contentScreen/contentScreenSlice';
import { selectPrimaryColor, selectTextColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { InputTitle } from '../../components/titles/inputTitle/InputTitle';
import { TextInput } from '../../components/inputs/TextInput/TextInput';
import { ApplyCancelButton } from '../../components/buttons/ApplyCancelButton/ApplyCancelButton';
import { LoadingErrorComponent } from '../../components/LoadingErrorComponent/LoadingErrorComponent';


const Display = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const server = useSelector(selectServerToJoin);

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const loading = useSelector(selectServerToJoinLoading);

    const error = useSelector(selectServerToJoinErrorState);

    const errorMessage = useSelector(selectServerToJoinErrorMessage);

    const password = useSelector(selectServerToJoinPassword);

    React.useEffect(() => {

        dispatch(setHeaderTitle("Join Server"))

        return () => {
            dispatch(setHeaderTitle("Select Server")) 
        }
    // eslint-disable-next-line
    }, [])

    const handleCancel = () => {
        dispatch(cleanUpJoiningNewServerState())
        navigate('/dashboard/createserver');
    }

    const closeError = () => {
        dispatch(closeJoinServerError());
    }

    const handleInput = (value, state) => {
        dispatch(setJoinServerState({value: value, state: state}));
    }

    const join = () => {
        dispatch(joinNewServer());
    }

    return (
        <motion.div className='join-server-container'>
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
    )
}

export const JoinServer = () => useRoutes([
    {path: "/join-server/:id", element: <Display /> }
])

