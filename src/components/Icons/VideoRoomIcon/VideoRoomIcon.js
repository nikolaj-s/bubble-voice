import React from 'react'

export const VideoRoomIcon = ({width, height, color}) => {
    return (
        <div
        style={{width, height}}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 14H14C14.2833 14 14.521 13.904 14.713 13.712C14.9043 13.5207 15 13.2833 15 13V11L16.15 12.15C16.3 12.3 16.4793 12.3373 16.688 12.262C16.896 12.1873 17 12.0333 17 11.8V8.2C17 7.96667 16.896 7.81233 16.688 7.737C16.4793 7.66233 16.3 7.7 16.15 7.85L15 9V7C15 6.71667 14.9043 6.479 14.713 6.287C14.521 6.09567 14.2833 6 14 6H8C7.71667 6 7.479 6.09567 7.287 6.287C7.09567 6.479 7 6.71667 7 7V13C7 13.2833 7.09567 13.5207 7.287 13.712C7.479 13.904 7.71667 14 8 14ZM2 19.575V4C2 3.45 2.196 2.979 2.588 2.587C2.97933 2.19567 3.45 2 4 2H20C20.55 2 21.021 2.19567 21.413 2.587C21.8043 2.979 22 3.45 22 4V16C22 16.55 21.8043 17.021 21.413 17.413C21.021 17.8043 20.55 18 20 18H6L3.7 20.3C3.38333 20.6167 3.02067 20.6873 2.612 20.512C2.204 20.3373 2 20.025 2 19.575Z" fill={color}/>
            </svg>
        </div>
    )
}
