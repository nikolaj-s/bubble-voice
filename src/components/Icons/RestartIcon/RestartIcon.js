import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const RestartIcon = () => {

    const textColor = useSelector(selectTextColor);

    return (
        <svg width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25.0003 6.25C29.4234 6.25007 33.704 7.81376 37.0856 10.6647C40.4672 13.5156 42.7322 17.4702 43.48 21.8296C44.2279 26.1889 43.4106 30.6723 41.1726 34.4873C38.9346 38.3024 35.42 41.2034 31.2499 42.6777C27.0798 44.152 22.5228 44.1047 18.3842 42.544C14.2457 40.9834 10.7921 38.01 8.6338 34.1493C6.47554 30.2885 5.75158 25.7891 6.58989 21.4463C7.42819 17.1034 9.77479 13.1967 13.2149 10.4167" stroke={textColor} strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.25 9.375H14.5833V17.7083" stroke={textColor} strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}
