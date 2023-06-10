// library's
import React from 'react';
import { useSelector } from 'react-redux';
import { selectServerChannels } from '../../../features/server/ServerSlice';
import { selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { CtxButton } from '../ctxButton/CtxButton';

// style
import "./MoveUser.css";

export const MoveUser = ({move = () => {}, top, left}) => {

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
            borderRadius: 0
        }}
        className='move-user-button'>
            <CtxButton borderRadius={0} name={"Move"} />
        </div>
        {expanded ? 
            <div 
            style={{
                position: 'absolute',
                top: '50%',
                left: '100%',
                backgroundColor: primaryColor
            }}
            onMouseOver={() => {handleExpanded(true)}} onMouseLeave={() => {handleExpanded(false)}} className='move-to-channel-container'>
                {channelList.filter(c => c.text_only !== true).map((channel) => {
                    return <p
                    key={channel._id}
                    onClick={() => {move(channel._id)}}
                    style={{color: textColor, backgroundColor: primaryColor}}
                    >{channel.channel_name}</p>
                })}
            </div>
            : null}
        </>
    )
}
