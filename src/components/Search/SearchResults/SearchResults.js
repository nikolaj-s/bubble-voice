import React from 'react';

import styles from './SearchResults.module.css';
import SkeletonCard from '../../Loading/SkeletonCard/SkeletonCard';
import ServerCard from '../../ServerCard/ServerCard';
import { ImageGrid } from './ImageGrid/ImageGrid';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchResultsScrollPos } from '../../../features/Search/searchSlice';
import { SearchHistory } from '../SearchHistory/SearchHistory';

export const SearchResults = ({results = [], loading = false, filter, searchHistory, handleDeleteSearchHistoryItem, handleSearchFromHistory}) => {

    const dispatch = useDispatch();

    const scrollPos = useSelector(state => state.searchSlice.scrollPos);

    const scrollRef = React.useRef();

    React.useEffect(() => {

        setTimeout(() => {
            
            scrollRef.current.scrollTop = scrollPos;
        
        }, 10)

    }, [])

    return (
        <div className={styles.container}>
            <div 
            onScroll={(e) => {dispatch(setSearchResultsScrollPos(e.target.scrollTop))}}
            ref={scrollRef} className={styles.wrapper}>
                 <SearchHistory 
                search={handleSearchFromHistory}
                deleteItem={handleDeleteSearchHistoryItem} 
                searchHistory={searchHistory} />
                {loading ?
                <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                </>
                :
                <>

                {filter === 'servers' ?
                
                results.map(server => {
                    return <ServerCard key={server.server_id} server={server} />
                })
                :
                filter === 'images' ?
                results.length === 0 ? null :
                <>
                
                <ImageGrid images={results} />
                </>
                :
                <>

                </>}
                
                </>}
            </div>
        </div>
    )
}
