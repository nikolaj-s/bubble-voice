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

export const ChannelUserDisplay = ({user, channel_id, dragging = () => {}}) => {

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

        dispatch(setSelectedMember(user._id));

        dispatch(setPanelPosition({y: (e.view.innerHeight - 600) < 0 ? 30 : e.pageY, x: e.pageX, origin: e.view.innerHeight - 600 < 0 ? false : (e.view.innerHeight - e.pageY) < 500 ? true : false, left: 250}))
    }
    
    const onDragStart = (e) => {
        e.stopPropagation();

        e.dataTransfer.setData('text/plain', `${channel_id} ${user.username}`)

        e.target.style.cursor = 'move';

        dragging(true);
    }

    const onDragEnd = (e) => {

        dragging(false);

        e.target.style.cursor = 'default';
    }

    return (
        <div onDragStart={onDragStart} onDragEnd={onDragEnd} draggable='true' onClick={openMemberPanel} onMouseEnter={(e) => {hoverEffect(e, true)}} onMouseLeave={(e) => {hoverEffect(e, false)}} id={`${user._id}-channel-user-display-channel-id-${channel_id}`} style={{zIndex: 1, backgroundColor: hover ? primaryColor : null,}} key={user.username} className='channel-user-placeholder'>
            <div 
            style={{position: 'relative', borderRadius: user.profile_picture_shape === 'square' ? '5px' : '50%', width: 28, height: 28}}
            className='channel-user-placeholder-user-image'>
                <Image image_class={'user-image'} cursor='pointer' objectFit='cover' image={user.user_image?.includes('.gif') ? "" : user.user_image} />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 'calc(100% - 6px)',
                    height: 'calc(100% - 6px)',
                    borderRadius: user.profile_picture_shape === 'square' ? '5px' : '50%',
                    border: (user.active && user.microphone && currentChannelId === channel_id) ? `solid 3px ${activityColor}` : `solid 3px rgba(0,0,0,0)`,
                }}>

                </div>
            </div>
            <h3 style={{color: textColor, opacity: (user.active && user.microphone && currentChannelId === channel_id) ? 1 : 0.6,
            fontWeight: (user.active && user.microphone && currentChannelId === channel_id) ? 500 : null}}>{user.display_name}</h3>
            <div 
            className='user-status-wrapper'>
                {user.microphone || user.microphone === undefined ? null : <MicMuted />}
                {user.muted ? <Muted /> : null}
                {user.webcam ? PREFS?.disabled_web_cam ? <DisabledWebCamIcon color={textColor} /> : <WebCam /> : null}
                {user.screenshare ? PREFS?.disable_stream ? <DisabledStreamIcon color={textColor} /> : <ScreenShare /> : null}
            </div>
        </div>
    )
}