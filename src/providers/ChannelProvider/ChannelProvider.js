import React from 'react'
import LoadingSpinnerCard from '../../components/Loading/LoadingSpinnerCard/LoadingSpinnerCard';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { useSocket } from '../../context/SocketContext';
import ErrorCard from '../../components/Error/ErrorCard/ErrorCard';
import { clearCurrentChannel, setCurrentChannel } from '../../features/Channels/channelsSlice';
import { setCurrentTextChannel } from '../../features/TextChannel/textChannelSlice';

export const ChannelProvider = ({children, overlay = false, channel_id_prop}) => {

    const dispatch = useDispatch();

    const socket = useSocket();

    const [loading, toggleLoading] = React.useState(true);

    const [error, toggleError] = React.useState(false);

    const [showSpinner, setShowSpinner] = React.useState(false);

    const {channelID: channel_id_param, serverID} = useParams();

    const [channelID, setChannelID] = React.useState(null);

    React.useEffect(() => {

        if (overlay) {
            setChannelID(channel_id_prop)
        } else {
            setChannelID(channel_id_param)
        }

    }, [channel_id_prop, overlay, channel_id_param])

    React.useEffect(() => {

        if (!channelID) return;

        if (!serverID);

        if (!socket) return;

        const handleFetchChannelDetails = async () => {

            toggleLoading(true);

            await socket.request('fetch channel details', {channelID, serverID})
            .then(res => {
                if (res.channel_id) {

                    if (!overlay) {
                        dispatch(setCurrentChannel(res));
                    }
                    
                    if (res.channel_type === 'text') {
                        dispatch(setCurrentTextChannel(res.channel_id));
                    }

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

    React.useEffect(() => {
        let timer;

        if (loading) {
          timer = setTimeout(() => {
            setShowSpinner(true);
          }, 500); // Show spinner only after 500ms
        } else {
          setShowSpinner(false);
          clearTimeout(timer);
        }
    
        return () => clearTimeout(timer);


    }, [loading]);

    if (loading || error) return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'        
        }}>
            {showSpinner ? <LoadingSpinnerCard /> :
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
