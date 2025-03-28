import React from 'react';

import styles from './NsfwWrapper.module.css';
import { TriangleAlert } from 'lucide-react';
import { useSelector } from 'react-redux';

export const NsfwWrapper = ({children, nsfw: obj}) => {

    const disableNsfwBlur = useSelector(state => state.contentSettingsSlice.disableNsfwBlur);

    const {nsfw} = obj;

    const [filter, toggleFilter] = React.useState(true);

    if (disableNsfwBlur) return children;

    return (
        <div className={styles.wrapper}>
            {children}
            {nsfw && filter ?
            <div onClick={() => {toggleFilter(false)}} className={styles.filter}>
                <TriangleAlert color='var(--text-color)' />
                <p>NSFW - Click To Reveal</p>
            </div>
            : null}
        </div>
    )
}
