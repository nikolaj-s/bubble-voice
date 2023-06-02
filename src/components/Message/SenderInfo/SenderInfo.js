import React from 'react'
import { PinButton } from '../../buttons/PinButton/PinButton'
import { SubMenuButton } from '../../buttons/subMenuButton/SubMenuButton'
import { Image } from '../../Image/Image'
import { MessageLoadingIndicator } from '../MessageLoadingIndicator/MessageLoadingIndicator'
import { CopyButton } from '../../buttons/CopyButton/CopyButton'

export const SenderInfo = ({link, color, id, profile_picture_shape, current_message, primaryColor, previous_message, message, pinMessage, pinned, overlay, hover, textColor, index, perm, accentColor, persist, action, display_name, user_image}) => {

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
            padding: (previous_message?.username !== current_message?.username) || (previous_message?.content?.date?.split("T")[0] !== current_message?.content?.date?.split("T")[0]) ? '5px 0 8px 0' : 0,
        }}
        className='sender-info-container'>
                
                {(previous_message?.username !== current_message?.username)
                ||
                (previous_message?.content?.date?.split("T")[0] !== current_message?.content?.date?.split("T")[0])
                ?
                <div className='sender-info-inner-container'>
                    <div style={{borderRadius: profile_picture_shape === 'square' ? '5px' : '50%'}} onClick={action} className='message-profile-picture'>
                        <Image image_class={'user-image'} cursor='pointer' image={user_image} />
                    </div>
                    <h2
                    onClick={action}
                    style={{color: color || textColor, filter: 'brightness(150%)'}}
                    >{display_name}</h2>
                    {!message.loading ?
                    <p
                        style={{color: textColor, marginRight: 10}}
                    >{message?.date?.split("T")[0]}</p> : null}
                </div>
                : null}
                {message.loading ? 
                <MessageLoadingIndicator />
                : hover ?
                <div style={{top: index === 0 ? 5 : -20, backgroundColor: primaryColor}} className='date-submenu-message-wrapper'>
                    {(perm && persist) ? <PinButton borderRadius={5} flip_description={index === 0} desc_width={40} description={pinned ? 'Unpin' : 'Pin'} padding={5} action={pinMessage} width={18} desc_space={12}  height={18} pinned={pinned} /> : null}
                    {link ? <CopyButton action={handleCopy} padding={5} flip_description={index === 0} altInvert={true} width={18} height={18} description={"Copy Link"} desc_width={60} desc_space={12} /> : null}
                    {perm ? <SubMenuButton altInvert={true} invert={false} target={`${id}-ctx-message-overlay`} flip_description={index === 0} desc_width={40} zIndex={2} description={"Extra"} desc_space={12} padding={5} width={18} height={18} borderRadius={5} /> : null}
                </div> 
                : null}
            </div>
        </>
    )
}
