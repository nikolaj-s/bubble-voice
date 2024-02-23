import React from 'react'
import { useSelector } from 'react-redux'
import { selectHideProfileImagesOnMessages } from '../../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice'
import { Image } from '../../Image/Image';
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const ProfileImage = ({pinned_to_profile_state, hover, timeStamp, prevDate, date, activity, previous_message, current_message, user_image, primaryColor, color, profile_picture_shape, action}) => {
    
    const hideProfileImagesOnMessages = useSelector(selectHideProfileImagesOnMessages);

    const textColor = useSelector(selectTextColor);

    return (
        <>
        <div style={{width: pinned_to_profile_state || hideProfileImagesOnMessages ? 0 : 46, flexShrink: 0, borderLeft: `solid 3px ${color || primaryColor}`, marginRight: 5}}>
        {hideProfileImagesOnMessages || pinned_to_profile_state ? null :
        (previous_message?.username !== current_message?.username)
                ||
        (date.getDate() !== prevDate.getDate())  ?
            <div style={{borderRadius: profile_picture_shape === 'square' ? '5px' : '50%',
            marginLeft: 5,
            marginTop: 5,
            marginBottom: 5,
            backgroundColor: (color || primaryColor)
            }} onClick={action} className='message-profile-picture'>
                <Image image_class={'user-image'} cursor='pointer' image={user_image || current_message.user_image} />
            </div>
        : <p id={`alt-time-stamp-${current_message?._id}`} style={{opacity: hover ? 0.6 : 0, color: textColor, fontSize: 9, margin: '5px 0px 0px 0px',textAlign: 'center'}}>{timeStamp}</p>}
        </div>
        </>
    )
}
