// library's
import React from 'react';
import { useSelector } from 'react-redux';
import { selectServerChannels } from '../../../features/server/ServerSlice';
import { selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { CtxButton } from '../ctxButton/CtxButton';

// style
import "./MoveUser.css";

export const MoveUser = ({move = () => {}}) => {

    const [expanded, toggleExpanded] = React.useState(false);

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const channelList = useSelector(selectServerChannels);

    const handleExpanded = (active) => {
        if (active) {
            toggleExpanded(true)
        } else {
            toggleExpanded(false)
        }
    }

    return (
        <>
        <div 
        onMouseEnter={() => {handleExpanded(true)}}
        onMouseLeave={() => {handleExpanded(false)}}
        style={{
            backgroundColor: primaryColor
        }}
        className='move-user-button'>
            <CtxButton name={"Move"} />
        </div>
        {expanded ? 
            <div onMouseOver={() => {handleExpanded(true)}} onMouseLeave={() => {handleExpanded(false)}} className='move-to-channel-container'>
                {channelList.map((channel) => {
                    return <p
                    onClick={() => {move(channel._id)}}
                    style={{color: textColor, backgroundColor: primaryColor}}
                    >{channel.channel_name}</p>
                })}
            </div>
            : null}
        </>
    )
}
