import React from 'react';

import styles from './ChannelBackground.module.css';

import {motion} from 'framer-motion'
import { useSelector } from 'react-redux';

export const ChannelBackground = ({channel_background}) => {

    const {hideChannelBackgrounds} = useSelector(state => state.appearanceSlice);

    if (!channel_background || hideChannelBackgrounds) return null;

    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 0.5}}
        className={styles.background}>
            <img src={channel_background} alt='channel-background' />
        </motion.div>
    )
}
