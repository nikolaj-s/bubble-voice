import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Image } from '../../../../../components/Image/Image';
import { selectPrimaryColor,selectSecondaryColor,selectTextColor, selectTransparentPrimaryColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { setPanelPosition, setSelectedMember } from '../../MemberPanel/MemberPanelSlice';

import "./UserStatus.css";
import { GetTimeDifference } from '../../../../../util/GetTimeDifference';
import { AwayIcon } from '../../../../../components/Icons/AwayIcon/AwayIcon';
import { UserTypingIndicator } from '../../../../../components/UserTypingIndicator/UserTypingIndicator';
import { Decoration } from '../../../../../components/Decoration/Decoration';
import { Gif } from '../../../../../components/Gif/Gif';

export const UserStatus = ({user}) => {

    const [preview, togglePreview] = React.useState(false);

    const [timeStamp, setTimeStamp] = React.useState(false);

    const [mouseDown, toggleMouseDown] = React.useState(false);

    React.useEffect(() => {
        
        setTimeStamp(GetTimeDifference(user?.last_online))
        console.log('process user')
    }, [user.status, user.last_online])

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const transparentColor = useSelector(selectTransparentPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const dispatch  = useDispatch();

    const handleMouseEnter = (e, bool) => {
      
        togglePreview(true);
        
    } 

    const handleMouseLeave = () => {

        togglePreview(false);
    }

    const openMemberPanel = (e) => {

        dispatch(setSelectedMember(user._id));
        
        dispatch(setPanelPosition({y: (e.view.innerHeight - 600) < 0 ? 30 : e.pageY, x: (e.view.innerWidth - e.pageX) < 350 ? (e.pageX - 350) : e.pageX, origin: e.view.innerHeight - 600 < 0 ? false : (e.view.innerHeight - e.pageY) < 500 ? true : false, left: null}));
    }
    
    return (
        <div 
        onMouseDown={() => {toggleMouseDown(true)}}
        onMouseUp={() => {toggleMouseDown(false)}}
        style={{
            backgroundColor: preview ? primaryColor : transparentColor,
            opacity: preview ? 1 : user?.status === 'offline' || !user?.status ? 0.6 : 1,
            transform: mouseDown ? "scale(0.95)" : "scale(1)"
        }}
        onClick={openMemberPanel} onMouseEnter={(e) => {handleMouseEnter(e, true)}} onMouseLeave={(e) => {handleMouseLeave(e, false); toggleMouseDown(false)}} className={`user-status-container ${user._id}-user-status-card status-${user.status}`}>
            <div
            style={{
                borderRadius: (user.profile_picture_shape !== 'circle' && user.profile_picture_shape !== 'undefined') ? '5px' : '50%',
                
                backgroundColor: (user?.color || primaryColor),
            }}
            className='user-status-image-container'>
                {user.user_image?.includes('.gif') ?
                <Gif 
                location="user-status-location"
                key={user.user_image + "user-status-location"}
                borderRadius={(user.profile_picture_shape !== 'circle' && user.profile_picture_shape !== 'undefined') ? '5px' : '50%'}
                objectFit='cover' gif={user.user_image} />
                :
                <Image 
                borderRadius={(user.profile_picture_shape !== 'circle' && user.profile_picture_shape !== 'undefined') ? '5px' : '50%'} disableErr={true}  image_class={"user-image"} cursor='pointer' image={user.user_image?.includes('gif') ? "" : user.user_image} />
                }
                <Decoration width={52} height={52} decoration={user.decoration} />
                {user.status === 'Away' || user.status === 'away' ?
                <div 
                
                className='away-status-overlay'>
                    <AwayIcon />
                </div>
                :
                user.status_icon && user?.status?.length > 1 ?
                <div 
                className='user-status-icon-container'>
                    <Image height='auto' imgHeight='auto' borderRadius={'5px'} objectFit='contain' disableErr={true} hideOnError={true} image={user.status_icon} />
                </div>
                : null}
            </div>
            <div 
            className={`user-name-status-wrapper ${user._id}-user-name-status-wrapper`}>
                <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                    <h3 style={{color: textColor,}} >{user.display_name}</h3>
                    {user?.channel_status && user?.status?.toLowerCase() !== 'offline' ? <UserTypingIndicator /> : null}
                </div>
                
                {user.status.toLowerCase() === 'online' || user.status.toLowerCase() === 'offline' ? null :
                <p style={{color: textColor}}>{user.status}</p>}
            </div>
            
        </div>
    )
}
