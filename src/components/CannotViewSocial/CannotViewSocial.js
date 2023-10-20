import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

import "./CannotViewSocial.css";

export const CannotViewSocial = () => {

    const color = useSelector(selectTextColor);

    return (
        <div className='cannot-view-social-container'>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.7503 45.8333C17.5003 45.8333 16.667 45 16.667 43.75V37.5H8.33366C6.04199 37.5 4.16699 35.625 4.16699 33.3333V8.33329C4.16699 6.04163 6.04199 4.16663 8.33366 4.16663H41.667C43.9587 4.16663 45.8337 6.04163 45.8337 8.33329V33.3333C45.8337 35.625 43.9587 37.5 41.667 37.5H28.9587L21.2503 45.2083C20.8337 45.625 20.417 45.8333 19.792 45.8333H18.7503ZM27.0837 22.9166V10.4166H22.917V22.9166M27.0837 31.25V27.0833H22.917V31.25H27.0837Z" fill={color}/>
            </svg>
            <h3 style={{
                color: color
            }}>You Do Not Have The Required Permissions To View This Channel's Feed</h3>
        </div>
    )
}
