import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { OfflineIcon } from '../../../../../components/Icons/OfflineIcon/OfflineIcon';
import { Image } from '../../../../../components/Image/Image';
import { selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { setPanelPosition, setSelectedMember } from '../../MemberPanel/MemberPanelSlice';

import "./UserStatus.css";

export const UserStatus = ({user}) => {

    const [preview, togglePreview] = React.useState(false);

    const [top, setTop] = React.useState(0);

    const textColor = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const dispatch  = useDispatch();

    const handleMouseEnter = (e, bool) => {
        try {
            document.getElementsByClassName(`${user._id}-user-name-status-wrapper`)[0].style.backgroundColor = bool ? primaryColor : null;

            const target = e.target.localName !== 'div' || e.target.className === "" ? e.target.offsetParent.className === "" ? e.target.offsetParent.offsetParent : e.target.offsetParent : e.target;
            
            const scroll_top = target.parentElement.scrollTop;

            const l_top = target.offsetTop === 0 ? 70 : target.offsetTop - 15;

            setTop(l_top - scroll_top);

            togglePreview(true);
        } catch (err) {
            return;
        }
    } 

    const handleMouseLeave = () => {

        document.getElementsByClassName(`${user._id}-user-name-status-wrapper`)[0].style.backgroundColor = user.user_banner ? `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0.8)` : null;
        
        togglePreview(false);
    }

    const openMemberPanel = (e) => {

        const target = e.target.localName !== 'div' || e.target.className === "" ? e.target.offsetParent.className === "" ? e.target.offsetParent.offsetParent : e.target.offsetParent : e.target;
        
        const scroll_top = target.parentElement.scrollTop;

        const l_top = target.offsetTop === 0 ? 70 : target.offsetTop + 25;
        
        dispatch(setSelectedMember(user._id));
        
        dispatch(setPanelPosition({y: l_top - scroll_top, x: e.pageX, origin: (e.view.innerHeight - e.pageY) < 500 ? true : false, left: null}));
    }
    
    return (
        <div onClick={openMemberPanel} onMouseEnter={(e) => {handleMouseEnter(e, true)}} onMouseLeave={(e) => {handleMouseLeave(e, false)}} className={`user-status-container ${user._id}-user-status-card status-${user.status}`}>
            {preview ?
            <div 
            style={{backgroundColor: primaryColor, top: origin ? top + 40 : top}}
            className='preview-user-status-shrinked'>
                <h3 style={{color: textColor}} >{user.display_name}</h3>
                <p style={{color: textColor}}>{user.status ? user.status : 'offline'}</p>
            </div>
            : null}
            <div
            className='user-status-image-container'>
                {(user.status && user.status !== 'offline') ?
                <Image cursor='pointer' image={user.user_image} />
                : 
                <OfflineIcon image={user.user_image} />
                }
            </div>
            <div 
            style={{
                backgroundColor:( user.user_banner ) ? `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0.8)` : null
            }}
            className={`user-name-status-wrapper ${user._id}-user-name-status-wrapper`}>
                <h3 style={{color: textColor}} >{user.display_name}</h3>
                <p style={{color: textColor}}>{user.status ? user.status : 'offline'}</p>
            </div>
            {(user.user_banner) ?
            <Image cursor='pointer' position='absolute' zIndex={0} image={user.user_banner} />
            : null}
        </div>
    )
}
