import React from 'react'
import { useSelector } from 'react-redux'
import { selectPrimaryColor, selectSecondaryColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

import "./MessagePlaceHolderLoader.css";

export const MessagePlaceHolderLoader = ({arr = [300, 100, 60]}) => {

    const secondaryColor = useSelector(selectSecondaryColor);

    const primaryColor = useSelector(selectPrimaryColor);

    return (
        <>
        {arr.map(h => {
            return (
            <div
            className='loading-message-placeholder-container'
            style={{
                height: h,
            }}
            >   
                <div 
                style={{
                    background: secondaryColor,
                }}
                
                className='profile-image-loading-place-holder'>

                </div>
                <div className='message-content-loading-wrapper'>
                    <div style={{
                    background: secondaryColor,
                }} className='sender-info-loading'></div>
                    <div 
                    className='content-place-holder-loader'
                    style={{
                        background: secondaryColor,
                        top: 0,
                        left: 0,
                    }}
                    ></div>  
                </div>
            </div>
            )
        })}
        
        </>
  )
}
