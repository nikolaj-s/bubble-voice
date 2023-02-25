// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

// components
import { Muted } from '../../../Icons/Muted/Muted';
import { WebCam } from '../../../Icons/WebCam/WebCam';
import { ScreenShare } from '../../../Icons/ScreenShare/ScreenShare';
import { Image } from '../../../Image/Image';
import { MicMuted } from '../../../Icons/MicMuted/MicMuted';

// state
import { selectSecondaryColor, selectActivationColor, selectTextColor, selectAccentColor, selectPrimaryColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./ChannelUserDisplay.css";

// util
import { USER_PREFS } from '../../../../util/LocalData';
import { DisabledWebCamIcon } from '../../../Icons/DisabledWebCamIcon/DisabledWebCamIcon';
import { DisabledStreamIcon } from '../../../Icons/DisabledStreamIcon/DisabledStreamIcon';
import { setPanelPosition, setSelectedMember } from '../../../../features/server/ChannelRoom/MemberPanel/MemberPanelSlice';
import { selectServerMembers } from '../../../../features/server/ServerSlice';

export const ChannelUserDisplay = ({user, channel_id}) => {

    const [hover, toggleHover] = React.useState(false);

    const dispatch = useDispatch();

    const secondaryColor = useSelector(selectSecondaryColor);

    const activityColor = useSelector(selectActivationColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const accentColor = useSelector(selectAccentColor);

    const members = useSelector(selectServerMembers);
    
    const PREFS = USER_PREFS.get(user._id)

    const hoverEffect = (e, bool) => {

        toggleHover(bool);

        document.getElementById(`${user._id}-channel-user-display-channel-id-${channel_id}`).style.backgroundColor = bool ? primaryColor : null;
    }

    const openMemberPanel = (e) => {
        const target = e.target.localName !== 'div' || e.target.className === "" ? e.target.offsetParent.className === "" ? e.target.offsetParent.offsetParent : e.target.offsetParent : e.target;
        
        const scroll_top = target.parentElement.scrollTop;

        const l_top = target.offsetTop === 0 ? 70 : target.offsetTop + 25;
    
        dispatch(setSelectedMember(user._id));

        dispatch(setPanelPosition({y: l_top - scroll_top, x: e.pageX, origin: (e.view.innerHeight - e.pageY) < 500 ? true : false, left: 250}))
    }

    return (
        <div onClick={openMemberPanel} onMouseEnter={(e) => {hoverEffect(e, true)}} onMouseLeave={(e) => {hoverEffect(e, false)}} id={`${user._id}-channel-user-display-channel-id-${channel_id}`} style={{zIndex: 1}} key={user.username} className='channel-user-placeholder'>
            <div 
            style={{border: `solid 3px ${(user.active && user.microphone) ? activityColor : hover ? primaryColor : secondaryColor}`}}
            className='channel-user-placeholder-user-image'>
                <Image cursor='pointer' objectFit='cover' image={user.user_image} />
            </div>
            <h3 style={{color: textColor, opacity: (user.active && user.microphone) ? 1 : 0.6}}>{user.display_name}</h3>
            <div 
            style={{backgroundColor: accentColor}}
            className='user-status-wrapper'>
                {user.microphone || user.microphone === undefined ? null : <MicMuted />}
                {user.muted ? <Muted /> : null}
                {user.webcam ? PREFS?.disabled_web_cam ? <DisabledWebCamIcon color={textColor} /> : <WebCam /> : null}
                {user.screenshare ? PREFS?.disable_stream ? <DisabledStreamIcon color={textColor} /> : <ScreenShare /> : null}
            </div>
        </div>
    )
}