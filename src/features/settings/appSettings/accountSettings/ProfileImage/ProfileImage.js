// library's
import React from 'react'

// component's
import { ImageInput } from '../../../../../components/inputs/ImageInput/ImageInput'

// style's
import "./ProfileImage.css";
import { useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor } from '../../appearanceSettings/appearanceSettingsSlice';

export const ProfileImage = ({userImage, userBanner, getNewUserImage, getNewUserBanner, shape, color, newImage, newBanner, getGifFrame}) => {
    
    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);
    
    return (
        <div className='profile-image-container'>        
            <ImageInput getGifFrame={getGifFrame} centerButtons={true} position='absolute' imageCleared={newBanner} listenToClears={true} backgroundColor={primaryColor} getColor={color} showShadow={true} maxDimensions={1600} getFile={getNewUserBanner} initalImage={userBanner} borderRadius='10px' />
        </div>
    )
}
