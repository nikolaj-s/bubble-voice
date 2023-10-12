// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Reorder } from 'framer-motion';
// component's
import { ChannelTitle } from './ChannelTitle/ChannelTitle'

// state
import { joinChannel, leaveChannel, reOrderChannels, selectCreateChannelMenuState, selectCurrentChannelId, selectJoiningChannelState, selectServerChannels, selectServerMembers, selectUsersPermissions, throwServerError, toggleCreateChannelMenu } from '../../ServerSlice';
import { ChannelButton } from '../../../../components/buttons/ChannelButton/ChannelButton';
import { selectDisplayName, selectUserBanner, selectUserImage, selectUsername } from '../../../settings/appSettings/accountSettings/accountSettingsSlice';

// style's
import "./ChannelList.css";
import { selectMirroredWebCamState } from '../../../settings/appSettings/voiceVideoSettings/voiceVideoSettingsSlice';
import { selectGlassColor, selectGlassState, selectSecondaryColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectCurrentScreen } from '../../../controlBar/ControlBarSlice';
import { LoadingChannelsPlaceHolder } from '../../../../components/LoadingChannelsPlaceHolder/LoadingChannelsPlaceHolder';
import { socket } from '../ServerBar';


export const ChannelList = ({loading}) => {

    const dispatch = useDispatch();

    const [localChannels, setLocalChannels] = React.useState([])

    const secondaryColor = useSelector(selectSecondaryColor);

    const channels = useSelector(selectServerChannels);

    const username = useSelector(selectUsername);

    const userImage = useSelector(selectUserImage);

    const userBanner = useSelector(selectUserBanner);

    const displayName = useSelector(selectDisplayName);

    const currentChannelId = useSelector(selectCurrentChannelId);

    const serverMembers = useSelector(selectServerMembers);

    const joiningChannel = useSelector(selectJoiningChannelState);

    const mirroredWebCam = useSelector(selectMirroredWebCamState);

    const createChannelMenuOpen = useSelector(selectCreateChannelMenuState);

    const glass = useSelector(selectGlassState);

    const glassColor = useSelector(selectGlassColor);

    const currentScreen = useSelector(selectCurrentScreen);

    const permissions = useSelector(selectUsersPermissions);

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

    const handleReorder = async (value) => {

        if (!permissions.user_can_manage_channels) return;

        clearTimeout(timeout);

        const id_array = value.map(c => c._id);

        dispatch(reOrderChannels(id_array));
    }

    const handleSave = async () => {

        if (!permissions.user_can_manage_channels) return;

        const id_array = channels.map(c => c._id);

        await socket.request('reorganize channels', {new_order: id_array})
        .then(result => {
           
            dispatch(reOrderChannels(result.new_order));
        })
        .catch(error => {
            return;
          //  dispatch(throwServerError({errorMessage: error.message}))
        })
    }

    return (
        <>
        <motion.div 
        style={{backgroundColor: glass ? glassColor : secondaryColor, maxHeight: currentScreen ? 'calc(100% - 275px)' : 'calc(100%)'}}
        className='channel-list-outer-container'>
                
                <div className='channel-list-button-wrapper'>
                    <Reorder.Group onEnded={handleSave} as='div' axis='y' onReorder={handleReorder} values={channels}>
                        {loading ? <LoadingChannelsPlaceHolder /> : 
                        localChannels.map((channel, key) => {
                            return (
                                <Reorder.Item transition={{duration: 0.1}} onDragEnd={handleSave} as='div' dragMomentum={false} value={channel} key={channel._id}>
                                    <ChannelButton index={key} action={handleJoinChannel} channel={channel} key={key} users={channel.users} />
                                </Reorder.Item>
                                
                            )
                        })}
                    </Reorder.Group>
                </div>
        </motion.div>
        </>
            
    )
}
