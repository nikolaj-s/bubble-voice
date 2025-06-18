import React from 'react'
import { MessageItem } from '../../../../../components/Chat/MessageItem/MessageItem'
import { useSelector } from 'react-redux'
import ContentPlaceholder from '../../../../../components/ui/Placeholders/ContentPlaceholder/ContentPlaceholder'
import { Search } from 'lucide-react'

export const TextChannelResults = ({results}) => {

    const { users } = useSelector(state => state.serverUsersSlice)

    return (
        <>
        {results?.length === 0 ?
        <ContentPlaceholder icon={Search} title={'Ready to dive in?'} message='Start typing to search messages 💬' />
        :
        results.map((message, key) => {
            return <MessageItem prevMessage={results[key - 1]} inSearch={true} message={message} users={users} />
        })}
        </>
    )
}
