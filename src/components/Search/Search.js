import React from 'react'
import FullScreenWrapper from '../ui/Wrappers/FullScreenWrapper/FullScreenWrapper'
import FloatingSearch from './FloatingSearch/FloatingSearch'
import { SearchResults } from './SearchResults/SearchResults'
import { useDispatch, useSelector } from 'react-redux'
import TextLabelError from '../Error/TextLabelError/TextLabelError'
import { setFilter, setQuery } from '../../features/Search/searchSlice'
import { globalSearch } from '../../features/Search/Thunks/globalSearch'
import { SearchHistory } from './SearchHistory/SearchHistory'
import { fetchSearchHistory } from '../../features/Search/Thunks/fetchSearchHistory'
import { deleteSearchHistoryItem } from '../../features/Search/Thunks/deleteSearchHistoryItem'

export const Search = ({close}) => {

    const dispatch = useDispatch();

    const {loading, results, filter, filters, query, error, searchHistory, searchHistoryFetched} = useSelector(state => state.searchSlice);

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

        dispatch(globalSearch());
    }

    const handleDeleteSearchHistoryItem = (query) => {
        dispatch(deleteSearchHistoryItem({query}));
        
    }

    const handleSearchFromHistory = (query) => {
        handleSetQuery(query);

        handleSearch();
    } 

    return (
       <FullScreenWrapper maxContentWidth={800} onClose={close}>
                <FloatingSearch 
                value={query}
                setValue={handleSetQuery}
                filter={filter}
                filters={filters}
                loading={loading}
                setFilter={handleSetFilter}
                search={handleSearch}
                />
                {error ? <TextLabelError error={error} /> : null}
               
                <SearchResults 
                results={results[filter]} 
                loading={loading} 
                filter={filter} 
                handleSearchFromHistory={handleSearchFromHistory}
                handleDeleteSearchHistoryItem={handleDeleteSearchHistoryItem} 
                searchHistory={searchHistory}
                />
       </FullScreenWrapper>
    )
}
