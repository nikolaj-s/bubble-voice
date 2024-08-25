// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Reorder } from 'framer-motion';
// component's

// state
import { joinChannel, leaveChannel, reOrderCategories, reOrderChannels, selectCategories, selectCurrentChannel, selectCurrentChannelId, selectJoiningChannelState, selectMediaChannels, selectServerChannels, selectServerMembers, selectUsersPermissions, throwServerError, } from '../../ServerSlice';
import { ChannelButton } from '../../../../components/buttons/ChannelButton/ChannelButton';
import { selectDisplayName, selectUserBanner, selectUserImage, selectUsername } from '../../../settings/appSettings/accountSettings/accountSettingsSlice';

// style's
import "./ChannelList.css";
import { selectMirroredWebCamState } from '../../../settings/appSettings/voiceVideoSettings/voiceVideoSettingsSlice';
import { selectGlassColor, selectGlassState, selectSecondaryColor, selectTextColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectCurrentScreen } from '../../../controlBar/ControlBarSlice';
import { LoadingChannelsPlaceHolder } from '../../../../components/LoadingChannelsPlaceHolder/LoadingChannelsPlaceHolder';
import { socket } from '../ServerBar';
import { AltDownIcon } from '../../../../components/Icons/AltDownIcon/AltDownIcon';
import { Category } from './Category/Category';


export const ChannelList = ({loading}) => {

    const dispatch = useDispatch();

    const [collapse, toggleCollapse] = React.useState(false);

    const [collapseMedia, toggleCollapseMedia] = React.useState(false);

    const [localChannels, setLocalChannels] = React.useState([]);

    const [draggingUser, toggleDragginUser] = React.useState(false); 

    const [draggingChannel, toggleDraggingChannel] = React.useState(false);

    const [draggingCategory, toggleDraggingCategory] = React.useState(false);

    const [reordering, toggleReordering] = React.useState(false);

    const secondaryColor = useSelector(selectSecondaryColor);

    const channels = useSelector(selectServerChannels);

    const currentChannel = useSelector(selectCurrentChannel);

    const username = useSelector(selectUsername);

    const userImage = useSelector(selectUserImage);

    const userBanner = useSelector(selectUserBanner);

    const displayName = useSelector(selectDisplayName);

    const currentChannelId = useSelector(selectCurrentChannelId);

    const serverMembers = useSelector(selectServerMembers);

    const joiningChannel = useSelector(selectJoiningChannelState);

    const mirroredWebCam = useSelector(selectMirroredWebCamState);

    const categories = useSelector(selectCategories);

    const currentScreen = useSelector(selectCurrentScreen);

    const permissions = useSelector(selectUsersPermissions);

    const glassColor = useSelector(selectGlassColor);

    const glassState = useSelector(selectGlassState);

    const textColor = useSelector(selectTextColor);

    const inChannel = useSelector(selectCurrentChannelId);

    const handleJoinChannel = (channel) => {

        if (joiningChannel) return;

        if (currentChannelId === channel._id) return;

        if (window.location.hash.includes('/create-channel-menu')) {
            window.location.hash = window.location.hash.split('/create-channel-menu')[0]
        }

        if (window.location.hash.includes('/channel')) {
            window.location.hash = window.location.hash.split('/channel')[0];
            dispatch(leaveChannel({username: username}))
        }

        const { _id } = serverMembers.find(el => el.username === username);

        // delay joining channel to allow proper unmounting of components
        setTimeout(() => {
            const data = {
                _id: _id,
                username: username,
                display_name: displayName,
                user_image: userImage,
                user_banner: userBanner,
                channel: channel,
                mirror_web_cam: mirroredWebCam
            }
            
            dispatch(joinChannel(data));
        }, 200)
            
    }

    React.useEffect(() => {
        setLocalChannels(channels);
    }, [channels])

    // handle mount animation

    let timeout;

    const handleReorder = async (id, moveTo, category) => {

        if (reordering) return;

        if (!permissions.user_can_manage_channels) return;

        toggleReordering(true);

        let id_array = localChannels.map(c => c._id)

        const originatingPos = id_array.findIndex(c => c === id);

        const newPos = id_array.findIndex(c => c === moveTo);
        
        const element = id_array[originatingPos];

        let move_to_pos = newPos < originatingPos ? newPos + 1 : newPos;

        id_array.splice(originatingPos, 1);

        id_array.splice(move_to_pos, 0, element);
        
     //   dispatch(reOrderChannels({new_order: id_array, category: category, channel_id: id}));
        
        await socket.request('reorganize channels', {new_order: id_array, category: category, channel_id: id})
        .then(result => {

            if (result.error) {
                return dispatch(throwServerError({error: true, errorMessage: result.errorMessage}));
            }

            dispatch(reOrderChannels(result));
        })
        .catch(error => {
            console.log(error)
            return;
          //  dispatch(throwServerError({errorMessage: error.message}))
        })

        toggleReordering(false);
    
    }

    const handleReOrderCategories = async (category_id, move_to, below) => {
        if (reordering) return;

        if (!permissions.user_can_manage_channels) return;

        toggleReordering(true);

        let id_array = categories.map(c => c._id);

        const category_pos = id_array.findIndex(c => c === category_id);

        if (category_pos === -1) return;

        const newPos = id_array.findIndex(c => c === move_to);

        const move_to_pos = below && newPos < category_pos ? newPos + 1 : newPos;

        const el = id_array[category_pos];

        id_array.splice(category_pos, 1);

        id_array.splice(move_to_pos, 0, el);

        await socket.request('reorder categories', {new_order: id_array})
        .then(result => {
            if (result.error) {
                return dispatch(throwServerError({error: true, errorMessage: result.errorMessage}));
            }

            dispatch(reOrderCategories(result));
        })
        .catch(err => {
            return dispatch(throwServerError({error: true, errorMessage: err.message}));
        })

        toggleReordering(false);
    }

    return (
        <>
        <motion.div 
        style={{backgroundColor: glassState ? `rgba(${secondaryColor.split('(')[1].split(')')[0]}, 0.8)` : secondaryColor, maxHeight: currentScreen ? 'calc(100% - 360px)' : currentChannelId && (currentChannel?.users?.length > 1 && !currentChannel?.disable_streams) ? 'calc(100% - 208px)' : 'calc(100% - 169px)', paddingBottom: 40}}
        className='channel-list-outer-container'>
            {categories?.map(category => {
                return <Category moveCategory={handleReOrderCategories} draggingCategory={draggingCategory} toggleDraggingCategory={toggleDraggingCategory} category_id={category._id} key={category._id} catagoryName={category.category_name} channels={localChannels.filter(c => c.category === category._id)} draggingChannel={draggingChannel} toggleDraggingChannel={toggleDraggingChannel} toggleDragginUser={toggleDragginUser} draggingUser={draggingUser} move={handleReorder} handleJoinChannel={handleJoinChannel} loading={loading} />
            })}
            <Category category_id={'channels'} catagoryName={'Channels'} channels={localChannels.filter(c => !c.category || c.category === 'channels')} draggingChannel={draggingChannel} toggleDraggingChannel={toggleDraggingChannel} toggleDragginUser={toggleDragginUser} draggingUser={draggingUser} move={handleReorder} handleJoinChannel={handleJoinChannel} loading={loading} />
        </motion.div>
        </>
            
    )
}
