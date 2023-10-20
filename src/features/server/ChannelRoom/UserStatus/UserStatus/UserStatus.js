import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Image } from '../../../../../components/Image/Image';
import { selectPrimaryColor,selectSecondaryColor,selectTextColor, selectTransparentPrimaryColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { setPanelPosition, setSelectedMember } from '../../MemberPanel/MemberPanelSlice';

import "./UserStatus.css";
import { GetTimeDifference } from '../../../../../util/GetTimeDifference';

export const UserStatus = ({user}) => {

    const [preview, togglePreview] = React.useState(false);

    const [timeStamp, setTimeStamp] = React.useState(false);

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
        style={{backgroundColor: preview ? primaryColor : transparentColor, opacity: preview ? 1 : user?.status === 'offline' || !user?.status ? 0.6 : 1,}}
        onClick={openMemberPanel} onMouseEnter={(e) => {handleMouseEnter(e, true)}} onMouseLeave={(e) => {handleMouseLeave(e, false)}} className={`user-status-container ${user._id}-user-status-card status-${user.status}`}>
            <div style={{
                width: 3,
                height: '100%',
                flexShrink: 0,
                backgroundColor: (user.color || primaryColor)
            }}></div>
            <div
            style={{
                borderRadius: (user.profile_picture_shape !== 'circle' && user.profile_picture_shape !== 'undefined') ? '5px' : '50%',
                
                backgroundColor: (user?.color || primaryColor),
            }}
            className='user-status-image-container'>
                <Image hideOnError={true} image_class={"user-image"} cursor='pointer' image={user.user_image?.includes('gif') ? "" : user.user_image} />
            </div>
            {user.status_icon && user?.status?.length > 1 ?
            <div 
            style={{backgroundColor: secondaryColor}}
            className='user-status-icon-container'>
                <Image hideOnError={true} image={user.status_icon} />
            </div>
            : null}
            <div 
            className={`user-name-status-wrapper ${user._id}-user-name-status-wrapper`}>
                <h3 style={{color: textColor,}} >{user.display_name}</h3>
                <p style={{color: textColor}}>{(user.status === 'offline' && timeStamp !== "") ? "Last Online: " + timeStamp : user.status ? user.status : 'offline'}</p>
            </div>
        </div>
    )
}
