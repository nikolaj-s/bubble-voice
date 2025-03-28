import React from 'react'
import { TextChannelProvider } from '../../../../providers/TextChannelProvider/TextChannelProvider'
import { ChatContainer } from '../../../../components/Chat/ChatContainer'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../../../../features/TextChannel/Thunks/sendMessage'
import { fetchMessages } from '../../../../features/TextChannel/Thunks/fetchMessages'
import { setTextChannelPos } from '../../../../features/TextChannel/textChannelSlice'

export const TextChannel = ({channel}) => {

    const dispatch = useDispatch();

    const {messages, loading, loadingMore, error, sending, noMoreMessages} = useSelector(state => state.textChannelSlice);

    const {user_id} = useSelector(state => state.accountSlice.account);

    const users = useSelector(state => state.serverUsersSlice.users);

    const position = useSelector(state => state.textChannelSlice.textChannelPos[channel]);

    const [image, setImage] = React.useState(null);

    const [text, setText] = React.useState("");

    const handleSend = () => {

        if (sending) return;

        if (!image && text.length === 0) return;

        dispatch(sendMessage({text, user_id, image, channel_id: channel}));
        
        setImage(null);

        setText("");

    }

    const loadMoreMessages = () => {

        if (loadingMore || loading || noMoreMessages) return;

        const last_message_id = messages[messages.length - 1].message_id;

        dispatch(fetchMessages({last_message_id, channel_id: channel}));
    }

    const saveTextChannelPos = (data) => {
        dispatch(setTextChannelPos(data));
    }
   
    return (
        <TextChannelProvider channel={channel} >
            <ChatContainer position={position?.position} returnPos={saveTextChannelPos} key={channel} users={users} loadingMore={loadingMore} loadMoreMessages={loadMoreMessages} sending={sending} send={handleSend} messages={messages} error={error} loading={loading}  setImage={setImage} setValue={setText} value={text} />
        </TextChannelProvider>
    )
}
