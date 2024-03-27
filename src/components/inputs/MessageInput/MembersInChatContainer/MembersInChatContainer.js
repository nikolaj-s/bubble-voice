import React from 'react'
import { useSelector } from 'react-redux'
import { selectServerMembers } from '../../../../features/server/ServerSlice'
import { UserTypingIndicator } from '../../../UserTypingIndicator/UserTypingIndicator'

import "./MembersInChatContainer.css";
import { selectUsername } from '../../../../features/settings/appSettings/accountSettings/accountSettingsSlice';

export const MembersInChatContainer = ({channelId}) => {
    
    const users = useSelector(selectServerMembers);
    
    const username = useSelector(selectUsername);

    return (

        <div className='members-in-chat-container'>
            {
                users.filter(u => u.channel_status === channelId && u.username !== username && u.status?.toLowerCase() !== 'offline').map((u, key) => {
                    return (
                        <div 

                        
                        className='user-in-chat-indicator'>
                            <div 
                            style={{
                                borderRadius: u.profile_picture_shape === 'square' ? '4px' : '50%'
                            }}
                            className='user-in-chat-picture-wrapper'>
                                <img src={u.user_image} />
                            </div>
                           
                            <UserTypingIndicator />
                        </div>
                    )
                })
            }
        </div>
    )
}
