import React from 'react'
import { useSelector } from 'react-redux'
import { selectHideProfileImagesOnMessages } from '../../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice'
import { Image } from '../../Image/Image';
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const ProfileImage = ({timeStamp, prevDate, date, activity, previous_message, current_message, user_image, primaryColor, color, profile_picture_shape, action}) => {
    
    const hideProfileImagesOnMessages = useSelector(selectHideProfileImagesOnMessages);

    const textColor = useSelector(selectTextColor);

    return (
        <>
        <div style={{width: hideProfileImagesOnMessages ? 0 : 46, flexShrink: 0, borderLeft: `solid 3px ${color || primaryColor}`, marginRight: 5}}>
        {hideProfileImagesOnMessages ? null :
        (previous_message?.username !== current_message?.username)
                ||
        (date.getDate() !== prevDate.getDate())  ?
            <div style={{borderRadius: profile_picture_shape === 'square' ? '5px' : '50%',
            marginLeft: 5,
            marginTop: 6,
            backgroundColor: (color || primaryColor)
            }} onClick={action} className='message-profile-picture'>
                <Image image_class={'user-image'} cursor='pointer' image={user_image || current_message.user_image} />
            </div>
        : <p id={`alt-time-stamp-${current_message?._id}`} style={{opacity: 0, color: textColor, fontSize: 9, margin: '5px 0px 0px 0px',textAlign: 'center'}}>{timeStamp}</p>}
        </div>
        </>
    )
}
