import React from 'react'
import { ToolBar } from '../../../ui/Wrappers/ToolBar/ToolBar'
import { MediaInfo } from '../../../MediaInfo/MediaInfo'
import IconButton from '../../../ui/Buttons/IconButton/IconButton'
import { Ellipsis, Reply } from 'lucide-react'

export const MessageToolBar = ({isReply, notification, message, styles, reply, openCtx}) => {

    return (
        <>
        {(!isReply && !notification) && 
            <ToolBar className={styles.buttons}>
                {message?.media_ref && (<MediaInfo data={message.media_ref} />)}
                <IconButton 
                Icon={<Reply color='var(--text-color)' />}
                title={'Reply'}
                position='top'
                onClick={() => {reply(message)}}
                />
                <IconButton 
                Icon={<Ellipsis color='var(--text-color)' />}
                onClick={openCtx}
                
                title={'Options'}
                position='top'
                />
            </ToolBar>}
        </>
    )
}