
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ScrollLoadWrapper from '../../../components/ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper';
import ContentHeader from '../../../components/Headers/ContentHeader/ContentHeader';
import { BookmarkPlus, X } from 'lucide-react';
import ContentPlaceholder from '../../../components/ui/Placeholders/ContentPlaceholder/ContentPlaceholder';
import { MessageItem } from '../../../components/Chat/MessageItem/MessageItem';

export const MomentOverlay = () => {

    const [messages, setMessages] = useState([]);

    const selectedMoment = useSelector(state => state.momentsSlice.selectedMoment);

    const users = useSelector(state => state.serverUsersSlice.users);

    React.useEffect(() => {

        if (selectedMoment?.messages) {
            setMessages(selectedMoment?.messages);
        }
    }, [selectedMoment])

    if (!selectedMoment) return <ContentPlaceholder title={'No Moment Selected'} icon={X} />

    return (
        <ScrollLoadWrapper contentGap={0} >
            <ContentHeader Icon={BookmarkPlus} title={selectedMoment?.name} subTitle={selectedMoment?.description} />
            {messages.map((message, key) => {
                return <MessageItem inSearch={true}  key={message._id} message={message} users={users} prevMessage={key === 0 ? {} : messages[key - 1]} />
            })}
        </ScrollLoadWrapper>
    )
}
