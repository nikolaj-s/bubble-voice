import React from 'react';

import styles from './CurrentlyPlaying.module.css'
import { ImageComponent } from '../../ui/Image/Image';
import { Music2 } from 'lucide-react';
import { Subtitle } from '../../ui/Titles/Subtitle/Subtitle';
import { MicroUserDisplay } from '../../ui/MicroUserDisplay/MicroUserDisplay';

export const CurrentlyPlaying = ({currentlyPlaying = {}, color}) => {
  
    return (
        <div className={styles.container} style={{backgroundColor: color}}>
            <div className={styles.thumbnail}>
                {currentlyPlaying?.thumbnail ?
                <ImageComponent src={currentlyPlaying?.thumbnail} />
                :
                <Music2 size={48} />
                }
            </div>
            <h2 className={styles.title}>{currentlyPlaying?.title}</h2>
            {currentlyPlaying?.added_by && (
            <div className={styles.addedBy}>
                <Subtitle>added by:</Subtitle>
                <MicroUserDisplay user_id={currentlyPlaying?.added_by} />
            </div>)}
        </div>
    )
}
