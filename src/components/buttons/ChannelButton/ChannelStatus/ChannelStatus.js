import React from 'react'

import "./ChannelStatus.css";
import { useDispatch, useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectAppFocusedState } from '../../../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { toggleOverlay } from '../../../../features/server/ChannelRoom/Room/Music/MusicSlice';

export const ChannelStatus = ({status, active}) => {

    const dispatch = useDispatch();

    const [hover, toggleHover] = React.useState(false);

    const [mouseDown, toggleMouseDown] = React.useState(false);

    const textColor = useSelector(selectTextColor);

    const focused = useSelector(selectAppFocusedState);

    const primaryColor = useSelector(selectPrimaryColor);


    const handleOpenMedia = () => {
        if (active) {
            dispatch(toggleOverlay())
        }
    }

    return (
        <div 
        onMouseEnter={() => {toggleHover(true)}}
        onMouseLeave={() => {toggleHover(false); toggleMouseDown(false)}}
        onMouseDown={() => {toggleMouseDown(true)}}
        onMouseUp={() => {toggleMouseDown(false)}}
        style={{
            backgroundColor: hover ? primaryColor : null,
            transform: mouseDown ? 'scale(0.95)' : 'scale(1)'
        }}
        onClick={handleOpenMedia}
        className={`channel-status-wrapper`}>
            <div 
            
            style={{
                width: 24,
                height: 28,
                marginLeft: 2,
                marginRight: 9,
                flexShrink: 0,
                opacity: active ? 1 : 0.6
            }}
            className={`music-overlay-button-wrapper ${focused && active ? 'music-playing-class' : null}`}>
                <span className='ind-1' style={{backgroundColor: textColor}} />
                <span className='ind-2' style={{backgroundColor: textColor}} />
                <span className='ind-3' style={{backgroundColor: textColor}} />
                <span className='ind-4' style={{backgroundColor: textColor}} />
                
            </div>
            <p
            style={{color: textColor, opacity: 0.7}}
            >{status}</p>
        </div>
    )
}
