import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Image } from '../../Image/Image';

import { toggleProfileTab } from '../../../features/Profile/ProfileSlice';
import { toggleMediaPanel } from '../../../features/SavedMedia/SavedMediaSlice';
import { toggleAddServerMenu } from '../../../features/createServer/createServerSlice';
import { toggleExploreTab } from '../../../features/Explore/ExploreSlice';
import { selectServerMembers } from '../../../features/server/ServerSlice';
import { openDirectMessage } from '../../../features/Messages/MessagesSlice';

export const DirectMessageButton = ({username, visible, messages}) => {

    const dispatch = useDispatch();

    const [hover, toggleHover] = React.useState(false);

    const [newMessage, toggleNewMessage] = React.useState(false);

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const members = useSelector(selectServerMembers);

    const user = members.find(m => m.username === username);

    const handleHover = (bool) => {
        toggleHover(bool)
    }

    const action = () => {

        dispatch(toggleMediaPanel(false))
    
        dispatch(toggleAddServerMenu(false))

        dispatch(toggleExploreTab(false));

        dispatch(toggleProfileTab(false));

        dispatch(openDirectMessage({username: username}));

        toggleNewMessage(false);
    }

    React.useEffect(() => {

        if (!visible) {
            toggleNewMessage(true);
        }

    }, [messages])
    
    return (
        <div 
            onClick={action}
            style={{
                backgroundColor: accentColor,
                borderRadius: visible ? 10 : null,
                border: visible ? `solid 2px ${textColor}` : null,
                width: visible ? 41 : 45,
                height: visible ? 41 : 45
            }}
            onMouseEnter={() => {handleHover(true)}}
            onMouseLeave={() => {handleHover(false)}}
            className='profile-button-container'>
                {newMessage ? <div style={{position: 'absolute', width: 15, height: 15, backgroundColor: 'rgb(201, 0, 0)', borderRadius: '50%', zIndex: 5, top: 0, left: 0}}></div> : null}
                <div style={{borderRadius: visible ? 10 : null}} className='profile-button-picture-wrapper'>
                    <Image image_class={'user-image'} cursor='pointer' objectFit='cover' width='100%'  image={user?.user_image} />
                </div>
                {hover ? 
                <div style={{backgroundColor: primaryColor}} className='server-button-name-container'>
                    <h2 style={{color: textColor}}>{user?.display_name}</h2>
                </div>
                : null}
            </div>
    )
}