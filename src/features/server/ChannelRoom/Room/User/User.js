// library's
import React from 'react'
import { useSelector } from 'react-redux';
import { Image } from '../../../../../components/Image/Image';
import { Loading } from '../../../../../components/LoadingComponents/Loading/Loading';
import { USER_PREFS } from '../../../../../util/LocalData';
import { selectAccentColor, selectActivationColor, selectSecondaryColor, selectTextColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectMiscSettingsHideNonVideoParticapents } from '../../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

// style
import "./User.css";
import { selectUsername } from '../../../../settings/appSettings/accountSettings/accountSettingsSlice';
import { DisabledWebCamIcon } from '../../../../../components/Icons/DisabledWebCamIcon/DisabledWebCamIcon';
import { DisabledStreamIcon } from '../../../../../components/Icons/DisabledStreamIcon/DisabledStreamIcon';
import { Muted } from '../../../../../components/Icons/Muted/Muted';
import { MicMuted } from '../../../../../components/Icons/MicMuted/MicMuted';
import { ScreenShare } from '../../../../../components/Icons/ScreenShare/ScreenShare';
import { Decoration } from '../../../../../components/Decoration/Decoration';
import { Gif } from '../../../../../components/Gif/Gif';

export const User = ({user}) => {

    const [hover, toggleHover] = React.useState(false);

    const accentColor = useSelector(selectAccentColor)

    const activeColor = useSelector(selectActivationColor);

    const hideNonVideoParticapents = useSelector(selectMiscSettingsHideNonVideoParticapents);
    
    const textColor = useSelector(selectTextColor);

    const prefs = USER_PREFS.get(user._id);

    const username = useSelector(selectUsername);

    const secondaryColor = useSelector(selectSecondaryColor);

    return (
        <>
        <div 
        style={{
            
            backgroundColor: user.active ? activeColor : user.color ? user.color : accentColor,
            display: (hideNonVideoParticapents === true && user.webcam === false) || (hideNonVideoParticapents === true && prefs?.disabled_web_cam === true) ? 'none' : 'flex',
            
        }}
        id={user._id} className='active-user-container'>
            <div 
            onMouseEnter={() => {toggleHover(true)}}
            onMouseLeave={() => {toggleHover(false)}}
            style={{
                border: `solid 4px ${(user.active && user.microphone) ? activeColor : 'rgba(0, 0, 0, 0)'}`,
            }}
            className='user-stream-overlay-wrapper'>
               
                    <h3
                    style={{color: textColor, opacity: hover ? 1 : 0}}
                    >{user.display_name}</h3>
                
            </div>
            {user.user_banner?.includes('.gif') ?
            <Gif gifFrame={user.user_banner_gif_frame} key={user.user_banner + "stream-room-location"} objectFit='cover' borderRadius={0} posistion={'absolute'} gif={user.user_banner} alt_trigger={true} active={user.active} />
            : 
            <Image borderRadius={0} cursor='pointer' id="stream-room-user-banner" image_class={'user-image'} disableErr={true} backgroundColor={user.color || secondaryColor}  position='absolute' image={user.user_banner} />
            }
            <div style={{borderRadius: user.profile_picture_shape === 'square' ? '5px' : '50%', position: user.webcam && !prefs?.disabled_web_cam ? 'absolute' : null,
            width: user.webcam && !prefs?.disabled_web_cam ?  40 : null,
            height: user.webcam && !prefs?.disabled_web_cam ?  40 : null,
            left: user.webcam && !prefs?.disabled_web_cam ? 5 : null,
            top: user.webcam && !prefs?.disabled_web_cam ? 5 : null,
            zIndex: user.webcam && !prefs?.disabled_web_cam ? 2 : null,
            opacity: user.webcam && !prefs?.disabled_web_cam ? 0.7 : null,
            transition: '0.1s'
            }} className='active-user-profile-image-container'>
                {user.user_image?.includes('.gif') ?
                <Gif gifFrame={user.user_image_gif_frame} key={user.user_image + "stream-room-location"} alt_trigger={true} active={user.active} cursor='pointer' gif={user.user_image} objectFit='cover' borderRadius={(user.profile_picture_shape !== 'circle' && user.profile_picture_shape !== 'undefined') ? '5px' : '50%'} />
                :
                <Image cursor='pointer' image_class={'user-image'} objectFit='cover' image={user.user_image} borderRadius={(user.profile_picture_shape !== 'circle' && user.profile_picture_shape !== 'undefined') ? '5px' : '50%'} />
                }
                <Decoration width={156} height={156} decoration={user.decoration} />
            </div>
            <Loading  backgroundColor={user.color || 'black'} zIndex={1} show_success={false} loading={user.webcam && (user.username === username ? user.webcam : !prefs?.disabled_web_cam)} />
            <div 
            style={{backgroundColor: accentColor}}
            className='user-status-stream-wrapper'>
                <MicMuted display={user.microphone || user.microphone === undefined ? 'none' : null} />
                <Muted display={user.muted ? null : 'none'} />
                {user.webcam && prefs?.disabled_web_cam ? <DisabledWebCamIcon color={textColor} /> : null}
                {user.screenshare ? prefs?.disable_stream ? <DisabledStreamIcon color={textColor} /> : <ScreenShare /> : null}
            </div>
        </div>
        </>
    )
}
