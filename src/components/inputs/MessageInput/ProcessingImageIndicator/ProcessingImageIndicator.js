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
            width: 50, 
            height: 50, 
            borderRadius: 15, 
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
                fontSize: '1rem'
            }}>{percent}%</p>
        </div>
    )
}
