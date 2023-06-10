// library's
import React from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux';

// state
import { selectDisplayName, selectUsername } from '../../../../settings/appSettings/accountSettings/accountSettingsSlice';
import { selectPinningMessage, selectUsersPermissions, throwServerError } from '../../../ServerSlice';

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

import { sendDirectMessage, updateDirectmessage } from '../../../../Messages/MessagesSlice';
import { selectGlassColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { fetchMessages, messageCleanUp, selectAllMessages, selectAltSocialLoading, selectLoadingMessages, sendMessage, togglePinMessage } from '../../../SocialSlice';
import { saveSocialData, SOCIAL_DATA } from '../../../../../util/LocalData';

export const Social = ({currentChannel, channelId, socialRoute = false, bulletin = false, direct_message, direct_message_user, status}) => {

    const dispatch = useDispatch();

    const messagesRef = React.useRef(null);

    const [text, setText] = React.useState("");

    const [image, setImage] = React.useState(false);

    const [inputHeight, setInputHeight] = React.useState(80);

    const [mounting, toggleMounting] = React.useState(true);

    const loadingMore = useSelector(selectLoadingMessages);

    const altLoading = useSelector(selectAltSocialLoading);

    const username = useSelector(selectUsername);

    const permission = useSelector(selectUsersPermissions);

    const displayName = useSelector(selectDisplayName);

    const pinning = useSelector(selectPinningMessage);

    const glassColor = useSelector(selectGlassColor);

    const social = useSelector(selectAllMessages);

    let allMessages = direct_message ? currentChannel.social : social[channelId];

    React.useEffect(() => {

        if (direct_message) return;

        if (social[channelId]) {

            SOCIAL_DATA.set(channelId, {message_id: social[channelId][0]?._id ? social[channelId][0]?._id : ""});
            
            saveSocialData();

        }

    }, [channelId, allMessages])

    React.useEffect(() => {

        if (direct_message) return;
        
        if (social[channelId]) {
            
            if (social[channelId][social[channelId]?.length - 1]?.no_more_messages) {
                return;
            } else if (social[channelId].length < 15) {

                dispatch(fetchMessages({channel_id: channelId}));
            
            }

        } else {
            
            dispatch(fetchMessages({channel_id: channelId}));
        
        }

        return () => {
            dispatch(messageCleanUp(channelId));
        }

    }, [channelId])

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

        let local_id = ((Math.random(5 * allMessages?.length) + 1) * 5) + username

        let data = {
            send_to: direct_message_user,
            username: username,
            channel_id: channelId,
            content: {
                image: image ? image.preview : false,
                text: text,
                video: false,
                link: false,
                local_id: local_id,
                loading: true,
                display_name: displayName
            },
            valid: true
        }

        if (direct_message) {
            
            dispatch(sendDirectMessage({username: direct_message_user, message: data})) 
        
        }

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
            
            dispatch(sendMessage({username: username, file: image, channel_id: channelId, local_id: local_id, text: text, image_preview: image?.preview}))
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

            if (!social[channelId]) return; 

            if (!social[channelId][social[channelId]?.length - 1]?.no_more_messages) {
                
                dispatch(fetchMessages({channel_id: channelId}));
            
            }
            
        }
    
    }

    const pinMessage = (data) => {

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
            duration: 0.1
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
            {loadingMore ?
            <motion.div initial={{opacity: 0, top: '-120px'}} exit={{opacity: 0, top: '-120px'}} animate={{opacity: 1, top: 0}} style={{backgroundColor: glassColor}} className='social-loading-container'>
                <Loading loading={loadingMore} />
            </motion.div>
            : null}
            <div className='social-wrapper-container'>
                <div  className='social-inner-container'>
                    <ImagePreview cancel={handleCancelImageSend} preview={image?.preview} inputHeight={inputHeight} />
                    <div onScroll={handleLoadMoreOnScroll} ref={messagesRef} className='social-messages-wrapper'>
                        {
                        allMessages?.map((message, key) => {
                            return message.no_more_messages ? null :
                            <Message direct_message={direct_message} persist={currentChannel.persist_social} current_message={message} previous_message={key === allMessages?.length - 1 ? null : allMessages[key + 1]} pinned={message?.pinned} pinMessage={() => {pinMessage(message)}} perm={permission?.user_can_post_channel_social} channel_id={message?.channel_id} id={message._id} message={message.content} key={message.content.local_id || message._id} />
                        })}
                        {direct_message ? null : <PersistedDataNotice channelName={currentChannel.channel_name} persisted={!currentChannel.persist_social} />}
                    </div>
                    {(direct_message && status) ? <MessageInput socialRoute={socialRoute} updateInputHeight={setInputHeight} persist={currentChannel.persist_social} image={handleImage} keyCode={listenToEnter} value={text} text={handleTextInput} send={send} /> : 
                    permission?.user_can_post_channel_social && !direct_message ?
                    <MessageInput socialRoute={socialRoute} updateInputHeight={setInputHeight} persist={currentChannel.persist_social} image={handleImage} keyCode={listenToEnter} value={text} text={handleTextInput} send={send} />
                     : null}
                </div>
            </div>
            <Loading loading={pinning || altLoading} />
        </motion.div>
    )
}
