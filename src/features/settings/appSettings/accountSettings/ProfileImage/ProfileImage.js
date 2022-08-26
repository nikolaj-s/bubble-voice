// library's
import React from 'react'

// component's
import { ImageInput } from '../../../../../components/inputs/ImageInput/ImageInput'

// style's
import "./ProfileImage.css";

export const ProfileImage = ({userImage, userBanner, getNewUserImage, getNewUserBanner}) => {
    return (
        <div className='profile-image-container'>
            <ImageInput getFile={getNewUserBanner} initalImage={userBanner} />
            <ImageInput getFile={getNewUserImage} initalImage={userImage} zIndex='1' center={true} width={"350px"} height={"350px"} borderRadius="50%" />
        </div>
    )
}
