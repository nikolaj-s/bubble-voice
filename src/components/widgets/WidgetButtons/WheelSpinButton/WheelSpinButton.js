// librarys
import React from 'react'
import { useSelector } from 'react-redux'
import { motion, useAnimation } from 'framer-motion'

// state
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

// style
import "../ImageWidgetButton/ImageWidgetButton.css";

export const WheelSpinButton = ({action}) => {

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
                <svg width="55" height="55" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 16.002C2 23.733 8.27 30.003 16.002 30.003C23.733 30.003 30 23.733 30 16.002C30 8.27 23.733 2 16.002 2C8.27 2 2 8.27 2 16.002ZM15.425 27.252C13.1908 27.1409 11.041 26.3639 9.252 25.021L14.352 18.947C14.679 19.131 15.041 19.262 15.425 19.327V27.251V27.252ZM16.636 27.248V19.318C16.9115 19.2654 17.1792 19.1784 17.433 19.059L21.978 25.552C20.3699 26.5609 18.5316 27.1445 16.636 27.248V27.248ZM22.968 24.854L18.418 18.357C18.6124 18.1594 18.7811 17.9379 18.92 17.698L26.37 20.411C25.6263 22.1537 24.4564 23.6815 22.968 24.854V24.854ZM26.785 19.273L19.331 16.559C19.3764 16.2855 19.3882 16.0074 19.366 15.731L27.03 13.678C27.4186 15.5341 27.3344 17.458 26.785 19.273V19.273ZM26.718 12.509L19.056 14.564C18.9379 14.3134 18.7895 14.0783 18.614 13.864L23.715 7.786C25.097 9.08292 26.1299 10.7073 26.718 12.509V12.509ZM22.79 7.005L17.693 13.08C17.3654 12.8899 17.0081 12.7567 16.636 12.686V4.749C18.8663 4.87111 21.0092 5.65669 22.79 7.005V7.005ZM15.425 4.745V12.675C15.1452 12.7234 14.8727 12.807 14.614 12.924L10.062 6.423C11.6782 5.41748 13.5239 4.84032 15.425 4.746V4.745ZM9.07 7.116L13.617 13.613C13.4145 13.8153 13.2384 14.0424 13.093 14.289L5.637 11.575C6.38727 9.8231 7.56817 8.28927 9.07 7.116ZM5.222 12.712L12.675 15.427C12.6262 15.7109 12.6138 15.9999 12.638 16.287L4.978 18.339C4.81554 17.5696 4.73376 16.7854 4.734 15.999C4.734 14.856 4.904 13.752 5.222 12.712V12.712ZM5.291 19.506L12.954 17.456C13.078 17.716 13.235 17.958 13.419 18.176L8.325 24.246C6.9293 22.9478 5.88545 21.317 5.291 19.506ZM17.576 16.003C17.576 16.4205 17.4102 16.8208 17.115 17.116C16.8198 17.4112 16.4195 17.577 16.002 17.577C15.5846 17.577 15.1842 17.4112 14.889 17.116C14.5938 16.8208 14.428 16.4205 14.428 16.003C14.428 15.5855 14.5938 15.1852 14.889 14.89C15.1842 14.5948 15.5846 14.429 16.002 14.429C16.4195 14.429 16.8198 14.5948 17.115 14.89C17.4102 15.1852 17.576 15.5855 17.576 16.003V16.003Z" fill={textColor}/>
                </svg>
            </div>
            <h2 style={{color: textColor}}>Wheel Spin</h2>
        </motion.div>
    )
}