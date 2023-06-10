// library's
import React from 'react'

// component's
import { ImageInput } from '../../../../../components/inputs/ImageInput/ImageInput'

// style's
import "./ProfileImage.css";

export const ProfileImage = ({userImage, userBanner, getNewUserImage, getNewUserBanner, shape, color}) => {
    return (
        <div className='profile-image-container'>
            <ImageInput getColor={color} showShadow={true} maxDimensions={1600} getFile={getNewUserBanner} initalImage={userBanner} borderRadius='0px' />
            <ImageInput maxDimensions={300} getFile={getNewUserImage} initalImage={userImage} zIndex='1' width={"150px"} height={"150px"} borderRadius={shape === 'circle' ? '50%' : '10px'} />
        </div>
    )
}
