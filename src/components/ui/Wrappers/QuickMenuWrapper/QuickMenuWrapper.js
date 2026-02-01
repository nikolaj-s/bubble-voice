
import {motion} from 'framer-motion'

import styles from './QuickMenuWrapper.module.css'
import { MenuCloseHeader } from '../../../Headers/MenuCloseHeader/MenuCloseHeader'

export const QuickMenuWrapper = ({children, close, top, left = 35, right, bottom = 70, title}) => {

    return (
        <div className={styles.wrapper}>
            
            <motion.div 
            style={{top,left,right,bottom}}
            initial={{scale: 0.5, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            exit={{scale: 0.5, opacity: 0}}
            className={styles.container}>
                <MenuCloseHeader onClose={close} title={title} />
                {children}
            </motion.div>
            <div 
            onClick={() => {close()}}
            className={styles.close} />
        </div>
    )
}
