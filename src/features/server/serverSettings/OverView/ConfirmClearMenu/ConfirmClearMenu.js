import React from 'react'
import { useSelector } from 'react-redux'
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice'

import "./ConfirmClearMenu.css";

export const ConfirmClearMenu = ({cancel = () => {}, clear = () => {}}) => {

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const accentColor = useSelector(selectAccentColor);

    return (
        <div onClick={cancel} className='confirm-clear-outer-container'>
            <div 
            style={{
                backgroundColor: primaryColor
            }}
            onClick={(e) => {e.stopPropagation()}} className='confirm-clear-inner-container'>
                <h2 style={{
                    color: textColor
                }}>Are you sure you want to clear media recommendation data?</h2>
                <div className='confirm-button-wrapper'>
                    <h3 
                    style={{
                        color: textColor
                    }}
                    onClick={cancel}>No</h3>
                    <h3
                    onClick={clear}
                    style={{
                        color: textColor,
                        backgroundColor: accentColor,
                        margin: '0px 0px 0px 10px',
                        fontSize: '1.2rem',
                        padding: 5,
                        borderRadius: 5,
                        textDecoration: 'none'
                    }}
                    >Yes</h3>
                </div>
                
            </div>
        </div>
    )
}
