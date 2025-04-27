import React from 'react'
import { MessageItem } from '../MessageItem'
import Label from '../../../ui/Titles/Label/Label'

export const ReplyBlock = ({reply_to, users}) => {
    
    return (
        <>
        {reply_to && (
            <div 
            style={{
                maxWidth: 450,
            }}  
            >
                <Label label='Replied to:' />
                <MessageItem isReply={true} message={reply_to} prevMessage={{}} users={users} />
            </div>
        )}
        </>
    )
}
