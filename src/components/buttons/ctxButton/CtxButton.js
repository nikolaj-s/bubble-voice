// library's
import React from 'react';
import { useSelector } from 'react-redux';
import { selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./CtxButton.css";

export const CtxButton = ({name, action, borderRadius, icon}) => {

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    return (
        <div 
        onClick={action}
        className='ctx-button-container'
        style={{
            backgroundColor: primaryColor,
            borderRadius: borderRadius
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
