import React from 'react'
import { useDispatch } from 'react-redux'
import { useSocket } from '../../context/SocketContext';
import { fetchLastReadStatus } from '../../features/Notifications/Thunks/fetchLastReadStatus';

export const NotificationProvider = ({children}) => {

    const dispatch = useDispatch();

    const socket = useSocket();

    React.useEffect(() => {

        dispatch(fetchLastReadStatus());

    }, [dispatch]);


    

    return (
        <>
        {children}
        </>
    )
}
