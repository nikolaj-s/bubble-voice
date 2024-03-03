import React from 'react'
import { useSelector } from 'react-redux'
import { selectSecondaryColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { Message } from '../../../../../../components/Message/Message';

export const RecentPin = ({message}) => {

    const secondaryColor = useSelector(selectSecondaryColor);
    console.log(message)
    return (
        <div 
        style={{backgroundColor: secondaryColor}}
        className='image-of-the-day-container'>
            {message?.content ?
            <Message dashboard={true} previous_message={{}} current_message={message} message={message?.content} activity_feed={true} channel_id={""}  />
            : null}
        </div>
    )
}
