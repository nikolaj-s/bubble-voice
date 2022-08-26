// library's
import React from 'react'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

// component's
import { ChannelTitle } from './ChannelTitle/ChannelTitle'

// state
import { joinChannel, leaveChannel, selectCurrentChannelId, selectServerChannels } from '../../ServerSlice';
import { ChannelButton } from '../../../../components/buttons/ChannelButton/ChannelButton';
import { selectDisplayName, selectUserBanner, selectUserImage, selectUsername } from '../../../settings/appSettings/accountSettings/accountSettingsSlice';

// style's
import "./ChannelList.css";


export const ChannelList = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [localChannels, setLocalChannels] = React.useState([])

    const channels = useSelector(selectServerChannels);

    const username = useSelector(selectUsername);

    const userImage = useSelector(selectUserImage);

    const userBanner = useSelector(selectUserBanner);

    const displayName = useSelector(selectDisplayName);

    const currentChannelId = useSelector(selectCurrentChannelId);

    const openCreateChannelMenu = () => {
        const location = window.location.hash.split('#')[1];

        if (location.search('/create-channel-menu') === -1) {
            navigate(location + "/create-channel-menu")
        } else {
            navigate(location.split('/create-channel-menu')[0])
        }

    }

    const handleJoinChannel = (channel) => {

        if (currentChannelId === channel._id) return;

        if (window.location.hash.includes('/create-channel-menu')) {
            window.location.hash = window.location.hash.split('/create-channel-menu')[0]
        }

        if (window.location.hash.includes('/channel')) {
            window.location.hash = window.location.hash.split('/channel')[0];
            dispatch(leaveChannel({username: username}))
        }

        // delay joining channel to allow proper unmounting of components
        setTimeout(() => {
            const data = {
                username: username,
                display_name: displayName,
                user_image: userImage,
                user_banner: userBanner,
                channel: channel
            }

            dispatch(joinChannel(data));
        }, 200)
            
    }

    React.useEffect(() => {
        setLocalChannels(channels);
    }, [channels])

    return (
        <>
        <ChannelTitle action={openCreateChannelMenu} />
        <div className='channel-list-outer-container'>
                
                <div className='channel-list-button-wrapper'>
                    <div>
                        {localChannels.map((channel, key) => {
                            return (
                                <ChannelButton action={handleJoinChannel} channel={channel} key={key} users={channel.users} />
                            )
                        })}
                    </div>
                </div>
        </div>
        </>
            
    )
}
