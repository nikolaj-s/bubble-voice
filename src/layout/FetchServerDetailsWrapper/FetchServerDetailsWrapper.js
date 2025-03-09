
import React from 'react'
import { useSocket } from '../../context/SocketContext'
import { useDispatch, useSelector } from 'react-redux';
import { resetServerDetails, selectServerDetailsStatus, setServerDetails, setServerDetailsStatus } from '../../features/ServerDetails/serverDetailsSlice';
import DashboardSkeleton from '../../components/Loading/DashBoardSkeleton/DashBoardSkeleton';
import { useNavigate, useParams } from 'react-router';

export const FetchServerDetailsWrapper = ({children}) => {

    const navigate = useNavigate();

    const {serverID} = useParams();

    const socket = useSocket();

    const dispatch = useDispatch();

    const status = useSelector(selectServerDetailsStatus);

    React.useEffect(() => {

        if (!serverID) return;

        if (!socket) return;

        const handleFetchServerDetails = async () => {

            dispatch(setServerDetailsStatus('loading'));

            const details = await socket.request('fetch server details', {server_id: serverID})
            .then(res => res.data)
            .catch(error => {
                console.log(error);
                if (error === "Server Not Found") {
                    navigate('/dashboard/not-found')
                } else {
                    navigate('/dashboard/not-found')
                }
            });

            if (details) {

                dispatch(setServerDetails(details));

            }

        }

        handleFetchServerDetails();

        return () => {
            dispatch(resetServerDetails());
        }

    }, [socket, serverID])

    if (status === 'idle') {

        return <></>

    } else if (status === 'loading') {

        return <DashboardSkeleton alt={true} />

    } else if (status === 'complete') {

        return (
            <>
                {children}
            </>
        )
    } else {

        return <></>

    }
    
}
