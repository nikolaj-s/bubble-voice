import React from 'react'
import FullScreenWrapper from '../../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper'
import FloatingSearch from './FloatingSearch/FloatingSearch'
import { SearchResults } from './SearchResults/SearchResults'
import { useDispatch, useSelector } from 'react-redux'
import TextLabelError from '../../../components/Error/TextLabelError/TextLabelError'
import { setFilter, setQuery, setSimilarImageSrc } from '../../../features/Search/searchSlice'
import { globalSearch } from '../../../features/Search/Thunks/globalSearch'
import { fetchSearchHistory } from '../../../features/Search/Thunks/fetchSearchHistory'
import { deleteSearchHistoryItem } from '../../../features/Search/Thunks/deleteSearchHistoryItem'
import SpinnerLoading from '../../../components/ui/Loading/Spinner/SpinnerLoading'
import NoImageResults from '../../../components/Misc/NoImageResults/NoImageResults'
import SocialFilter from './SocialFilter/SocialFilter'

export const Search = ({close}) => {

    const dispatch = useDispatch();

    const {loading, results, filter, filters, query, error, searchHistory, searchHistoryFetched, similarImageSrc} = useSelector(state => state.searchSlice);

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

    const clearFindSimilarImage = () => {
        dispatch(setSimilarImageSrc(false));
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
       </FullScreenWrapper>
    )
}
