// library's
import React from 'react'
import { useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./BoolButton.css";

export const BoolButton = ({state, name, action}) => {

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const accentColor = useSelector(selectAccentColor);

    return (
        <div 
        onClick={action}
        style={{
            backgroundColor: primaryColor
        }}
        className='bool-button-container'>
            <div 
            style={{
                backgroundColor: secondaryColor
            }}
            className='bool-button-state'>
                {state ?
                <div 
                style={{
                    backgroundColor: accentColor,
                    borderRadius: 10
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
