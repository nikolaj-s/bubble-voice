import React from 'react'
import { PinButton } from '../../buttons/PinButton/PinButton'
import { SubMenuButton } from '../../buttons/subMenuButton/SubMenuButton'
import { Image } from '../../Image/Image'
import { MessageLoadingIndicator } from '../MessageLoadingIndicator/MessageLoadingIndicator'
import { CopyButton } from '../../buttons/CopyButton/CopyButton'
import { useSelector } from 'react-redux'
import { selectProfilePinnedMessage, selectUsername } from '../../../features/settings/appSettings/accountSettings/accountSettingsSlice'
import { PinToProfileButton } from '../../buttons/PinToProfileButton/PinToProfileButton'

export const SenderInfo = ({submenuId, activity = false, timeStamp, direct_message, pin_to_profile, link, id, current_message, primaryColor, previous_message, message, pinMessage, pinned, overlay, hover, textColor, index, perm, accentColor, persist, action, display_name, user_image}) => {

    const userName = useSelector(selectUsername);

    const profilePin = useSelector(selectProfilePinnedMessage);

    const handleCopy = () => {
        try {

            const { clipboard } = window.require('electron');

            clipboard.writeText(link);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <div 
        
        style={{
            height: (previous_message?.username !== current_message?.username) || (previous_message?.content?.date?.split("T")[0] !== current_message?.content?.date?.split("T")[0]) ? 15 : 0,
            padding: (previous_message?.username !== current_message?.username) || (previous_message?.content?.date?.split("T")[0] !== current_message?.content?.date?.split("T")[0]) ? '0px 0 4px 0' : 0,
        }}
        className='sender-info-container'>
                
                {(previous_message?.username !== current_message?.username)
                ||
                (previous_message?.content?.date?.split("T")[0] !== current_message?.content?.date?.split("T")[0])
                ?
                <div className='sender-info-inner-container'>
                    
                    <h2
                    onClick={action}
                    style={{color: textColor}}
                    >{display_name || current_message.username}</h2>
                    {!message.loading ?
                    <p className='message-date-stamp'
                        style={{color: textColor, marginRight: 10}}
                    >{message?.date?.split("T")[0]}</p> : null}
                </div>
                : null}
                {message.loading  ? 
                null :
                <div id={submenuId} style={{top: index === 0 ? 5 : -20, backgroundColor: primaryColor, boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.4)'}} className='date-submenu-message-wrapper'>
                    <p className='message-exact-time-stamp' style={{color: textColor, fontSize: '0.7rem', paddingRight: activity ? 5 : 0, paddingLeft: 5, paddingRight: 5}}>{timeStamp}</p>
                    {activity ? null :
                    <>
                    {(userName === current_message.username && !direct_message) ? <PinToProfileButton pinned={profilePin?._id === current_message?._id} action={() => {pin_to_profile(current_message?._id)}} width={18} padding={5} height={18} /> : null}
                    {(perm && persist) ? <PinButton borderRadius={5} flip_description={index === 0} desc_width={40} description={pinned ? 'Unpin' : 'Pin'} padding={5} action={pinMessage} width={18} desc_space={12}  height={18} pinned={pinned} /> : null}
                    {link ? <CopyButton action={handleCopy} padding={5} flip_description={index === 0} altInvert={true} width={18} height={18} description={"Copy Link"} desc_width={60} desc_space={12} /> : null}
                    {perm ? <SubMenuButton altInvert={true} invert={false} target={`${id}-ctx-message-overlay`} flip_description={index === 0} desc_width={40} zIndex={2} description={"Extra"} desc_space={12} padding={5} width={18} height={18} borderRadius={5} /> : null}
                    </>
                    }                   
                </div> }
            </div>
        </>
    )
}
