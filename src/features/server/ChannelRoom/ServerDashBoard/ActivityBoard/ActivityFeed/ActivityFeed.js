import React from 'react'

import "./ActivityFeed.css";
import { useSelector } from 'react-redux';
import { selectActivityFeed } from '../../../../ServerSlice';
import { Message } from '../../../../../../components/Message/Message';
import { selectSecondaryColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const ActivityFeed = () => {

    const activityFeed = useSelector(selectActivityFeed);

    const secondaryColor = useSelector(selectSecondaryColor);
   
    return (
        <div 
        style={{backgroundColor: secondaryColor}}
        className='activity-feed-container'>
            <div className='activity-feed-inner-container'>
                {
                activityFeed.map((message, key) => {
                    return <Message id={message._id} channel_id={'activity-feed'} direct_message={true} activity_feed={true} key={key} dashboard={true} current_message={message} previous_message={key === 0 ? {} : activityFeed[key - 1]} message={message.content} />
                })}
            </div>
        </div>
    )
}
