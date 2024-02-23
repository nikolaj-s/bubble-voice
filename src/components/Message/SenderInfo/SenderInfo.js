import React from 'react'
import { PinButton } from '../../buttons/PinButton/PinButton'
import { SubMenuButton } from '../../buttons/subMenuButton/SubMenuButton'
import { Image } from '../../Image/Image'
import { MessageLoadingIndicator } from '../MessageLoadingIndicator/MessageLoadingIndicator'
import { CopyButton } from '../../buttons/CopyButton/CopyButton'
import { useSelector } from 'react-redux'
import { selectProfilePinnedMessage, selectUsername } from '../../../features/settings/appSettings/accountSettings/accountSettingsSlice'
import { PinToProfileButton } from '../../buttons/PinToProfileButton/PinToProfileButton'

export const SenderInfo = ({prevDate, date, submenuId, activity = false, timeStamp, direct_message, pin_to_profile, link, id, current_message, primaryColor, previous_message, message, pinMessage, pinned, overlay, hover, textColor, index, perm, accentColor, persist, action, display_name, user_image}) => {

    const userName = useSelector(selectUsername);

    const profilePin = useSelector(selectProfilePinnedMessage);

    const [copyDesc, toggleCopyDesc] = React.useState('Copy')

    const handleCopy = () => {
        try {

            const { clipboard } = window.require('electron');

            clipboard.writeText(link);

            toggleCopyDesc('Copied');

            setTimeout(() => {
                toggleCopyDesc('Copy')
            }, 500)
        } catch (error) {
            console.log(error);
            toggleCopyDesc('Error Copying');
        }
    }

    return (
        <>
        <div 
        
        style={{
            height: (previous_message?.username !== current_message?.username) || (prevDate.getDate() !== date.getDate()) ? 15 : 0,
            padding: (previous_message?.username !== current_message?.username) || (prevDate.getDate() !== date.getDate()) ? '4px 0 2px 0' : 0,
            margin: (previous_message?.username !== current_message?.username) || (prevDate.getDate() !== date.getDate()) ? null : 0
        }}
        className='sender-info-container'>
                
                {(previous_message?.username !== current_message?.username)
                ||
                (prevDate.getDate() !== date.getDate())
                ?
                <div className='sender-info-inner-container'>
                    
                    <h2
                    onClick={action}
                    style={{color: textColor}}
                    >{display_name || current_message.username}</h2>
                    {!message.loading ?
                    <p className='message-date-stamp'
                        style={{color: textColor, marginRight: 10}}
                    >{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${timeStamp}`}</p> : null}
                </div>
                : null}
                {message.loading  ? 
                null :
                <div id={submenuId} style={{top: index === 0 ? 5 : -20, backgroundColor: primaryColor, boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.4)'}} className='date-submenu-message-wrapper'>
                    {activity ? null : hover ?
                    <>
                    {(userName === current_message.username && !direct_message) ? <PinToProfileButton borderRadius={"5px 0px 0px 5px"} pinned={profilePin?._id === current_message?._id} action={() => {pin_to_profile(current_message?._id)}} width={18} padding={5} height={18} /> : null}
                    {(perm && persist) ? <PinButton borderRadius={(userName === current_message.username && !direct_message) ? 0 : "5px 0px 0px 5px"} flip_description={index === 0} desc_width={50} description={pinned ? 'Unpin' : 'Pin'} padding={5} action={pinMessage} width={18} desc_space={12}  height={18} pinned={pinned} /> : null}
                    {link ? <CopyButton borderRadius={0} action={handleCopy} padding={5} flip_description={index === 0} altInvert={true} width={18} height={18} description={copyDesc} desc_width={60} desc_space={12} /> : null}
                    {perm ? <SubMenuButton altInvert={true} invert={false} target={`${id}-ctx-message-overlay`} flip_description={index === 0} desc_width={40} zIndex={2} description={"Extra"} desc_space={12} padding={5} width={18} height={18} borderRadius={"0px 5px 5px 0px"} /> : null}
                    </>
                    : null}                   
                </div> }
            </div>
        </>
    )
}
