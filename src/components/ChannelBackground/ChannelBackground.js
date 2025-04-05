import React from 'react';

import styles from './ChannelBackground.module.css';

import {motion} from 'framer-motion'

export const ChannelBackground = ({channel_background}) => {

    if (!channel_background) return null;

    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 0.5}}
        className={styles.background}>
            <img src={channel_background} alt='channel-background' />
        </motion.div>
    )
}
