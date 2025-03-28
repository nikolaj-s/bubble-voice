import React from 'react';

import styles from './ImageTooltipWrapper.module.css'
import { useSelector } from 'react-redux';

export const ImageTooltipWrapper = ({image, children}) => {

    const {currentChannel} = useSelector(state => state.channelsSlice)

    return (
        <div 
        className={styles.container}
        data-context={JSON.stringify({...image, type: 'imageSearchResult'})} >
            {children}
            <div className={styles.wrapper}>
                
            </div>
        </div>
    )
}
