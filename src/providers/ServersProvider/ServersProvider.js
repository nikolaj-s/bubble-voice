import React from 'react'
import { useSocket } from '../../context/SocketContext'
import { useDispatch } from 'react-redux';
import { setServers, updateServerButton } from '../../features/Servers/serversSlice';

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

            handleJoinServers();

            socket.on('connect', handleJoinServers);

            socket.on('update server button', handleUpdateServerButton);

            return () => {
                socket.off('connect', handleJoinServers);

                socket.off('update server button', handleUpdateServerButton);
            }

        }

    }, [socket, dispatch]);

    if (loading) return null;

    return (
        <>
        {children}
        </>
    )
}
