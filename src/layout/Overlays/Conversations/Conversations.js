
import styles from './Conversations.module.css'
import { useDispatch, useSelector } from 'react-redux';
import ScrollLoadWrapper from '../../../components/ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper';
import { Conversation } from './Conversation/Conversation';
import ContentPlaceholder from '../../../components/ui/Placeholders/ContentPlaceholder/ContentPlaceholder';
import { ListX, MessageSquareX } from 'lucide-react';
import TextInput from '../../../components/ui/Inputs/TextInput/TextInput';
import ConversationHeader from '../../../components/Headers/ConversationHeader/ConversationHeader';
import { toggleConversationPanel, toggleUnreadConversations } from '../../../features/Conversations/conversationsSlice';
import ConversationButton from '../../../components/ConversationButton/ConversationButton';
import { setCurrentConversation } from '../../../features/Conversations/conversationSlice';
import { useEffect, useState } from 'react';

export const Conversations = () => {

    const dispatch = useDispatch();

    const {selectedConversation} = useSelector(state => state.conversationSlice);

    const {loading, error, conversations, isOpen} = useSelector(state => state.conversationsSlice);

    const {last_read_status} = useSelector(state => state.notificationsSlice);

    const [filter, setFilter] = useState("");

    const handleClose = () => {
        
        dispatch(toggleConversationPanel());

        dispatch(setCurrentConversation(null));
        
    }

    const openConverstation = (convo) => {
        dispatch(setCurrentConversation(convo));

    }

    useEffect(() => {
        if (!conversations || !last_read_status) return;

        const hasUnread = conversations.some(conversation => {

            const lastRead = last_read_status[conversation._id]?.last_read_at;
            const latestMessage = conversation.updatedAt;

            return latestMessage && (!lastRead || new Date(latestMessage) > new Date(lastRead))
        })

        if (hasUnread) { 
            dispatch(toggleUnreadConversations(true)); 
        } else {

            dispatch(toggleUnreadConversations(false));
        }
    }, [last_read_status, conversations])

    if (!isOpen) return null;

    return (
        <div style={{top: window?.electron ? 32 : 0}} className={styles.container}>
            <ScrollLoadWrapper style={{backgroundColor: 'var(--card-background-color)'}} loading={loading} error={error}>
                <TextInput placeholder='Filter' onChange={setFilter} value={filter} onClear={() => {setFilter("")}} />
                {!loading && conversations.length === 0 && (<ContentPlaceholder icon={ListX} message={'You have no conversations to be had'} />)}
                {conversations?.slice() // shallow copy so we don’t mutate original
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                ?.filter(convo => convo?.other?.display_name?.startsWith(filter)).map(convo => 
                    (<ConversationButton active={convo._id === selectedConversation?._id} 
                    {...convo?.other} {...convo} conversation={convo} action={openConverstation} 
                    key={convo._id} 
                    unread={(new Date(convo?.updatedAt) > new Date(last_read_status[convo?._id]?.last_read_at))}
                    />))}
            </ScrollLoadWrapper>
            <div className={styles.content}>
                <ConversationHeader {...selectedConversation?.other} onClose={handleClose} />
                {selectedConversation ?
                <Conversation />
                :
                <div className={styles.placeholder}>
                    <ContentPlaceholder title={'No Conversation Selected'} icon={MessageSquareX} />
                </div>
                }
            </div>
        </div>
    )
}
