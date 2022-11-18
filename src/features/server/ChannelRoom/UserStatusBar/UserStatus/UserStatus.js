import React from 'react'
import { useSelector } from 'react-redux';
import { OfflineIcon } from '../../../../../components/Icons/OfflineIcon/OfflineIcon';
import { Image } from '../../../../../components/Image/Image';
import { selectTextColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import "./UserStatus.css";

export const UserStatus = ({user}) => {

    const textColor = useSelector(selectTextColor);

    return (
        <div className='user-status-container'>
            <div
            style={{
                border: `solid 3px ${(user.status && user.status !== 'offline') ? 'rgb(0, 255, 8)' : null}`
            }}
            className='user-status-image-container'>
                {(user.status && user.status !== 'offline') ?
                <Image image={user.user_image} />
                : 
                <OfflineIcon />
                }
            </div>
            <div className='user-name-status-wrapper'>
                <h3 style={{color: textColor}} >{user.display_name}</h3>
                <p style={{color: textColor}}>{user.status ? user.status : 'Offline'}</p>
            </div>
        </div>
    )
}
