// library's
import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

// component's
import { WheelSpinWidget } from '../../../../../../components/widgets/Widgets/WheelSpinWidget/WheelSpinWidget'

// state
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./WheelSpinOverlay.css";

export const WheelSpinOverlay = ({data, onEnd, page}) => {

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    return (
        <motion.div 
        style={{
            display: (page === "social" || page === "widgets") ? 'none' : 'flex'
        }}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className="wheel-spin-overlay-container"
        key={"wheel-spin-overlay"} >
            <WheelSpinWidget overlay={true} editing={true} finishingDeg={data?.extra_info} widget={data?.widget} onEnd={onEnd}  />
            <div 
            style={{
                backgroundColor: primaryColor,
                border: `solid ${accentColor} 4px`
            }}
            className='wheel-spin-overlay-message-container'>
                <h1
                style={{
                    color: textColor
                }}
                >{data.message}</h1>
            </div>
        </motion.div>
    )
}
