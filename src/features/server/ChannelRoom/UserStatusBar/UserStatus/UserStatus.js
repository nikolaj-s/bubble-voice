import React from 'react'
import { useSelector } from 'react-redux';
import { OfflineIcon } from '../../../../../components/Icons/OfflineIcon/OfflineIcon';
import { Image } from '../../../../../components/Image/Image';
import { selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import "./UserStatus.css";

export const UserStatus = ({user}) => {

    const [preview, togglePreview] = React.useState(false);

    const [top, setTop] = React.useState(0);

    const textColor = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const handleMouseEnter = (e) => {

        const scroll_top = e.target.parentElement.scrollTop;

        const l_top = e.target.offsetTop === 0 ? 70 : e.target.offsetTop + 25;

        setTop(l_top - scroll_top);

        togglePreview(true);
    
    } 

    const handleMouseLeave = () => {
        togglePreview(false);
    }

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={`user-status-container ${user._id}-user-status-card`}>
            {preview ?
            <div 
            style={{backgroundColor: primaryColor, top: top}}
            className='preview-user-status-shrinked'>
                <h3 style={{color: textColor}} >{user.display_name}</h3>
                <p style={{color: textColor}}>{user.status ? user.status : 'offline'}</p>
            </div>
            : null}
            <div
            className='user-status-image-container'>
                {(user.status && user.status !== 'offline') ?
                <Image image={user.user_image} />
                : 
                <OfflineIcon />
                }
            </div>
            <div 
            style={{
                backgroundColor:( user.user_banner || user.status === 'offline') ? `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0.8)` : null
            }}
            className='user-name-status-wrapper'>
                <h3 style={{color: textColor}} >{user.display_name}</h3>
                <p style={{color: textColor}}>{user.status ? user.status : 'offline'}</p>
            </div>
            {(user.status && user.status !== 'offline') ?
            <Image position='absolute' zIndex={0} image={user.user_banner} />
            : null}
        </div>
    )
}
