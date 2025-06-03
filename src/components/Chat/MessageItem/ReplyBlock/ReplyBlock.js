import React from 'react'
import { MessageItem } from '../MessageItem'
import Label from '../../../ui/Titles/Label/Label'
import { Subtitle } from '../../../ui/Titles/Subtitle/Subtitle'

export const ReplyBlock = ({reply_to, users}) => {
    
    return (
        <>
        {reply_to && (
            <div 
            style={{
                maxWidth: 450,
            }}  
            >
                <Subtitle>replied to:</Subtitle>
                <MessageItem isReply={true} message={reply_to} prevMessage={{}} users={users} />
            </div>
        )}
        </>
    )
}
