import React from 'react'
import { useSocket } from '../../context/SocketContext'
import { useDispatch } from 'react-redux';
import { setServers, setServerStatus, updateServerButton } from '../../features/Servers/serversSlice';
import ServerSkeletonLoader from '../../components/ui/Loading/ServerSkeletonLoader/ServerSkeletonLoader';

export const ServersProvider = ({children}) => {

    const [loading, toggleLoading] = React.useState(false);

    const dispatch = useDispatch();

    const socket = useSocket();

    React.useEffect(() => {
    
        if (socket) {

            const handleJoinServers = async () => {
                try {
                    toggleLoading(true);

                    await socket.request('join servers')
                    .then(res => {
                        dispatch(setServers(res));
                    })
                    .catch(error => {
                        console.log(error);
                    })

                    toggleLoading(false);
                } catch (error) {
                    console.log(error);
                }
            }

            const handleUpdateServerButton = (data) => {
                dispatch(updateServerButton(data));
            }

            const handleSetServerStatuses = (data) => dispatch(setServerStatus(data));

            socket.on('connect', handleJoinServers);

            socket.on('update server button', handleUpdateServerButton);

            socket.on('set server status', handleSetServerStatuses);

            handleJoinServers();

            return () => {
                socket.off('connect', handleJoinServers);

                socket.off('update server button', handleUpdateServerButton);

                socket.off('set server status', handleSetServerStatuses);
            }

        }

    }, [socket, dispatch]);

    if (loading) return <ServerSkeletonLoader />;

    return (
        <>
        {children}
        </>
    )
}
