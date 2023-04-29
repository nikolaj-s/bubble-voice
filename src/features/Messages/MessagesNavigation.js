import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { selectCurrentDirectMessage, selectDirectMessages } from './MessagesSlice';
import { DirectMessageButton } from '../../components/buttons/DirectMessageButton/DirectMessageButton';

export const MessagesNavigation = () => {

    const textColor = useSelector(selectTextColor);

    const directMessages = useSelector(selectDirectMessages);

    const selectedDirectMessage = useSelector(selectCurrentDirectMessage);

    return (
        <>
        {directMessages.length > 0 ?
        <>
        <div style={{backgroundColor: textColor}} className="application-navigation-spacer"></div>
        
        {directMessages.map(m => {
            return <DirectMessageButton username={m.username} visible={m.username === selectedDirectMessage} messages={m.messages} />
        })}
        </>
        : null}
        </>
    )
}
