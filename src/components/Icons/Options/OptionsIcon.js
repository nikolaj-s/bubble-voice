import React from 'react'

export const OptionsIcon = () => {

    const textColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--text-color')
    .trim();

    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 8H13M17 8H20M11 16H20M4 16H7" stroke={textColor}strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 18C10.1046 18 11 17.1046 11 16C11 14.8954 10.1046 14 9 14C7.89543 14 7 14.8954 7 16C7 17.1046 7.89543 18 9 18Z" stroke={textColor}strokeWidth="2"/>
        <path d="M15 10C16.1046 10 17 9.10457 17 8C17 6.89543 16.1046 6 15 6C13.8954 6 13 6.89543 13 8C13 9.10457 13.8954 10 15 10Z" stroke={textColor}strokeWidth="2"/>
        </svg>
    )
}
