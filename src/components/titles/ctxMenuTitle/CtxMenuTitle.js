// library's
import React from 'react'
import { useSelector } from 'react-redux';

// state
import { selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style 
import "./CtxMenuTitle.css";

export const CtxMenuTitle = ({title}) => {

    const color = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    return (
        <div
        className='ctx-menu-title'
        style={{
            backgroundColor: primaryColor
        }}
        >
            <p
            style={{
                color: color
            }}
            >{title}</p>
        </div>
    )
}
