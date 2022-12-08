import React from 'react'
import { PinButton } from '../../buttons/PinButton/PinButton'
import { SubMenuButton } from '../../buttons/subMenuButton/SubMenuButton'
import { Image } from '../../Image/Image'
import { MessageLoadingIndicator } from '../MessageLoadingIndicator/MessageLoadingIndicator'

export const SenderInfo = ({current_message, previous_message, message, pinMessage, pinned, overlay, hover, textColor, index, perm, accentColor}) => {

    return (
        <>
        <div style={{
            height: (previous_message?.username !== current_message?.username) || (previous_message?.content?.date?.split("T")[0] !== current_message?.content?.date?.split("T")[0]) ? 15 : 0,
            padding: (previous_message?.username !== current_message?.username) || (previous_message?.content?.date?.split("T")[0] !== current_message?.content?.date?.split("T")[0]) ? '5px 0 10px 0' : 0,
        }}
        className='sender-info-container'>
                
                {(previous_message?.username !== current_message?.username)
                ||
                (previous_message?.content?.date?.split("T")[0] !== current_message?.content?.date?.split("T")[0])
                ?
                <div className='sender-info-inner-container'>
                    <div className='message-profile-picture'>
                        <Image image={current_message?.content?.user_image} />
                    </div>
                    <h2
                    style={{color: textColor}}
                    >{message.display_name}</h2>
                    {!message.loading ?
                    <p
                        style={{color: textColor, marginRight: 10}}
                    >{message?.date?.split("T")[0]}</p> : null}
                </div>
                : null}
                {message.loading ? 
                <MessageLoadingIndicator />
                : hover ?
                <div style={{top: index === 0 ? 5 : -30, backgroundColor: accentColor}} className='date-submenu-message-wrapper'>
                    {perm ? <PinButton flip_description={index === 0} description={pinned ? 'unpin' : 'pin'} action={pinMessage} width={15} height={15} pinned={pinned} /> : null}
                    {perm ? <SubMenuButton flip_description={index === 0} zIndex={2} description={"More"} width={15} height={15} borderRadius={10} /> : null}
                </div> 
                : null}
            </div>
        </>
    )
}