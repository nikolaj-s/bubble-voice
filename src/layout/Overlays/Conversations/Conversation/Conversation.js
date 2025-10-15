import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChatContainer } from '../../../../components/Chat/ChatContainer';
import { sendConversationMessage } from '../../../../features/Conversations/Thunks/sendConversationMessage';
import { fetchConversationMessages } from '../../../../features/Conversations/Thunks/fetchConversationMessages';
import { updateLastReadStatus } from '../../../../features/Notifications/Thunks/updateLastReadStatus';
import { setConversationReply, setConversationText } from '../../../../features/Conversations/conversationSlice';

export const Conversation = () => {

    const dispatch = useDispatch();

    const {selectedConversation, loading, error, sending, messages, noMoreMessages, conversationReply, text} = useSelector(state => state.conversationSlice);

    const [users, setUsers] = React.useState({});

    const [images, setImages] = React.useState([]);

    const {_id: user_id} = useSelector(state => state.accountSlice.account)

    React.useEffect(() => {

        let participants = selectedConversation?.participants;

        if (Array.isArray(participants)) {
            setUsers(participants.reduce((acc, item) => {acc[item._id] = item; return acc}, {}))
        }

        if (selectedConversation?._id) {
            
            dispatch(fetchConversationMessages({conversation_id: selectedConversation._id}))
            
            dispatch(updateLastReadStatus(selectedConversation?._id))
        }

        return () => {

            if (selectedConversation?._id) {
                console.log(selectedConversation)
                dispatch(updateLastReadStatus(selectedConversation?._id))
            }

        }

    }, [selectedConversation])

    const handleSend = () => {

        if (sending) return;

        if (!text.trim().length && images.length === 0) return;

        const payload = {
            user_id,
            conversation_id: selectedConversation?._id,
            reply_to: conversationReply?._id,
            text
        }

        // attach single vs multiple
        if (images.length === 1) {
            payload.image = images[0];
        } else if (images.length > 1) {
            payload.images = images;
        }

        dispatch(sendConversationMessage(payload));

        setImages([]);

        dispatch(setConversationText(""));
    }

    return (
        <div style={{height: window?.electron ? 'calc(100svh - 91px)' : 'calc(100svh - 61px)', flexShrink: 0, display: 'flex', position: 'relative', backgroundColor: 'var(--primary-color)'}} >
            <ChatContainer 
            id={selectedConversation?._id} users={users}  
            loadingMore={loading}
            loading={false}
            sending={sending}
            send={handleSend}
            setImage={setImages}
            setValue={(value) => {dispatch(setConversationText(value))}}
            error={error}   
            reply={(message) => {dispatch(setConversationReply(message))}}

            clearReplyTo={() => {dispatch(setConversationReply(null))}}
            replyTo={conversationReply}
            value={text}
            messages={messages}
            noMoreMessages={noMoreMessages}
            placeholder={`Message ${selectedConversation?.other?.display_name}`}
            type='conversation'
            />
        </div>
    )
}
