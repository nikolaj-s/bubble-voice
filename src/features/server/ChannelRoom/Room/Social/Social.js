// library's
import React from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux';

// state
import { selectSecondaryColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectDisplayName, selectUsername } from '../../../../settings/appSettings/accountSettings/accountSettingsSlice';
import { newMessage, selectChannelSocial, selectCurrentChannel, selectCurrentChannelId, selectSocialInputState, selectUsersPermissions, setSocialInput, throwServerError, updateMessage } from '../../../ServerSlice';

// components
import { MessageInput } from '../../../../../components/inputs/MessageInput/MessageInput';
import { Message } from '../../../../../components/Message/Message';
import { Image } from '../../../../../components/Image/Image';

// style
import "./Social.css";

// socket
import { socket } from '../../../ServerBar/ServerBar';


export const Social = ({currentChannel, channelId}) => {

    const dispatch = useDispatch();

    const messagesRef = React.useRef(null);

    const text = useSelector(selectSocialInputState);

    const [image, setImage] = React.useState(null)

    const username = useSelector(selectUsername);

    const secondaryColor = useSelector(selectSecondaryColor);

    const messages = currentChannel.social;

    const permission = useSelector(selectUsersPermissions);

    const displayName = useSelector(selectDisplayName);

    React.useEffect(() => {

        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;

        if (permission.user_can_post_channel_social) document.getElementById('social-input-selector').focus();

        return () => {

            dispatch(setSocialInput(""));
            
        }
    // eslint-disable-next-line
    }, [])

    const handleTextInput = (value) => {
        dispatch(setSocialInput(value))
    }

    const send = async () => {

        if (!permission.user_can_post_channel_social) return;

        if (text.length === 0 && image === null) return;

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

        data = {...data, file: image}

        dispatch(setSocialInput(""));

        setImage(false);

        await socket.request('message', data)
        .then(response => {
            
            if (response.success) {
                dispatch(updateMessage(response.message));
            }

            try {

                messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
                
            } catch (error) {
                return;
            }
        }).catch(error => {
            console.log(error)
            dispatch(throwServerError({errorMessage: error.errorMessage}));
            
        })

        
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
            <div className='social-inner-container'>
                {image?.preview ? 
                <div className='image-social-post-preview'>
                    <Image objectFit='contain' zIndex={1} image={image.preview} />
                </div>
                : null}
                <div ref={messagesRef} className='social-messages-wrapper'>
                    {messages.map(message => {
                        return <Message message={message.content} key={message.content.local_id || message._id} />
                    })}
                </div>
                {permission?.user_can_post_channel_social ? <MessageInput persist={currentChannel.persist_social} image={handleImage} keyCode={listenToEnter} value={text} text={handleTextInput} send={send} /> : null}
            </div>
        </motion.div>
    )
}
