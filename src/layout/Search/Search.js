import React from 'react'
import FullScreenWrapper from '../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper'
import FloatingSearch from '../../components/Inputs/FloatingSearch/FloatingSearch'
import { SearchResults } from '../../components/SearchResults/SearchResults'
import { useSelector } from 'react-redux'
import TextLabelError from '../../components/Error/TextLabelError/TextLabelError'

export const Search = ({close}) => {

    const {loading, results, filter, error} = useSelector(state => state.searchSlice);

    return (
       <FullScreenWrapper maxContentWidth={600} onClose={close}>
                {error ? <TextLabelError label='Error:' error={error} /> : null}
                <FloatingSearch />
                <SearchResults results={results[filter]} loading={loading} filter={filter} />
       </FullScreenWrapper>
    )
}
