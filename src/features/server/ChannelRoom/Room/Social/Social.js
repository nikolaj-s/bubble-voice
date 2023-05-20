// library's
import React from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux';

// state
import { selectDisplayName, selectUsername } from '../../../../settings/appSettings/accountSettings/accountSettingsSlice';
import { newMessage, removeInvalidMessage, selectPinningMessage, selectUsersPermissions, throwServerError, togglePinMessage, updateMessage } from '../../../ServerSlice';

// components
import { MessageInput } from '../../../../../components/inputs/MessageInput/MessageInput';
import { Message } from '../../../../../components/Message/Message';
import { ImagePreview } from './ImagePreview/ImagePreview';

// style
import "./Social.css";

// socket
import { socket } from '../../../ServerBar/ServerBar';
import { Loading } from '../../../../../components/LoadingComponents/Loading/Loading';

// util
import { PersistedDataNotice } from '../../../../../components/PersistedDataNotice/PersistedDataNotice';
import { saveSocialData, SOCIAL_DATA } from '../../../../../util/LocalData';
import { sendDirectMessage, updateDirectmessage } from '../../../../Messages/MessagesSlice';

export const Social = ({currentChannel, channelId, socialRoute = false, bulletin = false, channelName, direct_message, direct_message_user, status}) => {

    const dispatch = useDispatch();

    const messagesRef = React.useRef(null);

    const [text, setText] = React.useState("");

    const [image, setImage] = React.useState(false);

    const [messagesToRender, setMessagesToRender] = React.useState(15);

    const [inputHeight, setInputHeight] = React.useState(80);

    const [loadingMore, toggleLoadingMore] = React.useState(false);

    const username = useSelector(selectUsername);

    const messages = currentChannel.social;

    const permission = useSelector(selectUsersPermissions);

    const displayName = useSelector(selectDisplayName);

    const pinning = useSelector(selectPinningMessage);

    React.useEffect(() => {
        try {

            if (messages[0]._id && currentChannel.persist_social) {
                
                SOCIAL_DATA.set(channelId, {message_id: messages[0]._id})

                saveSocialData();
            }
        } catch (err) {
            return;
        }

    }, [messages])

    React.useEffect(() => {

        try {
            if (bulletin) return;
            
            setTimeout(() => {
                messagesRef.current.scrollTop = messagesRef.current.scrollHeight;

                setTimeout(() => {

                    document.getElementsByClassName('social-messages-wrapper')[0].style.scrollBehavior = 'smooth';

                }, 400)

            }, 300)
        
        if (permission.user_can_post_channel_social) document.getElementById('social-input-selector').focus();
        
        } catch (error) {
            return;
        }
        return () => {
            try {
                document.getElementsByClassName('social-messages-wrapper')[0].style.scrollBehavior = null;
            } catch (e) {
                return;
            }
        }

    // eslint-disable-next-line
    }, [channelId])

    const handleTextInput = (value) => {
        setText(value);
    }

    const send = async () => {

        if (!permission.user_can_post_channel_social) return;
        
        if (text.replace(/\s/g, '').length <= 3 && image === false) return dispatch(throwServerError({errorMessage: "Message Cannot be less than 3 characters"}));

        if (text.split(' ').join('').length === 0 && image === null) return;
        
        if (text.length > 1024) return dispatch(throwServerError({errorMessage: "Message cannot be longer than 1024 characters"}));

        let data = {
            send_to: direct_message_user,
            username: username,
            channel_id: channelId,
            content: {
                image: image ? image.preview : false,
                text: text,
                video: false,
                link: false,
                local_id: Math.random(5 * messages.length) + 1 + username,
                loading: true,
                display_name: displayName
            }
        }

        direct_message ? dispatch(sendDirectMessage({username: direct_message_user, message: data})) : dispatch(newMessage(data));

        data = {...data, file: image?.size ? image : null}

        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        
        setText("");

        setImage(false);

        if (direct_message) {

            await socket.request('send direct message', data)
            .then(res => {
                console.log(res)
                dispatch(updateDirectmessage({...res.message, send_to: direct_message_user}))
            })
            .catch(err => {
                console.log(err)
            })

        } else {
            await socket.request('message', data)
            .then(response => {
    
                if (response.success) {
                    dispatch(updateMessage(response.message));
                }
    
            }).catch(error => {
                console.log(error)
                dispatch(removeInvalidMessage(data));
    
                dispatch(throwServerError({errorMessage: error}));
                
            })
        }

        setTimeout(() => {

            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;

        }, 200)
        
    }

    const listenToEnter = (keycode) => {
        if (keycode === 13) {
            send();
        }
    }

    const handleImage = (image) => {

        if (image.size > 1000000) {
            dispatch(throwServerError({errorMessage: "Image File Size Cannot Be Larger Than 1MB"}));
            return;
        }
        setImage(image);
    }

    const handleLoadMoreOnScroll = (e) => {

        if (loadingMore) return;

        if ((messagesRef.current.scrollTop + messagesRef.current.scrollHeight) < (e.target.clientHeight + 10)) {

            toggleLoadingMore(true);
            
            setTimeout(() => {

                setMessagesToRender(messagesToRender + 15);

                setTimeout(() => {

                    toggleLoadingMore(false);
                
                }, 500)
                

            }, 500);

        }
    
    }

    const pinMessage = (data) => {

        if (currentChannel.persist_social === false) return;

        dispatch(togglePinMessage(data));
    }

    const handleCancelImageSend = () => {
        setImage(null);

        setText("");

        setInputHeight(80)
    }
    
    return (
        <motion.div 
        
        key={"room-social-content-container"}
        
        transition={{
            duration: 0.2
        }}
        className='social-outer-container'
        initial={{
            opacity: 0,
        }}
        animate={{
            opacity: 1,
        }}
        exit={{
            opacity: 0,
        }}>
            <div className='social-wrapper-container'>
                <div  className='social-inner-container'>
                    <ImagePreview cancel={handleCancelImageSend} preview={image?.preview} inputHeight={inputHeight} />
                    <div onScroll={handleLoadMoreOnScroll} ref={messagesRef} className='social-messages-wrapper'>
                        {messages?.slice(0, messagesToRender).map((message, key) => {
                            return <Message persist={currentChannel.persist_social} current_message={message} previous_message={key === messages.length - 1 ? null : messages[key + 1]} pinned={message?.pinned} pinMessage={() => {pinMessage(message)}} perm={permission?.user_can_post_channel_social} channel_id={message?.channel_id} id={message._id} message={message.content} key={message.content.local_id || message._id} />
                        })}
                        {direct_message ? null : <PersistedDataNotice channelName={currentChannel.channel_name} persisted={!currentChannel.persist_social} />}
                    </div>
                    {(direct_message && status) ? <MessageInput socialRoute={socialRoute} updateInputHeight={setInputHeight} persist={currentChannel.persist_social} image={handleImage} keyCode={listenToEnter} value={text} text={handleTextInput} send={send} /> : 
                    permission?.user_can_post_channel_social && !direct_message ?
                    <MessageInput socialRoute={socialRoute} updateInputHeight={setInputHeight} persist={currentChannel.persist_social} image={handleImage} keyCode={listenToEnter} value={text} text={handleTextInput} send={send} />
                     : null}
                </div>
            </div>
            <Loading loading={pinning} />
        </motion.div>
    )
}
