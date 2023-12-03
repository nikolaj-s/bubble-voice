import React from 'react'
import { useSelector } from 'react-redux'
import { selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const NsfwImageOverlay = ({borderRadius = '10px', height = '100%'}) => {

    const textColor = useSelector(selectTextColor);

    const glassColor = useSelector(selectPrimaryColor);

    return (
        <div 
        onClick={(e) => {e.stopPropagation(); e.currentTarget.style.display = 'none'}}
        style={{
            position: 'absolute',
            zIndex: 1,
            bottom: 0,
            left: 0,
            width: '100%',
            height: height,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: glassColor,
            objectFit: 'contain',
            borderRadius: borderRadius,
            overflow: 'hidden',
            flexDirection: 'column',
            cursor: 'pointer',
            minWidth: 100
        }}
        className='nsfw-image-overlay'>
            <h3 style={{color: textColor, pointerEvents: 'none', textAlign: 'center'}}>NSFW</h3>
            <p style={{color: textColor, pointerEvents: 'none', textAlign: 'center'}}>Click to Reveal</p>
        </div>
    )
}
