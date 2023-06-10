// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
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

    const accentColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    React.useEffect(() => {

        dispatch(playSoundEffect('altPop'))

        setTimeout(() => {

            onEnd();

        }, 3000)

    }, [data])

    return (
        <motion.div 
        initial={{top: '-60px'}}
        animate={{top: 0}}
        exit={{top: '-60px'}}
        key={'song-status-overlay'}
        style={{
            backgroundColor: secondaryColor,
        }}
        transition={{duration: 0.3}}
        className='song-skipped-overlay-container'>
            <div className='song-skip-notification-image'>
                <Image objectFit='cover' imgHeight='100%' image={data.user.user_image} />
            </div>
            <p style={{color: textColor}}>{data.message}</p>
        </motion.div>
    )
}
