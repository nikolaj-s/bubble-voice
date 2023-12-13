import React from 'react'

import "./ActivityFeed.css";
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '../../../../../../components/Message/Message';
import { selectSecondaryColor, selectTextColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { FetchActivityFeed, selectActivityFeed, selectLoadingActivityFeed } from '../../ServerDashBoardSlice';
import { Loading } from '../../../../../../components/LoadingComponents/Loading/Loading';

export const ActivityFeed = () => {

    const dispatch = useDispatch();

    const activityFeed = useSelector(selectActivityFeed);

    const loadingActivityFeed = useSelector(selectLoadingActivityFeed);

    const secondaryColor = useSelector(selectSecondaryColor);
    
    const textColor = useSelector(selectTextColor);

    React.useEffect(() => {

        let timeout;

        timeout = setTimeout(() => {
            if (activityFeed.length === 0) {
                dispatch(FetchActivityFeed());
            }
        }, 500)

        return () => {
            clearTimeout(timeout);
        }

    }, [])

    return (
        <div 
        style={{backgroundColor: secondaryColor}}
        className='activity-feed-container'>
            <div className='activity-feed-inner-container'>
                <Loading loading={loadingActivityFeed} />
                {activityFeed[0]?.no_status && activityFeed.length === 1 ?
                <p className='no-status-messages' style={{color: textColor}}>No Status Messages To Display</p>
                :
                activityFeed.map((message, key) => {
                    return key === 0 && message?.no_status ? null :
                    <Message index={key} id={message._id} channel_id={'activity-feed'} direct_message={true} activity_feed={true} key={key} dashboard={true} current_message={message} previous_message={key === 0 ? {} : activityFeed[key - 1]} message={message.content} />
                })}
            </div>
        </div>
    )
}
