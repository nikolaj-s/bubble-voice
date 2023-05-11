import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Image } from '../../Image/Image';
import { selectUserImage } from '../../../features/settings/appSettings/accountSettings/accountSettingsSlice';

import "./ProfileButton.css";
import { selectProfileTabOpen, toggleProfileTab } from '../../../features/Profile/ProfileSlice';
import { toggleMediaPanel } from '../../../features/SavedMedia/SavedMediaSlice';
import { toggleAddServerMenu } from '../../../features/createServer/createServerSlice';
import { toggleExploreTab } from '../../../features/Explore/ExploreSlice';
import { closeDirectMessage } from '../../../features/Messages/MessagesSlice';

export const ProfileButton = () => {

    const dispatch = useDispatch();

    const visible = useSelector(selectProfileTabOpen);

    const [hover, toggleHover] = React.useState(false);

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const profilePicture = useSelector(selectUserImage);

    const handleHover = (bool) => {
        toggleHover(bool)
    }

    const action = () => {

        dispatch(toggleMediaPanel(false))
    
        dispatch(toggleAddServerMenu(false))

        dispatch(toggleExploreTab(false));

        dispatch(closeDirectMessage())

        dispatch(toggleProfileTab(!visible))
    }

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
                <div style={{borderRadius: visible ? 10 : null}} className='profile-button-picture-wrapper'>
                    <Image cursor='pointer' objectFit='cover' width='100%'  image={profilePicture} />
                </div>
                {hover ? 
                <div style={{backgroundColor: primaryColor}} className='server-button-name-container'>
                    <h2 style={{color: textColor}}>My Profile</h2>
                </div>
                : null}
            </div>
    )
}