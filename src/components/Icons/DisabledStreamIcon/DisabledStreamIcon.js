import React from 'react'

export const DisabledStreamIcon = ({color}) => {
    return (
        <div className='extra-media-icon'>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 3H4C3.46957 3 2.96086 3.21071 2.58579 3.58579C2.21071 3.96086 2 4.46957 2 5V15C2 15.5304 2.21071 16.0391 2.58579 16.4142C2.96086 16.7893 3.46957 17 4 17H20C20.5304 17 21.0391 16.7893 21.4142 16.4142C21.7893 16.0391 22 15.5304 22 15V12M8 21H16M12 17V21M22 3L17 8M17 3L22 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    )
}
