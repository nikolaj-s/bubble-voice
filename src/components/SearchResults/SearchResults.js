import React from 'react';

import styles from './SearchResults.module.css';
import Label from '../Titles/Label/Label';
import SkeletonCard from '../Loading/SkeletonCard/SkeletonCard';

export const SearchResults = ({results = [], loading = false}) => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {loading ?
                <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                </>
                :
                <>

                </>
                }
            </div>
        </div>
    )
}
