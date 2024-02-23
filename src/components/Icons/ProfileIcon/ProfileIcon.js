import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const ProfileIcon = ({width = 6, height = 8}) => {

    const color = useSelector(selectTextColor);

    return (
        <svg width={width} height={height} viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M3 0.666656C2.55797 0.666656 2.13405 0.842251 1.82149 1.15481C1.50893 1.46737 1.33333 1.8913 1.33333 2.33332C1.33333 2.77535 1.50893 3.19927 1.82149 3.51183C2.13405 3.8244 2.55797 3.99999 3 3.99999C3.44203 3.99999 3.86595 3.8244 4.17851 3.51183C4.49107 3.19927 4.66667 2.77535 4.66667 2.33332C4.66667 1.8913 4.49107 1.46737 4.17851 1.15481C3.86595 0.842251 3.44203 0.666656 3 0.666656ZM2.16667 4.41666C1.72464 4.41666 1.30072 4.59225 0.988155 4.90481C0.675595 5.21737 0.5 5.6413 0.5 6.08332V6.49999C0.5 6.95832 0.875 7.33332 1.33333 7.33332H4.66667C4.88768 7.33332 5.09964 7.24553 5.25592 7.08925C5.4122 6.93296 5.5 6.721 5.5 6.49999V6.08332C5.5 5.6413 5.3244 5.21737 5.01184 4.90481C4.69928 4.59225 4.27536 4.41666 3.83333 4.41666H2.16667Z" fill={color}/>
        </svg>

    )
}
