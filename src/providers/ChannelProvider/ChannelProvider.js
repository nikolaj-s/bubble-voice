import React from 'react'
import LoadingSpinnerCard from '../../components/ui/Loading/LoadingSpinnerCard/LoadingSpinnerCard';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { useSocket } from '../../context/SocketContext';
import ErrorCard from '../../components/Error/ErrorCard/ErrorCard';
import { clearCurrentChannel, setCurrentChannel } from '../../features/Channel/Channels/channelsSlice';
import { setCurrentTextChannel } from '../../features/Channel/TextChannel/textChannelSlice';

export const ChannelProvider = ({children, overlay = false, channel_id_prop}) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const socket = useSocket();

    const [loading, toggleLoading] = React.useState(true);

    const [error, toggleError] = React.useState(false);

    const [showSpinner, setShowSpinner] = React.useState(false);

    const {channelID: channel_id_param, serverID: server_id_param} = useParams();

    const [channelID, setChannelID] = React.useState(null);

    const [serverID, setServerID] = React.useState(null);

    React.useEffect(() => {
        
        if (overlay) {
            setChannelID(channel_id_prop)
        } else {
            setChannelID(channel_id_param)
        }

        setServerID(server_id_param);

    }, [channel_id_prop, overlay, channel_id_param, server_id_param])

    React.useEffect(() => {

        if (!channelID) return;

        if (!serverID) return;

        if (!socket) return;

      //  if (channelsStatus !== 'complete') return;
       
        const handleFetchChannelDetails = async () => {
            
            toggleError(false);

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

                } else {
                    toggleError("404 No Channel Found");
                }
                toggleLoading(false);
                return;
            })
            .catch(error => {
                console.log(error);
                toggleError(error);
                toggleLoading(false);
                return;
            })

            return;

        }   

        const onChannelDelete = () => {
            if (overlay) {
                dispatch(setCurrentTextChannel(null));
            } else {
                navigate(`/dashboard/server/${serverID}`)
            }
        };

        socket.on('connect', handleFetchChannelDetails);

        socket.on(`delete channel ${channelID}`, onChannelDelete);

        handleFetchChannelDetails();

        return () => {

            socket.off('connect', handleFetchChannelDetails);

            socket.off(`delete channel ${channelID}`, onChannelDelete);

            if (!overlay) dispatch(clearCurrentChannel());

        }

    }, [channelID, serverID, socket, dispatch, overlay]) 

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

    if ((loading && showSpinner) || error) return (
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
