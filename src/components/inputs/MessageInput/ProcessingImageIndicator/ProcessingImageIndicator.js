import React from 'react'
import { useSelector } from 'react-redux'
import { selectSecondaryColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const ProcessingImageIndicator = ({percent}) => {

    const color = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    return (
        <div
        style={{
            position: 'relative', 
            width: 30, 
            height: 30, 
            borderRadius: 5, 
            overflow: 'hidden', 
            margin: '0 10px', 
            backgroundColor: secondaryColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}
        >
            <p style={{
                color: color,
                fontSize: '.8rem'
            }}>{percent}%</p>
        </div>
    )
}
