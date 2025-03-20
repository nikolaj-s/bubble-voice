
import React from 'react'
import { useSocket } from '../../context/SocketContext'
import { useDispatch, useSelector } from 'react-redux';
import { resetServerDetails, selectServerDetailsStatus, setServerDetails, setServerDetailsStatus } from '../../features/ServerDetails/serverDetailsSlice';
import DashboardSkeleton from '../../components/Loading/DashBoardSkeleton/DashBoardSkeleton';
import { useNavigate, useParams } from 'react-router';

export const FetchServerDetailsProvider = ({children}) => {

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

        const handleServerDetailsUpdate = (data) => {
            if (data.server_id) {
                dispatch(setServerDetails(data));
            }
        }   

        socket.on(`update server details ${serverID}`, handleServerDetailsUpdate);

        socket.on('connect', handleFetchServerDetails);

        handleFetchServerDetails();

        return () => {
            socket.off(`update server details ${serverID}`, handleServerDetailsUpdate);

            socket.off('connect', handleFetchServerDetails);

            dispatch(resetServerDetails());
        }

    }, [socket, serverID, dispatch])

    
    if (status === 'idle') {

        return <></>

    } else if (status === 'loading') {

        return <DashboardSkeleton key="dashboard-loader" alt={true} />

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
