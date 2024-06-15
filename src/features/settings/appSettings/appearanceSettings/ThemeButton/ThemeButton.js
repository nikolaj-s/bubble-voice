import React from 'react'

import "./ThemeButton.css";

export const ThemeButton = ({theme, active, action, color_data}) => {
    
    return (
        <div 
        onClick={() => {action({}, theme)}}
        style={{
            backgroundColor: color_data?.primaryColor,
            border: `solid 2px ${color_data?.accentColor}`
        }}
        className='theme-button-container'>
            <div className='side-nav-prev-display-container'>
                <div style={{
                    marginTop: 5,
                    backgroundColor: color_data?.accentColor
                }} />
                <div style={{
                    backgroundColor: color_data?.accentColor
                }} />
                <div style={{
                    backgroundColor: color_data?.accentColor
                }} />
            </div>
            <div style={{
                backgroundColor: color_data?.secondaryColor
            }} className='main-content-display-prev'>
                <div style={{
                    backgroundColor: color_data?.accentColor
                }} className='control-bar-display-prev'>

                </div>
            </div>
            <div 
            style={{
                border: `solid 2px ${color_data?.accentColor}`
            }}
            className='theme-button-selected-indicator'>
                {active ? 
                <div style={{backgroundColor: color_data?.accentColor}} />
                : null}
            </div>
        </div>
    )
}
