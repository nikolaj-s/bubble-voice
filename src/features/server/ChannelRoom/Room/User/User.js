// library's
import React from 'react'
import { useSelector } from 'react-redux';
import { Image } from '../../../../../components/Image/Image';
import { Loading } from '../../../../../components/LoadingComponents/Loading/Loading';
import { selectAccentColor, selectActivationColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectMiscSettingsHideNonVideoParticapents } from '../../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

// style
import "./User.css";

export const User = ({user}) => {

    const accentColor = useSelector(selectAccentColor)

    const activeColor = useSelector(selectActivationColor);

    const hideNonVideoParticapents = useSelector(selectMiscSettingsHideNonVideoParticapents);

    return (
        <div 
        style={{
            border: `solid 4px ${user.active ? activeColor : accentColor}`,
            display: (hideNonVideoParticapents === true && user.webcam === false) ? 'none' : 'flex'
        }}
        id={user._id} className='active-user-container'>
            <Image opacity={user.webcam ? 0 : 1} position='absolute' image={user.user_banner} />
            <div className='active-user-profile-image-container'>
                <Image opacity={user.webcam ? 0 : 1} objectFit='cover' image={user.user_image} />
            </div>
            <Loading zIndex={-1} show_success={false} loading={user.webcam} />
        </div>
    )
}
