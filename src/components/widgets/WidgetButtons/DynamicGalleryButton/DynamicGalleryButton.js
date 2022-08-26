// librarys
import React from 'react'
import { useSelector } from 'react-redux'
import { motion, useAnimation } from 'framer-motion'

// state
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

// style
import "../ImageWidgetButton/ImageWidgetButton.css";

export const DynamicGalleryWidgetButton = ({action}) => {

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
            <path d="M62.792 6.24984C62.792 5.6973 62.5725 5.1674 62.1818 4.7767C61.7911 4.386 61.2612 4.1665 60.7087 4.1665H14.8753C14.3228 4.1665 13.7929 4.386 13.4022 4.7767C13.0115 5.1674 12.792 5.6973 12.792 6.24984V8.33317H62.792V6.24984Z" fill={textColor} />
            <path d="M66.9163 14.5833C66.9163 14.0308 66.6968 13.5009 66.3061 13.1102C65.9154 12.7195 65.3855 12.5 64.833 12.5H10.6663C10.1138 12.5 9.5839 12.7195 9.1932 13.1102C8.8025 13.5009 8.58301 14.0308 8.58301 14.5833V16.6667H66.9163V14.5833Z" fill={textColor} />
            <path d="M66.917 20.8335H8.08366C7.04489 20.8335 6.04867 21.2461 5.31416 21.9807C4.57964 22.7152 4.16699 23.7114 4.16699 24.7502V62.7502C4.16699 63.7889 4.57964 64.7851 5.31416 65.5197C6.04867 66.2542 7.04489 66.6668 8.08366 66.6668H66.917C67.9558 66.6668 68.952 66.2542 69.6865 65.5197C70.421 64.7851 70.8337 63.7889 70.8337 62.7502V24.7502C70.8337 23.7114 70.421 22.7152 69.6865 21.9807C68.952 21.2461 67.9558 20.8335 66.917 20.8335ZM17.8337 28.021C19.0698 28.021 20.2782 28.3876 21.306 29.0743C22.3338 29.7611 23.1349 30.7372 23.6079 31.8792C24.081 33.0213 24.2047 34.2779 23.9636 35.4903C23.7224 36.7027 23.1272 37.8163 22.2531 38.6904C21.379 39.5645 20.2654 40.1597 19.053 40.4009C17.8406 40.6421 16.5839 40.5183 15.4419 40.0452C14.2998 39.5722 13.3237 38.7711 12.637 37.7433C11.9502 36.7155 11.5837 35.5071 11.5837 34.271C11.5837 32.6134 12.2421 31.0237 13.4142 29.8516C14.5863 28.6795 16.1761 28.021 17.8337 28.021ZM62.5003 58.3335H12.5003L28.042 42.771C28.319 42.4962 28.6934 42.342 29.0837 42.342C29.4739 42.342 29.8483 42.4962 30.1253 42.771L37.792 50.4377L48.3545 39.5835C48.6315 39.3087 49.0059 39.1545 49.3962 39.1545C49.7864 39.1545 50.1608 39.3087 50.4378 39.5835L62.5003 51.646V58.3335Z" fill={textColor} />
            </svg>
            </div>
            <h2 style={{color: textColor}}>Dynamic Gallery</h2>
        </motion.div>
    )
}