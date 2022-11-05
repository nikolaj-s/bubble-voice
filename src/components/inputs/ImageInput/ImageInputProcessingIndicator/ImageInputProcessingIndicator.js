import React from 'react'
import { useSelector } from 'react-redux';
import { selectSecondaryColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { motion } from 'framer-motion';

export const ImageInputProcessingIndicator = ({value}) => {

    const color = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    return (
        <motion.div
        initial={{
            opacity: 0
        }}
        animate={{
            opacity: 1
        }}
        exit={{
            opacity: 0
        }}
        style={{
            position: 'absolute', 
            zIndex: 3,
            width: '100%', 
            height: '100%',  
            overflow: 'hidden', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(8px)',
            borderRadius: 15
        }}
        >
            <div style={{
                width: 250,
                height: 250,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: secondaryColor,
                borderRadius: '50%'
            }}>
                <p style={{
                    color: color,
                    fontSize: '2rem'
                }}>{value}%</p>
            </div>
        </motion.div>
    )
}
