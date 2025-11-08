import React from 'react';

import styles from './NsfwWrapper.module.css';
import { TriangleAlert } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Subtitle } from '../../Titles/Subtitle/Subtitle';

export const NsfwWrapper = ({children, nsfw: obj = {}}) => {

    const disableNsfwBlur = useSelector(state => state.contentSettingsSlice.disableNsfwBlur);

    const {nsfw} = obj || {};

    const [filter, toggleFilter] = React.useState(true);

    if (disableNsfwBlur) return children;

    return (
        <div className={styles.wrapper}>
            {children}
            {nsfw && filter ?
            <div onClick={(e) => {e.stopPropagation(); toggleFilter(false)}} className={styles.filter}>
                <TriangleAlert size={30} color='var(--error-color)' />
                <h4>18+</h4>
                <Subtitle>Click to reveal</Subtitle>
            </div>
            : null}
        </div>
    )
}
