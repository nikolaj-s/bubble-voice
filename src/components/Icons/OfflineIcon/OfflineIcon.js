import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { Image } from '../../Image/Image'

export const OfflineIcon = ({image}) => {

    const color = useSelector(selectTextColor)

    return (
        <div style={{zIndex: 3, height: '100%', width: '100%'}} className='offline-icon-container'>
            {image ? <Image width='100%' height='100%' objectFit='cover' image={image} /> : null}
            <svg 
            style={{
                objectFit: 'contain',
                position: 'absolute',
                width: 20,
                height: 20,
                left: 5,
                bottom: 10,
                zIndex: 4
            }}
            width="80%" height="80%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.866 7.47021C16.2905 9.25706 15.9983 11.123 16 13.0002C16 22.9412 24.059 31.0002 34 31.0002C36.4535 31.0032 38.8815 30.5029 41.134 29.5302C38.801 36.7672 32.012 42.0002 24 42.0002C14.059 42.0002 6 33.9412 6 24.0002C6 16.5932 10.473 8.762 16.866 6V7.47021Z" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
            <path d="M31.66 10H41L31 18H41" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    )
}
