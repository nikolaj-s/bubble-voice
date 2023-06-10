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
import { selectActivationColor, selectTextColor, selectAccentColor, selectPrimaryColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./ChannelUserDisplay.css";

// util
import { USER_PREFS } from '../../../../util/LocalData';
import { DisabledWebCamIcon } from '../../../Icons/DisabledWebCamIcon/DisabledWebCamIcon';
import { DisabledStreamIcon } from '../../../Icons/DisabledStreamIcon/DisabledStreamIcon';
import { setPanelPosition, setSelectedMember } from '../../../../features/server/ChannelRoom/MemberPanel/MemberPanelSlice';
import { selectCurrentChannelId } from '../../../../features/server/ServerSlice';

export const ChannelUserDisplay = ({user, channel_id}) => {

    const [hover, toggleHover] = React.useState(false);

    const dispatch = useDispatch();

    const activityColor = useSelector(selectActivationColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const accentColor = useSelector(selectAccentColor);

    const PREFS = USER_PREFS.get(user._id)

    const currentChannelId = useSelector(selectCurrentChannelId);

    const hoverEffect = (e, bool) => {

        toggleHover(bool);

    }

    const openMemberPanel = (e) => {
        const target = e.target.localName !== 'div' || e.target.className === "" ? e.target.offsetParent.className === "" ? e.target.offsetParent.offsetParent : e.target.offsetParent : e.target;
        
        const scroll_top = target.parentElement.scrollTop;

        const l_top = target.offsetTop === 0 ? 70 : target.offsetTop + 25;
    
        dispatch(setSelectedMember(user._id));

        dispatch(setPanelPosition({y: l_top - scroll_top, x: e.pageX, origin: (e.view.innerHeight - e.pageY) < 500 ? true : false, left: 250}))
    }
    
    const onDragStart = (e) => {
        e.dataTransfer.setData('text/plain', `${channel_id} ${user.username}`)

        e.target.style.cursor = 'move';
    }

    const onDragEnd = (e) => {
        e.target.style.cursor = 'default';
    }

    return (
        <div onDragStart={onDragStart} onDragEnd={onDragEnd} draggable={true} onClick={openMemberPanel} onMouseEnter={(e) => {hoverEffect(e, true)}} onMouseLeave={(e) => {hoverEffect(e, false)}} id={`${user._id}-channel-user-display-channel-id-${channel_id}`} style={{zIndex: 1, backgroundColor: hover ? primaryColor : null, filter: (user.active && user.microphone) ? 'brightness(125%)' : null}} key={user.username} className='channel-user-placeholder'>
            <div 
            style={{border: (user.active && user.microphone && currentChannelId === channel_id) ? `solid 2px ${activityColor}` : null, borderRadius: user.profile_picture_shape === 'square' ? '5px' : '50%', width: (user.active && user.microphone) ? 26 : 30, height: (user.active && user.microphone) ? 26 : 30}}
            className='channel-user-placeholder-user-image'>
                <Image image_class={'user-image'} cursor='pointer' objectFit='cover' image={user.user_image} />
            </div>
            <h3 style={{color: user?.color || textColor, opacity: (user.active && user.microphone) ? 1 : 0.8, filter: 'brightness(150%)', fontWeight: '600'}}>{user.display_name}</h3>
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