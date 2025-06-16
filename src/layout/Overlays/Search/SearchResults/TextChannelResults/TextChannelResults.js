import React from 'react'
import { MessageItem } from '../../../../../components/Chat/MessageItem/MessageItem'
import { useSelector } from 'react-redux'
import SearchPromptPlaceholder from './SearchPromptPlaceholder/SearchPromptPlaceholder'

export const TextChannelResults = ({results}) => {

    const { users } = useSelector(state => state.serverUsersSlice)

    return (
        <>
        {results?.length === 0 ?
        <SearchPromptPlaceholder />
        :
        results.map((message, key) => {
            return <MessageItem prevMessage={results[key - 1]} inSearch={true} message={message} users={users} />
        })}
        </>
    )
}
