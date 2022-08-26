// librarys
import React from 'react'
import { useSelector } from 'react-redux'
import { motion, useAnimation } from 'framer-motion'

// state
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

// style
import "./ImageWidgetButton.css";

export const ImageWidgetButton = ({action}) => {

    const animation = useAnimation();

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const accentColor = useSelector(selectAccentColor);

    const handleAnimation = (color) => {
        animation.start({
            border: `4px solid ${color}`
        })
    }

    return (
        <motion.div 
        onClick={action}
        animate={animation}
        onMouseOver={() => {handleAnimation(accentColor)}}
        onMouseLeave={() => {handleAnimation(primaryColor)}}
        onMouseDown={() => {handleAnimation(textColor)}}
        onMouseUp={() => {handleAnimation(accentColor)}}
        className='image-widget-button-container'
        style={{
            backgroundColor: primaryColor,
            border: `solid 4px ${primaryColor}`
        }}>
            <div>
                <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_638_54)">
                <path d="M28.1348 25.7812C28.1348 27.6461 27.394 29.4345 26.0754 30.7531C24.7567 32.0717 22.9683 32.8125 21.1035 32.8125C19.2387 32.8125 17.4503 32.0717 16.1317 30.7531C14.8131 29.4345 14.0723 27.6461 14.0723 25.7812C14.0723 23.9164 14.8131 22.128 16.1317 20.8094C17.4503 19.4908 19.2387 18.75 21.1035 18.75C22.9683 18.75 24.7567 19.4908 26.0754 20.8094C27.394 22.128 28.1348 23.9164 28.1348 25.7812Z" fill={textColor}/>
                <path d="M9.38477 4.6875C6.89836 4.6875 4.51379 5.67522 2.75564 7.43337C0.997486 9.19153 0.00976563 11.5761 0.00976562 14.0625V60.9375C0.00976563 63.4239 0.997486 65.8085 2.75564 67.5666C4.51379 69.3248 6.89836 70.3125 9.38477 70.3125H65.6348C68.1212 70.3125 70.5057 69.3248 72.2639 67.5666C74.022 65.8085 75.0098 63.4239 75.0098 60.9375V14.0625C75.0098 11.5761 74.022 9.19153 72.2639 7.43337C70.5057 5.67522 68.1212 4.6875 65.6348 4.6875H9.38477ZM65.6348 9.375C66.878 9.375 68.0703 9.86886 68.9493 10.7479C69.8284 11.627 70.3223 12.8193 70.3223 14.0625V44.5312L52.6176 35.4047C52.178 35.1845 51.6803 35.1081 51.1949 35.1863C50.7095 35.2646 50.261 35.4935 49.9129 35.8406L32.5223 53.2313L20.0535 44.925C19.6033 44.6253 19.0633 44.4905 18.5251 44.5434C17.9869 44.5964 17.4835 44.8339 17.1004 45.2156L4.69727 56.25V14.0625C4.69727 12.8193 5.19113 11.627 6.0702 10.7479C6.94928 9.86886 8.14156 9.375 9.38477 9.375H65.6348Z" fill={textColor} />
                </g>
                <defs>
                <clipPath id="clip0_638_54">
                <rect width="75" height="75" fill="none"/>
                </clipPath>
                </defs>
                </svg>
            </div>
            <h2 style={{color: textColor}}>Single Image</h2>
        </motion.div>
    )
}