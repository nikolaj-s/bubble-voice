// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectAccentColor, selectSecondaryColor, selectTextColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { motion } from 'framer-motion'

// components
import { Image } from '../../../../../../components/Image/Image'

// state
import { playSoundEffect } from '../../../../../settings/soundEffects/soundEffectsSlice';

// style
import "./SongStatusOverlay.css";

export const SongStatusOverlay = ({data, onEnd}) => {

    const dispatch = useDispatch();

    const secondaryColor = useSelector(selectSecondaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    React.useEffect(() => {

        dispatch(playSoundEffect('altPop'))

        setTimeout(() => {

            onEnd();

        }, 4000)

    }, [data])

    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        key={'song-status-overlay'}
        style={{
            backgroundColor: secondaryColor,
            border: `solid 4px ${accentColor}`
        }}
        className='song-skipped-overlay-container'>
            <div className='song-skip-notification-image'>
                <Image objectFit='cover' imgHeight='100%' image={data.user.user_image} />
            </div>
            <p style={{color: textColor}}>{data.message}</p>
        </motion.div>
    )
}
