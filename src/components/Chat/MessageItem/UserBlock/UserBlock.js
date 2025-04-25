import React from 'react'
import { TimeDisplay } from '../../../TimeDisplay/TimeDisplay'
import { useDispatch } from 'react-redux'
import { setUserProfile } from '../../../../features/UserProfile/userProfileSlice';
import { setOverlay } from '../../../../features/Overlay/overlaySlice';

export const UserBlock = ({message, users, prevMessage, isDifferentDay, styles}) => {

    const dispatch = useDispatch();

    const showUserProfile = () => {
        dispatch(setUserProfile(message.user_id));

        dispatch(setOverlay('userProfile'));
    }
  
    return (
        <>
        {(message.user_id !== prevMessage.user_id || isDifferentDay) && 
        <div className={styles.userName}>
            <h3 onClick={showUserProfile}>{users[message.user_id]?.display_name}</h3>
            <TimeDisplay time={message.formattedTime} margin={0} />
        </div>}
        </>
  )
}
