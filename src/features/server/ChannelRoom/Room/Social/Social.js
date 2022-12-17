// library's
import React from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux';

// state
import { selectDisplayName, selectUsername } from '../../../../settings/appSettings/accountSettings/accountSettingsSlice';
import { newMessage, selectPinningMessage, selectUsersPermissions, throwServerError, togglePinMessage, updateMessage } from '../../../ServerSlice';

// components
import { MessageInput } from '../../../../../components/inputs/MessageInput/MessageInput';
import { Message } from '../../../../../components/Message/Message';
import { Image } from '../../../../../components/Image/Image';

// style
import "./Social.css";

// socket
import { socket } from '../../../ServerBar/ServerBar';
import { Loading } from '../../../../../components/LoadingComponents/Loading/Loading';

import { PersistedDataNotice } from '../../../../../components/PersistedDataNotice/PersistedDataNotice';


export const Social = ({currentChannel, channelId, socialRoute = false, bulletin = false, channelName}) => {

    const dispatch = useDispatch();

    const messagesRef = React.useRef(null);

    const [text, setText] = React.useState("");

    const [image, setImage] = React.useState(null);

    const [messagesToRender, setMessagesToRender] = React.useState(15);

    const [inputHeight, setInputHeight] = React.useState(80);

    const username = useSelector(selectUsername);

    const messages = currentChannel.social;

    const permission = useSelector(selectUsersPermissions);

    const displayName = useSelector(selectDisplayName);

    const pinning = useSelector(selectPinningMessage);

    React.useEffect(() => {

        if (bulletin) return;

        setTimeout(() => {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;

            setTimeout(() => {

                document.getElementsByClassName('social-messages-wrapper')[0].style.scrollBehavior = 'smooth';

            }, 400)

        }, 300)
        
        if (permission.user_can_post_channel_social) document.getElementById('social-input-selector').focus();

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

        if (text.length === 0 && image === null) return;

        if (text.length > 511) return dispatch(throwServerError({errorMessage: "Message cannot be longer than 512 characters"}));

        let data = {
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

        dispatch(newMessage(data));

        data = {...data, file: image?.size ? image : null}

        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        
        setText("");

        setImage(false);

        await socket.request('message', data)
        .then(response => {

            if (response.success) {
                dispatch(updateMessage(response.message));
            }

        }).catch(error => {
            console.log(error)
            dispatch(throwServerError({errorMessage: error.errorMessage}));
            
        })

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
        
        if ((messagesRef.current.scrollTop + messagesRef.current.scrollHeight) * .8 < e.target.clientHeight) {
            
            setMessagesToRender(messagesToRender + 15);
        
        }
    
    }

    const pinMessage = (data) => {
        dispatch(togglePinMessage(data));
    }
    console.log(currentChannel)
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
                    {image?.preview ? 
                    <div style={{bottom: inputHeight}} className='image-social-post-preview'>
                        <Image position='relative' objectFit='contain' zIndex={1} image={image.preview} />
                    </div>
                    : null}
                    <div onScroll={handleLoadMoreOnScroll} ref={messagesRef} className='social-messages-wrapper'>
                        {messages?.slice(0, messagesToRender).map((message, key) => {
                            return <Message current_message={message} previous_message={key === messages.length - 1 ? null : messages[key + 1]} pinned={message.pinned} pinMessage={() => {pinMessage(message)}} perm={permission?.user_can_post_channel_social} channel_id={message.channel_id} id={message._id} message={message.content} key={message.content.local_id || message._id} />
                        })}
                        <PersistedDataNotice channelName={currentChannel.channel_name} persisted={!currentChannel.persist_social} />
                    </div>
                    {permission?.user_can_post_channel_social ? <MessageInput socialRoute={socialRoute} updateInputHeight={setInputHeight} persist={currentChannel.persist_social} image={handleImage} keyCode={listenToEnter} value={text} text={handleTextInput} send={send} /> : null}
                </div>
            </div>
            <Loading loading={pinning} />
        </motion.div>
    )
}
