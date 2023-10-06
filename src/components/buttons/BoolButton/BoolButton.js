// library's
import React from 'react'
import { useSelector } from 'react-redux';
import { selectAccentColor, selectSecondaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./BoolButton.css";

export const BoolButton = ({state, name, action}) => {

    const [hover, toggleHover] = React.useState(false);

    const textColor = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const accentColor = useSelector(selectAccentColor);

    return (
        <div 
        onClick={action}
        onMouseEnter={() => {toggleHover(true)}}
        onMouseLeave={() => {toggleHover(false)}}
        style={{
            backgroundColor: hover ? accentColor : null
        }}
        className='bool-button-container'>
            <div 
            style={{
                backgroundColor: secondaryColor,
               
            }}
            className='bool-button-state'>
                {state ?
                <div 
                style={{
                    backgroundColor: textColor,
                    borderRadius: 5
                }}
                className='bool-state-true'></div>
                : null}
            </div>
            <p
            style={{color: textColor}}
            >{name}</p>
        </div>
    )
}
