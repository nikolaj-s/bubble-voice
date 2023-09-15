import React from 'react'
import { useSelector } from 'react-redux'
import { selectHideProfileImagesOnMessages } from '../../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice'
import { Image } from '../../Image/Image';

export const ProfileImage = ({previous_message, current_message, user_image, primaryColor, color, profile_picture_shape, action}) => {
    
    const hideProfileImagesOnMessages = useSelector(selectHideProfileImagesOnMessages);

    return (
        <>
        <div style={{width: hideProfileImagesOnMessages ? 0 : 46, flexShrink: 0, borderLeft: `solid 3px ${color || primaryColor}`, marginRight: 5}}>
        {hideProfileImagesOnMessages ? null :
        (previous_message?.username !== current_message?.username)
                ||
        (previous_message?.content?.date?.split("T")[0] !== current_message?.content?.date?.split("T")[0])  ?
            <div style={{borderRadius: profile_picture_shape === 'square' ? '5px' : '50%',
            marginLeft: 5
            }} onClick={action} className='message-profile-picture'>
                <Image image_class={'user-image'} cursor='pointer' image={user_image || current_message.user_image} />
            </div>
        : null}
        </div>
        </>
    )
}
