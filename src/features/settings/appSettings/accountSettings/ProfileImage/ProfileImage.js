// library's
import React from 'react'

// component's
import { ImageDropInput } from '../../../../../components/inputs/ImageDropInput/ImageDropInput'

// style's
import "./ProfileImage.css";

export const ProfileImage = ({profileImage, banner}) => {
    return (
        <div className='profile-image-container'>
            <ImageDropInput initalImage={banner} />
            <ImageDropInput initalImage={profileImage} zIndex='1' center={true} width={350} height={350} borderRadius="50%" />
        </div>
    )
}
