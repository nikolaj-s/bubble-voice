import React from 'react'

import "./ActivityFeed.css";
import { useSelector } from 'react-redux';
import { selectActivityFeed } from '../../../../ServerSlice';
import { Message } from '../../../../../../components/Message/Message';

export const ActivityFeed = () => {

    const activityFeed = useSelector(selectActivityFeed);

    return (
        <div className='activity-feed-container'>
            {activityFeed.map((message, key) => {
                return <Message direct_message={true} activity_feed={true} key={key} dashboard={true} current_message={message} previous_message={key === 0 ? {} : activityFeed[key - 1]} message={message.content} />
            })}
        </div>
    )
}
