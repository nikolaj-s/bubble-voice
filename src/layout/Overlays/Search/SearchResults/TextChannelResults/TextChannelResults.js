import React from 'react'
import { MessageItem } from '../../../../../components/Chat/MessageItem/MessageItem'
import { useSelector } from 'react-redux'

export const TextChannelResults = ({results}) => {

    const { users } = useSelector(state => state.serverUsersSlice)

    return (
        <>
        {results.map((message, key) => {
            return <MessageItem prevMessage={results[key - 1]} inSearch={true} message={message} users={users} />
        })}
        </>
    )
}
