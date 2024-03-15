// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  selectSecondaryColor, selectTextColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { motion } from 'framer-motion'

// components
import { Image } from '../../../../../../components/Image/Image'

// state
import { playSoundEffect } from '../../../../../settings/soundEffects/soundEffectsSlice';

// style
import "./SongStatusOverlay.css";
import { selectDisableMediaWidgetStatusUpdates } from '../../../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

export const SongStatusOverlay = ({data, onEnd}) => {

    const dispatch = useDispatch();

    const secondaryColor = useSelector(selectSecondaryColor);

    const textColor = useSelector(selectTextColor);

    const disableOverlay = useSelector(selectDisableMediaWidgetStatusUpdates);

    React.useEffect(() => {

        if (disableOverlay) {
            onEnd();
        } else {
            dispatch(playSoundEffect('altPop'))

            setTimeout(() => {
    
                onEnd();
    
            }, 3000)
        }

        
// eslint-disable-next-line
    }, [data])

    return (
        <motion.div
        initial={{scale: 0}} 
        animate={{scale: 1}} 
        exit={{scale: 0}}
        key={'song-status-overlay'}
        style={{
            backgroundColor: secondaryColor,
        }}
        className='song-skipped-overlay-container'>
            <div className='song-skip-notification-image'>
                <Image objectFit='cover' imgHeight='100%' image={data.user.user_image} />
            </div>
            <p style={{color: textColor}}>{data.message}</p>
        </motion.div>
    )
}
