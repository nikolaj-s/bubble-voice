import React from 'react';

import styles from './SearchResults.module.css';
import SkeletonCard from '../Loading/SkeletonCard/SkeletonCard';
import ServerCard from '../ServerCard/ServerCard';
import { ImageGrid } from '../ImageGrid/ImageGrid';

export const SearchResults = ({results = [], loading = false, filter}) => {

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
                filter === 'servers' ?
                
                results.map(server => {
                    return <ServerCard server={server} />
                })
                :
                filter === 'images' ?
                results.length === 0 ? null :
                <ImageGrid images={results} />
                :
                <>

                </>}
            </div>
        </div>
    )
}
