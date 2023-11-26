
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react'

import "./VideoPlayOverlayAnimation.css";
import { useSelector } from 'react-redux';
import { selectGlassColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const VideoPlayOverlayAnimation = ({interacted, playing, color}) => {
    
    const glassColor = useSelector(selectGlassColor);

    return (
    <AnimatePresence mode='wait'>
        <div style={{pointerEvents: interacted ? 'none' : 'all', }} className='video-component-play-overlay'>
            <div 
            style={{backgroundColor: interacted ? null : glassColor}}
            className='video-controls-overlay-inner'>
                {!interacted ? 
                
                    <svg className='video-component-initial-play-button-display' width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.525 13.025C1.19167 13.2416 0.854333 13.2543 0.513 13.063C0.171666 12.8716 0.000666667 12.5756 0 12.175V1.82497C0 1.42497 0.171 1.12897 0.513 0.936968C0.855 0.744968 1.19233 0.757635 1.525 0.974968L9.675 6.14997C9.975 6.34997 10.125 6.6333 10.125 6.99997C10.125 7.36663 9.975 7.64997 9.675 7.84997L1.525 13.025Z" fill={color}/>
                    </svg>
                
                : null}

                {(interacted && playing) ? 
                    <motion.svg key={'playing-animation'} initial={{opacity: 1}} animate={{opacity: 0}} width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.525 13.025C1.19167 13.2416 0.854333 13.2543 0.513 13.063C0.171666 12.8716 0.000666667 12.5756 0 12.175V1.82497C0 1.42497 0.171 1.12897 0.513 0.936968C0.855 0.744968 1.19233 0.757635 1.525 0.974968L9.675 6.14997C9.975 6.34997 10.125 6.6333 10.125 6.99997C10.125 7.36663 9.975 7.64997 9.675 7.84997L1.525 13.025Z" fill={color}/>
                    </motion.svg>
                : (interacted && !playing) ?
                    <motion.svg key={'pausing-animation'} initial={{opacity: 1}} animate={{opacity: 0}} width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 14C3.1 14 4 13.1 4 12V2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2V12C0 13.1 0.9 14 2 14ZM8 2V12C8 13.1 8.9 14 10 14C11.1 14 12 13.1 12 12V2C12 0.9 11.1 0 10 0C8.9 0 8 0.9 8 2Z" fill={color} />
                    </motion.svg>            
                : null}
            </div>
        </div>
    </AnimatePresence>
  )
}
