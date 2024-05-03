import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

import "./NoMedia.css";

export const NoMedia = ({alt = false, message}) => {

    const textColor = useSelector(selectTextColor);

    return (
        <div className='no-media-container'>
            <svg width="200" height="200" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 27.3663C8.09625 27.3663 2.5 21.77 2.5 14.8663C2.5 7.96376 8.09625 2.36626 15 2.36626C21.9037 2.36626 27.5 7.96376 27.5 14.8663C27.5 21.77 21.9037 27.3663 15 27.3663ZM15 8.61626C14.6685 8.61626 14.3505 8.74795 14.1161 8.98237C13.8817 9.21679 13.75 9.53474 13.75 9.86626V16.1163C13.75 16.4478 13.8817 16.7657 14.1161 17.0001C14.3505 17.2346 14.6685 17.3663 15 17.3663C15.3315 17.3663 15.6495 17.2346 15.8839 17.0001C16.1183 16.7657 16.25 16.4478 16.25 16.1163V9.86626C16.25 9.53474 16.1183 9.21679 15.8839 8.98237C15.6495 8.74795 15.3315 8.61626 15 8.61626ZM15 21.1163C15.3315 21.1163 15.6495 20.9846 15.8839 20.7501C16.1183 20.5157 16.25 20.1978 16.25 19.8663C16.25 19.5347 16.1183 19.2168 15.8839 18.9824C15.6495 18.748 15.3315 18.6163 15 18.6163C14.6685 18.6163 14.3505 18.748 14.1161 18.9824C13.8817 19.2168 13.75 19.5347 13.75 19.8663C13.75 20.1978 13.8817 20.5157 14.1161 20.7501C14.3505 20.9846 14.6685 21.1163 15 21.1163Z" fill={textColor}/>
            </svg>
            <h2 style={{color: textColor, fontSize: '2rem'}} >
            {message}
            </h2>
        </div>
    )
}
