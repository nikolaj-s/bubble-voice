import React from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { selectAccentColor, selectTextColor, selectPrimaryColor} from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { leaveChannel, selectCurrentChannel } from '../../../features/server/ServerSlice';
import { selectUsername } from '../../../features/settings/appSettings/accountSettings/accountSettingsSlice';
import { playSoundEffect } from '../../../features/settings/soundEffects/soundEffectsSlice';
import { clearWidgetOverLay } from '../../../features/server/ChannelRoom/Room/RoomActionOverlay/RoomActionOverlaySlice';
import { useNavigate } from 'react-router';

export const AltDisconnectButton = ({active}) => {

    const dispatch = useDispatch();

    const [hover, toggleHover] = React.useState(false);

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);
    
    const accentColor = useSelector(selectAccentColor);

    const username = useSelector(selectUsername);

    const navigate = useNavigate();

    const channel = useSelector(selectCurrentChannel);

    const handleHover = (bool) => {
        if (!active) return;

        toggleHover(bool)
    }

    const action = () => {

        if (!active) return;

        dispatch(leaveChannel({username: username}));

        dispatch(playSoundEffect({default: 'disconnected'}));

        dispatch(clearWidgetOverLay());

        navigate(window.location.hash.split('#')[1].split('/channel')[0])
        
        toggleHover(false);
    }

    return (
        <div 
        id={"disconnect-from-channel-button"}
        onClick={action}
        style={{margin: '7px 0px 0px 0px',opacity: !active ? 0.6 : 1, cursor: !active ? 'default' : 'pointer'}}
        onMouseEnter={() => {handleHover(true)}}
        onMouseLeave={() => {handleHover(false)}}
        className='saved-media-container'>
            <div style={{backgroundColor: accentColor, borderRadius: hover  ? '10px' : '50%', transition: '0.1s'}} className='extra-button-icon-container'>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26.67 3.33C26.8807 3.54094 26.999 3.82688 26.999 4.125C26.999 4.42313 26.8807 4.70906 26.67 4.92L24.5025 7.089C25.2965 8.25435 25.6589 9.66027 25.5272 11.0642C25.3955 12.4682 24.7779 13.7822 23.781 14.7795L23.331 15.2295L23.3265 15.234L22.863 15.6975C22.5677 15.9924 22.1674 16.1581 21.75 16.1581C21.3326 16.1581 20.9323 15.9924 20.637 15.6975L14.3025 9.363C14.1562 9.21675 14.0402 9.04311 13.9611 8.85202C13.8819 8.66092 13.8412 8.4561 13.8412 8.24925C13.8412 8.04241 13.8819 7.83759 13.9611 7.64649C14.0402 7.45539 14.1562 7.28176 14.3025 7.1355L15.219 6.2205C16.2169 5.22402 17.5311 4.60676 18.9351 4.47506C20.3392 4.34336 21.7452 4.70547 22.911 5.499L25.08 3.33C25.291 3.11933 25.5769 3.00099 25.875 3.00099C26.1731 3.00099 26.4591 3.11933 26.67 3.33ZM13.17 12.705C13.3807 12.9159 13.499 13.2019 13.499 13.5C13.499 13.7981 13.3807 14.0841 13.17 14.295L11.265 16.203L13.8 18.738L15.705 16.83C15.8087 16.7225 15.9328 16.6367 16.0701 16.5777C16.2073 16.5187 16.3549 16.4876 16.5043 16.4862C16.6536 16.4849 16.8018 16.5132 16.9401 16.5698C17.0784 16.6263 17.204 16.7097 17.3097 16.8153C17.4154 16.9209 17.499 17.0465 17.5556 17.1847C17.6122 17.3229 17.6408 17.471 17.6395 17.6204C17.6383 17.7698 17.6073 17.9174 17.5485 18.0547C17.4896 18.192 17.4039 18.3162 17.2965 18.42L15.3825 20.3355C15.7334 20.7645 15.9123 21.3086 15.8846 21.8621C15.8569 22.4157 15.6245 22.9392 15.2325 23.331L14.7825 23.781C13.7849 24.778 12.4705 25.3955 11.0662 25.527C9.66196 25.6584 8.25583 25.2956 7.09051 24.501L4.92001 26.67C4.70675 26.8687 4.42468 26.9769 4.13323 26.9718C3.84178 26.9666 3.5637 26.8486 3.35758 26.6424C3.15146 26.4363 3.03339 26.1582 3.02825 25.8668C3.02311 25.5753 3.13129 25.2933 3.33001 25.08L5.49751 22.911C4.70353 21.7456 4.34114 20.3397 4.47286 18.9358C4.60457 17.5318 5.22213 16.2178 6.21901 15.2205L6.66901 14.7705C7.06085 14.3785 7.58434 14.1462 8.13787 14.1184C8.6914 14.0907 9.23548 14.2696 9.66451 14.6205L11.58 12.705C11.791 12.4943 12.0769 12.376 12.375 12.376C12.6731 12.376 12.9591 12.4943 13.17 12.705Z" fill="#ff2600" />
            </svg>
            </div>
            
            {hover ? 
            <div onMouseEnter={() => {toggleHover(false)}} style={{backgroundColor: primaryColor}} className='server-button-name-container'>
                <h2 style={{color: textColor}}>Disconnect From {channel.channel_name}</h2>
            </div>
            : null}
        </div>
    )
}