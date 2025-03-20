import React from 'react';

import styles from './NsfwWrapper.module.css';
import { TriangleAlert } from 'lucide-react';

export const NsfwWrapper = ({children, nsfw: obj}) => {

    const {nsfw} = obj;

    const [filter, toggleFilter] = React.useState(true);

    const textColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--text-color')
    .trim();

    return (
        <div className={styles.wrapper}>
            {children}
            {nsfw && filter ?
            <div onClick={() => {toggleFilter(false)}} className={styles.filter}>
                <TriangleAlert color={textColor} />
                <p>NSFW - Click To Reveal</p>
            </div>
            : null}
        </div>
    )
}
