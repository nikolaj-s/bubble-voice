// library's
import React from 'react'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { motion, useAnimation } from 'framer-motion';

// component's
import { ChannelTitle } from './ChannelTitle/ChannelTitle'

// state
import { joinChannel, leaveChannel, selectCreateChannelMenuState, selectCurrentChannelId, selectJoiningChannelState, selectServerChannels, selectServerMembers, toggleCreateChannelMenu } from '../../ServerSlice';
import { ChannelButton } from '../../../../components/buttons/ChannelButton/ChannelButton';
import { selectDisplayName, selectUserBanner, selectUserImage, selectUsername } from '../../../settings/appSettings/accountSettings/accountSettingsSlice';

// style's
import "./ChannelList.css";
import { selectMirroredWebCamState } from '../../../settings/appSettings/voiceVideoSettings/voiceVideoSettingsSlice';


export const ChannelList = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const animaiton = useAnimation();

    const [localChannels, setLocalChannels] = React.useState([])

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

    const openCreateChannelMenu = () => {
        
        dispatch(toggleCreateChannelMenu(!createChannelMenuOpen))

    }

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

    React.useEffect(() => {

        animaiton.start({
            maxHeight: 'calc(100% - 275px)',
            opacity: 1
        }).then(() => {
            animaiton.start({
                overflowY: 'auto'
            })
        })

    // eslint-disable-next-line
    }, [])

    return (
        <>
        <ChannelTitle action={openCreateChannelMenu} />
        <motion.div 
        initial={{
            maxHeight: 0,
            overflowY: 'hidden',
            opacity: 0
        }}
        animate={animaiton}
        transition={{duration: 0.3}}
        className='channel-list-outer-container'>
                
                <div className='channel-list-button-wrapper'>
                    <div>
                        {localChannels.map((channel, key) => {
                            return (
                                <ChannelButton index={key} action={handleJoinChannel} channel={channel} key={key} users={channel.users} />
                            )
                        })}
                    </div>
                </div>
        </motion.div>
        </>
            
    )
}
