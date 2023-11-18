// library's
import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

// component's
import { WheelSpinWidget } from '../../../../../../components/widgets/Widgets/WheelSpinWidget/WheelSpinWidget'

// state
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./WheelSpinOverlay.css";
import { TextButton } from '../../../../../../components/buttons/textButton/TextButton';

export const WheelSpinOverlay = ({data, onEnd, page}) => {

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const secondaryColor = useSelector(selectSecondaryColor)

    return (
        <motion.div 
        style={{
            display: (page === "social" || page === "widgets") ? 'none' : 'flex',
            backgroundColor: secondaryColor,
            borderTop: 'none'
        }}
        initial={{top: -750}}
        animate={{top: 5}}
        exit={{top: -750}}
        transition={{duration: 0.3}}
        className="wheel-spin-overlay-container"
        key={"wheel-spin-overlay"} >
            <WheelSpinWidget overlay={true} editing={true} finishingDeg={data?.extra_info} widget={data?.widget} onEnd={onEnd}  />
            <div
            className='wheel-spin-overlay-message-container'>
                <h1
                style={{
                    color: textColor
                }}
                >{data.message}</h1>
            </div>
            <div className='wheel-spin-overlay-message-container'>
                <TextButton name={"Close"} action={onEnd} />
            </div>
        </motion.div>
    )
}
