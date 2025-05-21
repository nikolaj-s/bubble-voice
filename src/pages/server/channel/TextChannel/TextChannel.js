import React from 'react'
import { TextChannelProvider } from '../../../../providers/TextChannelProvider/TextChannelProvider'
import { ChatContainer } from '../../../../components/Chat/ChatContainer'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../../../../features/Channel/TextChannel/Thunks/sendMessage'
import { fetchMessages } from '../../../../features/Channel/TextChannel/Thunks/fetchMessages'
import { setReplyTo, setTextChannelPos } from '../../../../features/Channel/TextChannel/textChannelSlice'
import { ChannelBackground } from '../../../../components/ChannelBackground/ChannelBackground'
import { setLastReadStatus } from '../../../../features/Notifications/notificationsSlice'
import { updateLastReadStatus } from '../../../../features/Notifications/Thunks/updateLastReadStatus'

export const TextChannel = ({channel}) => {

    const dispatch = useDispatch();

    const {messages, loading, loadingMore, error, sending, noMoreMessages, replyTo} = useSelector(state => state.textChannelSlice);

    const [showBackground, toggeShowBackground] = React.useState(false);

    const {user_id} = useSelector(state => state.accountSlice.account);

    const users = useSelector(state => state.serverUsersSlice.users);

    const permissions = useSelector(state => state.serverPermissionsSlice?.permissions[users[user_id]?.server_group]);

    const position = useSelector(state => state.textChannelSlice.textChannelPos[channel]);

    const [image, setImage] = React.useState(null);

    const [text, setText] = React.useState("");

    const channel_details = useSelector(state => state.channelsSlice.channels[channel]);

    const handleSend = () => {

        if (sending) return;

        if (!image && text.length === 0) return;

        dispatch(sendMessage({text, user_id, image, channel_id: channel, reply_to: replyTo}));
        
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

    React.useEffect(() => {

        requestAnimationFrame(() => {

            toggeShowBackground(true)

        })

    }, [])

    const clearReplyTo = () => {
        dispatch(setReplyTo(null));
    }

    React.useEffect(() => {

        dispatch(setLastReadStatus(channel))

    }, [dispatch, messages, channel])

    React.useEffect(() => {

        return () => {
            if (!channel) return;

            dispatch(updateLastReadStatus(channel));
        }

    }, [channel, dispatch])
   
    return (
        <TextChannelProvider channel={channel} >
            <ChatContainer 
            position={position?.position} 
            returnPos={saveTextChannelPos} 
            key={channel} 
            users={users} 
            loadingMore={loadingMore} 
            loadMoreMessages={loadMoreMessages} 
            sending={sending} send={handleSend} 
            messages={messages} error={error} 
            loading={loading}  setImage={setImage} 
            setValue={setText} value={text} 
            replyTo={replyTo} clearReplyTo={clearReplyTo}
            placeholder={`Post in ${channel_details?.channel_name}`}
            noMoreMessages={noMoreMessages}
            name={channel_details?.channel_name}
            disableInput={!permissions?.user_can_post_in_text_channels}
            />
            {showBackground ? <ChannelBackground {...channel_details} /> : null}
        </TextChannelProvider>
    )
}
