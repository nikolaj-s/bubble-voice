import React from 'react'
import FullScreenWrapper from '../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper'
import FloatingSearch from '../../components/Inputs/FloatingSearch/FloatingSearch'
import { SearchResults } from '../../components/SearchResults/SearchResults'

export const Search = ({close}) => {

    return (
       <FullScreenWrapper onClose={close}>
            <FloatingSearch />
            <SearchResults loading={true} />
       </FullScreenWrapper>
    )
}
