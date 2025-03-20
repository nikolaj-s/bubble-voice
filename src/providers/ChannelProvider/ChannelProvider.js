import React from 'react'
import LoadingSpinnerCard from '../../components/Loading/LoadingSpinnerCard/LoadingSpinnerCard';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { useSocket } from '../../context/SocketContext';
import ErrorCard from '../../components/Error/ErrorCard/ErrorCard';
import { clearCurrentChannel, setCurrentChannel } from '../../features/Channels/channelsSlice';

export const ChannelProvider = ({children}) => {

    const dispatch = useDispatch();

    const socket = useSocket();

    const [loading, toggleLoading] = React.useState(true);

    const [error, toggleError] = React.useState(false);

    const {channelID, serverID} = useParams();

    React.useEffect(() => {

        if (!channelID) return;

        if (!serverID);

        if (!socket) return;

        const handleFetchChannelDetails = async () => {

            toggleLoading(true);

            await socket.request('fetch channel details', {channelID, serverID})
            .then(res => {
                if (res.channel_id) {
                   
                    dispatch(setCurrentChannel(res));
                }
                toggleLoading(false);
                return;
            })
            .catch(error => {
                toggleError(error);
                toggleLoading(false);
                return;
            })

            return;

        }   

        socket.on('connect', handleFetchChannelDetails);

        handleFetchChannelDetails();

        return () => {

            socket.off('connect', handleFetchChannelDetails);

            dispatch(clearCurrentChannel());

        }

    }, [channelID, serverID, socket, dispatch]) 

    if (loading || error) return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'        
        }}>
            {loading ? <LoadingSpinnerCard /> :
            error ? <ErrorCard message={error} /> :
            null
            }
        </div>
    )

    return (
        <>
        {children}
        </>
    )
}
