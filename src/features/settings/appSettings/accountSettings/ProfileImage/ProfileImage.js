// library's
import React from 'react'

// component's
import { ImageInput } from '../../../../../components/inputs/ImageInput/ImageInput'

// style's
import "./ProfileImage.css";
import { useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor } from '../../appearanceSettings/appearanceSettingsSlice';

export const ProfileImage = ({userImage, userBanner, getNewUserImage, getNewUserBanner, shape, color}) => {
    
    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);
    
    return (
        <div className='profile-image-container'>
            <ImageInput backgroundColor={primaryColor} getColor={color} showShadow={true} maxDimensions={1600} getFile={getNewUserBanner} initalImage={userBanner} borderRadius='0px' />
            <ImageInput centerButtons={true} backgroundColor={accentColor} maxDimensions={250} getFile={getNewUserImage} initalImage={userImage} zIndex='1' width={"150px"} height={"150px"} borderRadius={shape === 'circle' ? '50%' : '10px'} />
        </div>
    )
}
