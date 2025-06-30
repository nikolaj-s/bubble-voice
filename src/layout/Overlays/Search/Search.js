import React from 'react'
import FloatingSearch from './FloatingSearch/FloatingSearch'
import { SearchResults } from './SearchResults/SearchResults'
import { useDispatch, useSelector } from 'react-redux'
import TextLabelError from '../../../components/Error/TextLabelError/TextLabelError'
import { setFilter, setPrevSearch, setQuery, setSimilarImageSrc } from '../../../features/Search/searchSlice'
import { globalSearch } from '../../../features/Search/Thunks/globalSearch'
import { fetchSearchHistory } from '../../../features/Search/Thunks/fetchSearchHistory'
import { deleteSearchHistoryItem } from '../../../features/Search/Thunks/deleteSearchHistoryItem'
import SpinnerLoading from '../../../components/ui/Loading/Spinner/SpinnerLoading'
import SocialFilter from './SocialFilter/SocialFilter'

import styles from './Search.module.css'

export const Search = ({close}) => {

    const dispatch = useDispatch();

    const {loading, results, filter, filters, query, error, searchHistory, searchHistoryFetched, similarImageSrc, prevSearch} = useSelector(state => state.searchSlice);

    const {server_id} = useSelector(state => state.serverDetailsSlice);

    React.useEffect(() => {

        if (loading) return;

        if (searchHistoryFetched) return;

        dispatch(fetchSearchHistory());

    }, [])

    const handleSetQuery = (value) => {
        dispatch(setQuery(value));
    }

    const handleSetFilter = (value) => {
        dispatch(setFilter(value));
    }

    const handleSearch = () => {
        if (loading) return;

        dispatch(setPrevSearch(query));

        dispatch(globalSearch());
    }

    const handleDeleteSearchHistoryItem = (query) => {
        dispatch(deleteSearchHistoryItem({query}));
        
    }

    const handleSearchFromHistory = (query) => {
        handleSetQuery(query);

        handleSearch();
    } 

    const clearFindSimilarImage = () => {
        dispatch(setSimilarImageSrc(false));
    }

    React.useEffect(() => {

        let timeout

        if (loading || (prevSearch === query) || query.length < 2) return clearTimeout(timeout);

        timeout = setTimeout(() => {
            handleSearch();
        }, 800)

        return () => {
            clearTimeout(timeout)
        }

    }, [query, prevSearch, loading])

    return (
       <div key='search' className={styles.container}>
        <FloatingSearch 
        value={query}
        setValue={handleSetQuery}
        filter={filter}
        filters={filters.filter(item => server_id ? true : item.path !== 'text-channel')}
        loading={loading}
        setFilter={handleSetFilter}
        search={handleSearch}
        similarImageSrc={similarImageSrc}
        clearSimilarImage={clearFindSimilarImage}
        />
        {filter.path === 'text-channel' &&
        <SocialFilter onFilterChange={handleSearch} />
        }
        {error ? 
        <TextLabelError error={error} /> 
        : null}
        <SearchResults 
        loading={loading}
        results={results[filter.path]} 
        filter={filter.path} 
        handleSearchFromHistory={handleSearchFromHistory}
        handleDeleteSearchHistoryItem={handleDeleteSearchHistoryItem} 
        searchHistory={searchHistory}
        />
        {loading && (<SpinnerLoading />)}
        </div>
    )
}
