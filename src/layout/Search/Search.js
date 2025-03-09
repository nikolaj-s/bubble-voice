import React from 'react'
import FullScreenWrapper from '../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper'
import FloatingSearch from '../../components/Inputs/FloatingSearch/FloatingSearch'
import { SearchResults } from '../../components/SearchResults/SearchResults'
import { useSelector } from 'react-redux'

export const Search = ({close}) => {

    const {loading, results} = useSelector(state => state.searchSlice);

    return (
       <FullScreenWrapper onClose={close}>
            <FloatingSearch />
            <SearchResults results={results} loading={loading} />
       </FullScreenWrapper>
    )
}
