// library's
import React from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux';

// state
import { handlePinMessageToProfile, selectDisplayName, selectUserImage, selectUsername } from '../../../../settings/appSettings/accountSettings/accountSettingsSlice';
import { selectCurrentChannel, selectCurrentChannelId, selectPinningMessage, selectUsersPermissions, throwServerError } from '../../../ServerSlice';

// components
import { MessageInput } from '../../../../../components/inputs/MessageInput/MessageInput';
import { Message } from '../../../../../components/Message/Message';

// style
import "./Social.css";

// socket
import { socket } from '../../../ServerBar/ServerBar';
import { Loading } from '../../../../../components/LoadingComponents/Loading/Loading';

// util
import { PersistedDataNotice } from '../../../../../components/PersistedDataNotice/PersistedDataNotice';

import { sendDirectMessage, updateDirectmessage } from '../../../../Messages/MessagesSlice';
import { selectGlassColor, selectGlassState, selectPrimaryColor, selectSecondaryColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { fetchMessages, messageCleanUp, selectAllMessages, selectAltSocialLoading, selectLoadingMessages, selectNsfwNoticeState, sendMessage, togglePinMessage, toggleSocialAltLoading } from '../../../SocialSlice';
import { saveSocialData, SOCIAL_DATA } from '../../../../../util/LocalData';
import { MessagePlaceHolderLoader } from '../../../../../components/MessagePlaceHolderLoader/MessagePlaceHolderLoader';
import { clearCache } from '../../../../../util/ClearCaches';
import { CannotViewSocial } from '../../../../../components/CannotViewSocial/CannotViewSocial';
import { ExplicitContentWarning } from './ExplicitContentWarning/ExplicitContentWarning';
import { selectDisableNsfwWarning } from '../../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

export const Social = ({currentChannel, channelId, socialRoute = false, bulletin = false, direct_message, direct_message_user, status}) => {

    const dispatch = useDispatch();

    const messagesRef = React.useRef(null);

    const [text, setText] = React.useState("");

    const [image, setImage] = React.useState(false);

    // eslint-disable-next-line
    const [inputHeight, setInputHeight] = React.useState(80);

    const [mounting, toggleMounting] = React.useState(false);

    const [initialMount, toggleInitialMount] = React.useState(true);

    const [emoji, setEmoji] = React.useState();

    const [nsfw, toggleNsfw] = React.useState(false);

    const loadingMore = useSelector(selectLoadingMessages);

    const altLoading = useSelector(selectAltSocialLoading);

    const username = useSelector(selectUsername);

    const permission = useSelector(selectUsersPermissions);

    const disableNsfwWarning = useSelector(selectDisableNsfwWarning);

    const displayName = useSelector(selectDisplayName);

    const pinning = useSelector(selectPinningMessage);

    const glassColor = useSelector(selectGlassColor);

    const inChannel = useSelector(selectCurrentChannelId);

    const social = useSelector(selectAllMessages);

    const userImage = useSelector(selectUserImage);

    const nsfwNotice = useSelector(selectNsfwNoticeState);

    const primaryColor = useSelector(selectPrimaryColor);

    let allMessages = direct_message ? currentChannel.social : social[channelId];

    React.useEffect(() => {

        if (direct_message) return;

        if (!social[channelId]) return;

        if (social[channelId]) {
            if (!social[channelId][0]?._id) return;
            
            SOCIAL_DATA.set(channelId, {message_id: social[channelId][0]?._id ? social[channelId][0]?._id : ""});
            
            saveSocialData();

        }
        // eslint-disable-next-line
    }, [channelId, allMessages])

    React.useEffect(() => {

        if (!permission?.user_can_view_channel_content) return;

        setTimeout(() => {
            toggleInitialMount(false);
        }, 120)

        if (direct_message) return;
        
        if (social[channelId]) {
            
            if (social[channelId][social[channelId]?.length - 1]?.no_more_messages) {
                return;
            } else if (social[channelId].length < 15) {
                console.log('fetching')
                dispatch(fetchMessages({channel_id: channelId}));
            
            }

        } else if (channelId) {
            
            dispatch(fetchMessages({channel_id: channelId}));
        
        }

        return () => {
            dispatch(messageCleanUp(channelId));
            
            clearCache();
        }
// eslint-disable-next-line
    }, [channelId])

    React.useEffect(() => {

        try {
            if (bulletin) return;
            
            setTimeout(() => {
                messagesRef.current.scrollTop = messagesRef.current.scrollHeight;

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
            dispatch(toggleSocialAltLoading(false));
        }

    // eslint-disable-next-line
    }, [channelId])

    const handleTextInput = (value) => {
        setText(value);
    }
   
    const send = async (textStyle) => {

        if (!permission.user_can_post_channel_social) return;
        
        if (text.replace(/\s/g, '').length < 1 && !image.size && !emoji) return;

        if (text.length === 0 && !image.size && !emoji) return;
        
        if (text.length > 1024) return dispatch(throwServerError({errorMessage: "Message cannot be longer than 1024 characters"}));

        let local_id = ((Math.random(5 * allMessages?.length) + 1) * 5) + username

        let video = false;

        console.log(emoji)

        let data = {
            send_to: direct_message_user,
            username: username,
            channel_id: channelId,
            content: {
                image: image ? true : false,
                text: text,
                video: video,
                link: false,
                local_id: local_id,
                loading: true,
                display_name: displayName,
                emoji: emoji,
                textStyle: textStyle
            },
            valid: true,
            nsfw: nsfw
        }
        console.log(text)

        if (direct_message) {
            
            dispatch(sendDirectMessage({username: direct_message_user, message: data})) 
        
        }

        data = {...data, file: image?.size && !image?.type?.includes('video') ? image : null}
        
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        
        setText("");

        setImage(false);

        setEmoji(null);

        if (direct_message) {

            await socket.request('send direct message', {...data, user_image: userImage})
            .then(res => {
                console.log(res)
                dispatch(updateDirectmessage({...res.message, send_to: direct_message_user}))
            })
            .catch(err => {
                console.log(err)
            })

        } else {
            
            dispatch(sendMessage({username: username, file: image, channel_id: channelId, local_id: local_id, text: text, image_preview: image.preview ? true : false, emoji: emoji, nsfw: nsfw, textStyle: textStyle}))
        }

        setTimeout(() => {

            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;

        }, 200)

        URL.revokeObjectURL(image?.preview);
        
    }

    const listenToEnter = (keycode, style) => {
        if (keycode === 13) {
            send(style);
        }
    }

    const handleImage = (image) => {

        if (image.size > 1000000 && !image.type.includes('video')) {
            dispatch(throwServerError({errorMessage: "Image File Size Cannot Be Larger Than 1MB"}));
            return;
        }
        setImage(image);
    }

    const handleLoadMoreOnScroll = (e) => {

        if (loadingMore || mounting) return;

        

        if ((messagesRef.current.scrollTop + messagesRef.current.scrollHeight) < (e.target.clientHeight + 200)) {

            if (!social[channelId]) return; 

            if (!social[channelId][social[channelId]?.length - 1]?.no_more_messages) {
                
                toggleMounting(true);

                setTimeout(() => {
                    dispatch(fetchMessages({channel_id: channelId}));

                    toggleMounting(false);
                }, 1250)
                
            
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

    const pinToProfile = (id) => {
        if (altLoading) return;

        dispatch(handlePinMessageToProfile({id: id}));
    }

    const focusTextInput = () => {
        
        if (document.getElementsByClassName('image-search-outer-wrapper').length > 0) return;

        if (document.getElementsByClassName('social-outer-container').length > 1) return;
        
        try {
            document.getElementById(`social-input-selector-${channelId}`).focus();
        } catch(e){
            return;
        }

    }

    const handleToggleNsfw = (value) => {
        toggleNsfw(value);
    }

    React.useEffect(() => {

        if (direct_message) return;

        window.addEventListener('keypress', focusTextInput);

        return () => {
            window.removeEventListener('keypress', focusTextInput);
        }
    // eslint-disable-next-line
    }, [])

    return (
        <div 
        onKeyUp={focusTextInput}
        className='social-outer-container'
        style={{backgroundColor: primaryColor}}
        >
        {permission?.user_can_view_channel_content ?
            <>
            {loadingMore || mounting ?
            <motion.div initial={{opacity: 0, top: '-120px'}} exit={{opacity: 0, top: '-120px'}} animate={{opacity: 1, top: 0}} style={{backgroundColor: glassColor}} className='social-loading-container'>
                <Loading loading={loadingMore || mounting} />
            </motion.div>
            : null}
            
            <div 
            style={{backgroundColor: glassColor}}
            className='social-wrapper-container'>
                <div  className='social-inner-container'>
                    
                    <div onScroll={handleLoadMoreOnScroll} ref={messagesRef} className='social-messages-wrapper'>
                        {initialMount ? 
                        <MessagePlaceHolderLoader /> :
                        nsfwNotice && !disableNsfwWarning ?
                        <ExplicitContentWarning />
                        :
                        allMessages?.map((message, key) => {
                            return message.no_more_messages ? null :
                            <Message pin_to_profile={pinToProfile} dashboard={false} direct_message={direct_message} persist={currentChannel.persist_social} current_message={message} previous_message={key === allMessages?.length - 1 ? null : allMessages[key + 1]} pinned={message?.pinned} pinMessage={() => {pinMessage(message)}} perm={permission?.user_can_post_channel_social} channel_id={message?.channel_id} id={message._id} message={message.content} key={message._id || message.content.local_id} />
                        })}
                        {direct_message ? null : <PersistedDataNotice channelName={currentChannel.channel_name} persisted={!currentChannel.persist_social} />}
                        
                    </div>
                    {(direct_message && status) ? <MessageInput nsfw={nsfw} handleNsfw={handleToggleNsfw} setEmoji={setEmoji} cancel_image={handleCancelImageSend} direct_message={direct_message} socialRoute={socialRoute} updateInputHeight={setInputHeight} persist={currentChannel.persist_social} image={handleImage} keyCode={listenToEnter} value={text} text={handleTextInput} send={send} /> : 
                    permission?.user_can_post_channel_social && !direct_message ?
                    <MessageInput channelId={channelId} nsfw={nsfw} handleNsfw={handleToggleNsfw} setEmoji={setEmoji} channel_name={currentChannel?.channel_name} direct_message={direct_message} socialRoute={socialRoute} updateInputHeight={setInputHeight} persist={currentChannel.persist_social} image={handleImage} keyCode={listenToEnter} value={text} text={handleTextInput} send={send} />
                     : null}
                </div>
            </div>
            <Loading loading={pinning || altLoading} />
            </>
        :
        <CannotViewSocial />
        }
        </div>
    )
}
