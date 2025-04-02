import React from 'react';

import styles from './SearchResults.module.css';

import { ImageGrid } from './ImageGrid/ImageGrid';

import { useDispatch, useSelector } from 'react-redux';

import { setSearchResultsScrollPos } from '../../../../features/Search/searchSlice';

import { SearchHistory } from '../SearchHistory/SearchHistory';

import { ServerResults } from './ServerResults/ServerResults';

export const SearchResults = ({results = [], loading = false, filter, searchHistory, handleDeleteSearchHistoryItem, handleSearchFromHistory}) => {

    const dispatch = useDispatch();

    const scrollPos = useSelector(state => state.searchSlice.scrollPos);

    const scrollRef = React.useRef();

    React.useEffect(() => {

        requestAnimationFrame(() => {
            scrollRef.current.scrollTop = loading ? 0 : scrollPos;
        })

    }, [loading]);

    return (
        <div className={styles.container}>
            <div 
            onScroll={(e) => {dispatch(setSearchResultsScrollPos(e.target.scrollTop))}}
            ref={scrollRef} className={styles.wrapper}>
                

                {filter === 'servers' ?
                <ServerResults servers={results} />
                :
                filter === 'images' ?
                <>
                <SearchHistory 
                search={handleSearchFromHistory}
                deleteItem={handleDeleteSearchHistoryItem} 
                searchHistory={searchHistory} />
                <ImageGrid images={results} />
                </>
                :
                <>

                </>}
            </div>
        </div>
    )
}
