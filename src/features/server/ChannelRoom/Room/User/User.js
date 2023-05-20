// library's
import React from 'react'
import { useSelector } from 'react-redux';
import { Image } from '../../../../../components/Image/Image';
import { Loading } from '../../../../../components/LoadingComponents/Loading/Loading';
import { USER_PREFS } from '../../../../../util/LocalData';
import { selectAccentColor, selectActivationColor, selectSecondaryColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectMiscSettingsHideNonVideoParticapents } from '../../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

// style
import "./User.css";
import { selectUsername } from '../../../../settings/appSettings/accountSettings/accountSettingsSlice';

export const User = ({user}) => {

    const accentColor = useSelector(selectAccentColor)

    const activeColor = useSelector(selectActivationColor);

    const hideNonVideoParticapents = useSelector(selectMiscSettingsHideNonVideoParticapents);
    
    const prefs = USER_PREFS.get(user._id);

    const username = useSelector(selectUsername);

    const secondaryColor = useSelector(selectSecondaryColor);
    
    return (
        <div 
        style={{
            border: `solid 2px ${(user.active && user.microphone) ? activeColor : user.color ? user.color : accentColor}`,
            
            display: (hideNonVideoParticapents === true && user.webcam === false) || (hideNonVideoParticapents === true && prefs?.disabled_web_cam === true) ? 'none' : 'flex'
        }}
        id={user._id} className='active-user-container'>
            <Image disableErr={true} backgroundColor={secondaryColor}  position='absolute' image={user.user_banner} />
            <div style={{borderRadius: user.profile_picture_shape === 'square' ? '5px' : '50%'}} className='active-user-profile-image-container'>
                <Image objectFit='cover' image={user.user_image} />
            </div>
            <Loading backgroundColor={'black'} zIndex={1} show_success={false} loading={user.webcam && (user.username === username ? user.webcam : prefs?.disabled_web_cam === false)} />
        </div>
    )
}
