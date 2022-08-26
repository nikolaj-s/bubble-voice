// library's
import React from 'react'
import { useSelector } from 'react-redux';
import { Image } from '../../../../../components/Image/Image';
import { selectAccentColor, selectActivationColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./User.css";

export const User = ({user}) => {

    const accentColor = useSelector(selectAccentColor)

    const activeColor = useSelector(selectActivationColor);

    return (
        <div 
        style={{border: `solid 4px ${user.active ? activeColor : accentColor}`}}
        id={user.username} className='active-user-container'>
            <Image position='absolute' image={user.user_banner} />
            <div className='active-user-profile-image-container'>
                <Image objectFit='cover' image={user.user_image} />
            </div>
        </div>
    )
}
