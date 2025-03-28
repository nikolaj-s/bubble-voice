import React from 'react'
import { useSocket } from '../../context/SocketContext';
import { useDispatch, useSelector } from 'react-redux';
import ChannelButtonSkeleton from '../../components/Loading/ChannelButtonSkeleton/ChannelButtonSkeleton';
import { addCategory, addChannel, reOrderCategories, reOrderChannels, setCategories, setChannels, userJoinsChannel, userLeavesChannel } from '../../features/Channels/channelsSlice';

export const ChannelsProvider = ({children}) => {

    const dispatch = useDispatch();

    const [loading, toggleLoading] = React.useState(true);

    const [error, toggleError] = React.useState(false);

    const {server_id} = useSelector(state => state.serverDetailsSlice);

    const socket = useSocket();

    React.useEffect(() => {

        if (!server_id) return;

        if (!socket) return;

        const handleFetchChannels = async () => {

            await socket.request('fetch channels')
            .then(res => {
                
                if (res.channels) {

                    dispatch(setChannels(res.channels));
                
                }

                if (res.categories) {

                    dispatch(setCategories(res.categories));
                
                }
                
                return;
            })
            .catch(error => {
               
                console.log(error);
                return;
            })

            toggleLoading(false);
        }

        const handleAddCategory = (data) => {
            if (data.category_id) {
                dispatch(addCategory(data));
            }
        }

        const handleAddChannel = (data) => {

            if (data.channel_id) {
                dispatch(addChannel(data));
            }
        
        }

        const handleUserJoinsChannel = (data) => {
            if (data.channel_id && data.user_id) {
                
                dispatch(userJoinsChannel(data));
            }
        }

        const handleUserLeavesChannel = (data) => {
            if (data.channel_id && data.user_id) {
                
                dispatch(userLeavesChannel(data));
            }
        }

        const handleReOrderChannels = (data) => {
            dispatch(reOrderChannels(data));
        }

        const handleReOrderCategories = (data) => {
            dispatch(reOrderCategories(data));
        }

        socket.on('connect', handleFetchChannels);

        socket.on(`add category to ${server_id}`, handleAddCategory);

        socket.on(`add channel to ${server_id}`, handleAddChannel);

        socket.on(`user joins channel ${server_id}`, handleUserJoinsChannel);

        socket.on(`user leaves channel ${server_id}`, handleUserLeavesChannel);

        socket.on(`update channel order for ${server_id}`, handleReOrderChannels);

        socket.on(`update category order for ${server_id}`, handleReOrderCategories);

        handleFetchChannels();

        return () => {
            socket.off('connect', handleFetchChannels);

            socket.off(`add channel to ${server_id}`, handleAddChannel);

            socket.off(`user joins channel ${server_id}`, handleUserJoinsChannel);

            socket.off(`user leaves channel ${server_id}`, handleUserLeavesChannel);

            socket.off(`update channel order for ${server_id}`, handleReOrderChannels);

            socket.off(`update category order for ${server_id}`, handleReOrderCategories);
        }

    }, [socket, server_id, dispatch])

    if (loading) return [...Array(10)].map((_, key) => (<ChannelButtonSkeleton key={key} />))

    return (
        <>
        {children}
        </>
    )
}
