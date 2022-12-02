import React from 'react'

export const WidgetsIcon = ({width, height, color}) => {
    return (
        <div style={{width: width, height: height}}>
           <svg width="27" height="27" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.6667 23.3335V33.3335C21.6667 34.2502 22.4167 35.0002 23.3333 35.0002H33.3333C34.25 35.0002 35 34.2502 35 33.3335V23.3335C35 22.4169 34.25 21.6669 33.3333 21.6669H23.3333C22.4167 21.6669 21.6667 22.4169 21.6667 23.3335ZM6.66667 35.0002H16.6667C17.5833 35.0002 18.3333 34.2502 18.3333 33.3335V23.3335C18.3333 22.4169 17.5833 21.6669 16.6667 21.6669H6.66667C5.75 21.6669 5 22.4169 5 23.3335V33.3335C5 34.2502 5.75 35.0002 6.66667 35.0002ZM5 6.66686V16.6669C5 17.5835 5.75 18.3335 6.66667 18.3335H16.6667C17.5833 18.3335 18.3333 17.5835 18.3333 16.6669V6.66686C18.3333 5.7502 17.5833 5.0002 16.6667 5.0002H6.66667C5.75 5.0002 5 5.7502 5 6.66686ZM26.5833 4.0002L19.5 11.0669C19.3455 11.2211 19.2229 11.4042 19.1393 11.6058C19.0556 11.8074 19.0126 12.0236 19.0126 12.2419C19.0126 12.4601 19.0556 12.6763 19.1393 12.8779C19.2229 13.0795 19.3455 13.2627 19.5 13.4169L26.5833 20.5002C27.2333 21.1502 28.2833 21.1502 28.9333 20.5002L36.0167 13.4169C36.1712 13.2627 36.2938 13.0795 36.3774 12.8779C36.461 12.6763 36.5041 12.4601 36.5041 12.2419C36.5041 12.0236 36.461 11.8074 36.3774 11.6058C36.2938 11.4042 36.1712 11.2211 36.0167 11.0669L28.95 4.0002C28.3 3.3502 27.2333 3.3502 26.5833 4.0002Z" stroke={color} strokeWidth="2"/>
            </svg>
        </div>
    )
}
