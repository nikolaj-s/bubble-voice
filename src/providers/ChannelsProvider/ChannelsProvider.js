import React from 'react'
import { useSocket } from '../../context/SocketContext';
import { useDispatch, useSelector } from 'react-redux';
import ChannelButtonSkeleton from '../../components/ui/Loading/ChannelButtonSkeleton/ChannelButtonSkeleton';
import { addChannel, removeChannel, reorderChannels, setChannels, setChannelsStatus, updateCategoryofChannels, updateChannelDetails, updateChannelStatus, updateLatestMessageAt, userJoinsChannel, userLeavesChannel } from '../../features/Channel/Channels/channelsSlice';
import { removeCategory, reorderCategories, setCategories, updateCategoryDetails, addCategory } from '../../features/Categories/categoriesSlice';

export const ChannelsProvider = ({children}) => {

    const dispatch = useDispatch();

    const [loading, toggleLoading] = React.useState(true);

    const [error, toggleError] = React.useState(false);

    const {server_id} = useSelector(state => state.serverDetailsSlice);

    const serverStatus = useSelector(state => state.serverDetailsSlice.status);

    const socket = useSocket();

    React.useEffect(() => {

        if (!server_id) return;

        if (!socket) return;

        if (serverStatus !== 'complete') return;

        const handleFetchChannels = async () => {

            dispatch(setChannelsStatus("loading"))

            await socket.request('fetch channels')
            .then(res => {
                console.log(res)
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

            dispatch(setChannelsStatus("complete"));

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

        const handleReOrderChannels = data => dispatch(reorderChannels(data));

        const handleReOrderCategories = data => dispatch(reorderCategories(data));

        const handleUpdateChannelDetails = data => dispatch(updateChannelDetails(data));

        const handleUpdateCategoryDetails = data => dispatch(updateCategoryDetails(data));

        const handleRemoveCategory = (data) => {

            dispatch(removeCategory(data));

            dispatch(updateCategoryofChannels(data));
        }

        const handleUpdateChannelStatus = data => dispatch(updateChannelStatus(data));

        const handleRemoveChannel = data => dispatch(removeChannel(data));

        const handleUpdateLatestMessageAt = data => dispatch(updateLatestMessageAt(data));

        socket.on('connect', handleFetchChannels);

        socket.on(`add category to ${server_id}`, handleAddCategory);

        socket.on(`add channel to ${server_id}`, handleAddChannel);

        socket.on(`user joins channel ${server_id}`, handleUserJoinsChannel);

        socket.on(`user leaves channel ${server_id}`, handleUserLeavesChannel);

        socket.on(`update channel order for ${server_id}`, handleReOrderChannels);

        socket.on(`update category order for ${server_id}`, handleReOrderCategories);

        socket.on(`update channel in ${server_id}`, handleUpdateChannelDetails);

        socket.on(`update channel status in ${server_id}`, handleUpdateChannelStatus);

        socket.on(`delete channel in ${server_id}`, handleRemoveChannel);

        socket.on(`update category in ${server_id}`, handleUpdateCategoryDetails);

        socket.on(`delete category in ${server_id}`, handleRemoveCategory);

        socket.on(`update latest message in ${server_id}`, handleUpdateLatestMessageAt);

        handleFetchChannels();

        return () => {
            socket.off('connect', handleFetchChannels);

            socket.off(`add channel to ${server_id}`, handleAddChannel);

            socket.off(`user joins channel ${server_id}`, handleUserJoinsChannel);

            socket.off(`user leaves channel ${server_id}`, handleUserLeavesChannel);

            socket.off(`update channel order for ${server_id}`, handleReOrderChannels);

            socket.off(`update category order for ${server_id}`, handleReOrderCategories);

            socket.off(`update channel in ${server_id}`, handleUpdateChannelDetails);

            socket.off(`update channel status in ${server_id}`, handleUpdateChannelStatus);

            socket.off(`delete channel in ${server_id}`, handleRemoveChannel);

            socket.off(`update category in ${server_id}`, handleUpdateCategoryDetails);

            socket.off(`delete category in ${server_id}`, handleRemoveCategory);

            socket.off(`update latest message in ${server_id}`, handleUpdateLatestMessageAt);

            dispatch(setChannelsStatus("loading"));
        }

    }, [socket, server_id, dispatch, serverStatus])

    if (loading) return [...Array(10)].map((_, key) => (<ChannelButtonSkeleton key={key} />))

    return (
        <>
        {children}
        </>
    )
}
