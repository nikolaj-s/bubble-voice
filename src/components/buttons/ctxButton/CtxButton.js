// library's
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./CtxButton.css";

export const CtxButton = ({name, action, borderRadius, icon, width}) => {

    const [hover, toggleHover] = React.useState(false);

    const primaryColor = useSelector(selectPrimaryColor);
    
    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    return (
        <div 
        onMouseEnter={() => {toggleHover(true)}}
        onMouseLeave={() => {toggleHover(false)}}
        onClick={action}
        className='ctx-button-container'
        style={{
            borderRadius: 8,
            backgroundColor: hover ? accentColor : null,
            width: width
        }}>
            <p
            style={{
                color: textColor
            }}
            >{name}</p>
            {icon}
        </div>
    )
}
