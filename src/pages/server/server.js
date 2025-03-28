import React from 'react'

import { ServerDetailsProvider} from '../../providers/ServerDetailsProvider/ServerDetailsProvider'

import { Banner } from '../../components/Banner/Banner';

import styles from './server.module.css';

import { useSelector } from 'react-redux';

import { selectServerBanner } from '../../features/ServerDetails/serverDetailsSlice';

import { motion} from 'framer-motion';

import { UserBar } from './users/UserBar';

import { Channels } from './channels/Channels';

import { Outlet } from 'react-router';

import { ControlBar } from '../../components/ControlBar/ControlBar';

export const Server = () => {

    const banner = useSelector(selectServerBanner);
    
    const {currentChannel} = useSelector(state => state.channelsSlice);
    
    return (
        <ServerDetailsProvider>
            <motion.section 
            key="channels"
            initial={{opacity: 0}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            className={styles.sectionOne}
            style={{
                gridTemplateRows: currentChannel?.channel_type === 'voice' ? '80px minmax(0px, 1fr) 110px' : '80px minmax(0px, 1fr) 65px'
            }}
            >
                <Banner image={banner} />
                <Channels />
                <ControlBar inChannel={currentChannel?.channel_type === 'voice'} />
            </motion.section>
            <motion.section 
            key="server-dash"
            initial={{opacity: 0}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            className={styles.sectionTwo}>
               <Outlet  />
            </motion.section>
            <motion.section 
            key="users"
            initial={{opacity: 0}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            className={styles.sectionThree}>
                <UserBar />
            </motion.section>
        </ServerDetailsProvider>
    )
}
