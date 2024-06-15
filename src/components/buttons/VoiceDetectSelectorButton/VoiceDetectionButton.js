import React from 'react'

import './VoiceDetectionButton.css';
import { useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { PushToTalkIcon } from '../../Icons/PushToTalkIcon/PushToTalkIcon';
import { VoiceActivationIcon } from '../../Icons/VoiceActivationIcon/VoiceActivationIcon';

export const VoiceDetectionButton = ({active, action, state = 'Push To Talk', margin}) => {
    
    const [hover, toggleHover] = React.useState(false);

    const [mouseDown, toggleMouseDown] = React.useState(false);

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const accentColor = useSelector(selectAccentColor);

    const secondaryColor = useSelector(selectSecondaryColor)

    return (
        <div
        onMouseEnter={() => {toggleHover(true)}}
        onMouseLeave={() => {toggleHover(false); toggleMouseDown(false)}}
        onMouseDown={() => {toggleMouseDown(true)}}
        onMouseUp={() => {toggleMouseDown(false)}}
        onClick={action} 
        style={{
            backgroundColor: hover ? accentColor : primaryColor, 
            margin: margin,
            transform: mouseDown ? 'scale(0.95)' : 'scale(1)'
        }}
        className='voice-activation-type-selector'>
            <div
            style={{
                backgroundColor: secondaryColor
            }}
            className='voice-state-selected'>
                {active ?
                <div
                style={{backgroundColor: textColor}}
                />
                : null}
            </div>
            <h4
            style={{
                color: textColor
            }}
            >{
                state
            }</h4>
            {state === "Push To Talk" ?
            <PushToTalkIcon />
            :
            <VoiceActivationIcon />
            }
        </div>
    )
}
