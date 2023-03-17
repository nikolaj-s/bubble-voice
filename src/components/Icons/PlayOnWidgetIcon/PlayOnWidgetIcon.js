import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const PlayOnWidgetIcon = () => {

    const color = useSelector(selectTextColor);

    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 21H3.6C3.44087 21 3.28826 20.9368 3.17574 20.8243C3.06321 20.7117 3 20.5591 3 20.4V3.6C3 3.44087 3.06321 3.28826 3.17574 3.17574C3.28826 3.06321 3.44087 3 3.6 3H20.4C20.5591 3 20.7117 3.06321 20.8243 3.17574C20.9368 3.28826 21 3.44087 21 3.6V13M16 19H19M19 19H22M19 19V16M19 19V22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.898 8.51283C9.80681 8.46065 9.70352 8.43333 9.59846 8.4336C9.4934 8.43387 9.39025 8.46172 9.29933 8.51436C9.20841 8.56701 9.13291 8.64261 9.08038 8.7336C9.02785 8.82458 9.00013 8.92777 9 9.03283V14.9658C8.99996 15.071 9.02755 15.1743 9.08001 15.2654C9.13247 15.3565 9.20795 15.4323 9.2989 15.485C9.38985 15.5378 9.49307 15.5657 9.59821 15.5661C9.70336 15.5664 9.80674 15.5391 9.898 15.4868L15.088 12.5208C15.1799 12.4684 15.2562 12.3925 15.3093 12.301C15.3624 12.2095 15.3904 12.1056 15.3904 11.9998C15.3904 11.894 15.3624 11.7901 15.3093 11.6986C15.2562 11.6071 15.1799 11.5313 15.088 11.4788L9.898 8.51283Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    )
    }
