// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Reorder } from 'framer-motion';
// component's

// state
import { joinChannel, leaveChannel, reOrderChannels, selectCurrentChannelId, selectJoiningChannelState, selectServerChannels, selectServerMembers, selectUsersPermissions, } from '../../ServerSlice';
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


export const ChannelList = ({loading}) => {

    const dispatch = useDispatch();

    const [collapse, toggleCollapse] = React.useState(false);

    const [localChannels, setLocalChannels] = React.useState([]);

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

    const glass = useSelector(selectGlassState);

    const glassColor = useSelector(selectGlassColor);

    const currentScreen = useSelector(selectCurrentScreen);

    const permissions = useSelector(selectUsersPermissions);

    const textColor = useSelector(selectTextColor);

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

        setLocalChannels(value);
    }

    const handleSave = async () => {

        if (!permissions.user_can_manage_channels) return;

        const id_array = localChannels.map(c => c._id);
        
        await socket.request('reorganize channels', {new_order: id_array})
        .then(result => {
           
            dispatch(reOrderChannels(result.new_order));
        })
        .catch(error => {
            console.log(error)
            return;
          //  dispatch(throwServerError({errorMessage: error.message}))
        })
    }

    return (
        <>
        <motion.div 
        style={{backgroundColor: glass ? glassColor : secondaryColor, maxHeight: currentScreen ? 'calc(100% - 275px)' : 'calc(100%)'}}
        className='channel-list-outer-container'>
                <div 
                onClick={() => {toggleCollapse(!collapse)}}
                className='channel-list-collapse-button'>
                    <AltDownIcon flip={collapse} />
                    <p style={{color: textColor}}>Channels</p>
                </div>
                <div draggable='false' className='channel-list-button-wrapper'>
                    
                        {loading ? <LoadingChannelsPlaceHolder /> : 
                        <Reorder.Group as='div' axis='y' onReorder={handleReorder} values={channels}>
                            {localChannels.map((channel, key) => {
                                return (
                                    <Reorder.Item transition={{duration: 0.1}} onDragEnd={handleSave} as='div' dragMomentum={true} value={channel} key={`${channel._id}`}>
                                        <ChannelButton collapse={collapse} index={key} action={handleJoinChannel} channel={channel} users={channel.users} />
                                    </Reorder.Item>
                                    
                                )
                            })}
                        </Reorder.Group>
                        }
                </div>
        </motion.div>
        </>
            
    )
}
