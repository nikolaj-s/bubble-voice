import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectCurrentMemberPanel, selectPanelLeftPos, selectPanelOrigin, selectPanelPositionX, selectPanelPositionY, setSelectedMember } from './MemberPanelSlice';

import "./MemberPanel.css";
import { selectPrimaryColor, selectSecondaryColor, selectTextColor, selectTransparentPrimaryColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Image } from '../../../../components/Image/Image';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { selectServerGroups, selectServerMembers, throwServerError } from '../../ServerSlice';
import { TextButton } from '../../../../components/buttons/textButton/TextButton';
import { selectUsername } from '../../../settings/appSettings/accountSettings/accountSettingsSlice';
import { Loading } from '../../../../components/LoadingComponents/Loading/Loading';
import { socket } from '../../ServerBar/ServerBar';

export const MemberPanel = () => {

    const dispatch = useDispatch();

    const [loading, toggleLoading] = React.useState(false);

    const [member, setMember] = React.useState({});

    const selectedMember = useSelector(selectCurrentMemberPanel);

    const members = useSelector(selectServerMembers);

    const username = useSelector(selectUsername);
    
    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const serverGroups = useSelector(selectServerGroups);

    const s_index = serverGroups.findIndex(s => s._id === selectedMember.server_group)

    const transparentColor = useSelector(selectTransparentPrimaryColor);

    const positionY = useSelector(selectPanelPositionY);

    const origin = useSelector(selectPanelOrigin);

    const positionX = useSelector(selectPanelPositionX);

    const leftPost = useSelector(selectPanelLeftPos);

    const closePanel = (e) => {

        if (e.target.className !== 'outer-member-panel-container') return;

        dispatch(setSelectedMember(""))
    }
    const poke = async () => {

        if (loading) return;

        toggleLoading(true);

        await socket.request('poke', {member_id: member._id})
        .catch(error => {
            dispatch(throwServerError({errorMessage: error}));
        })

        toggleLoading(false);
    }

    React.useEffect(() => {

        if (selectedMember) {
            const u_index = members.findIndex(u => (u._id === selectedMember || u.username === selectedMember));

            if (u_index === -1) return;

            setMember(members[u_index]);
        }

    }, [selectedMember, members])
    
    return (
        <>
        {selectedMember ?
        <div onClick={closePanel} className='outer-member-panel-container'>
            <div 
            style={{backgroundColor: primaryColor, top: origin ? positionY + 70 : positionY, transform: `translateY(${origin ? '-100%' :  '0%'})`, left: leftPost}}
            className='member-panel-container'>
                <div className='member-panel-image-container'>
                    <Image position='absolute' image={member.user_banner} />
                    <div className='member-panel-profile-picture'>
                        <Image image={member.user_image} />
                    </div>
                </div>
                <div style={{backgroundColor: secondaryColor}} className='member-panel-info-container'>
                    <div>
                        <h3 style={{color: textColor}}>{member.display_name}</h3>
                        <h4 style={{color: textColor, opacity: 0.8}}>#{member.username}</h4>
                    </div>
                    <div style={{height: 2, width: '100%', backgroundColor: textColor, margin: '15px 0'}}></div>
                    <h3 style={{color: textColor, marginBottom: 10, fontSize: '1.4rem'}}>Status</h3>
                    <p style={{color: textColor, margin: '0 0 0 5px'}}>{member?.status}</p>
           
                    <h3 style={{color: textColor, margin: '10px 0', fontSize: '1.4rem'}}>Member Since</h3>
                    <p style={{color: textColor, margin: '0 0 0 5px'}}>{member?.join_date?.split('T')[0]}</p>
                    <h3 style={{color: textColor, margin: '10px 0', fontSize: '1.4rem'}}>Server Group</h3>
                    <p style={{color: textColor, margin: '0 0 0 5px'}}>{
                        s_index !== -1 ? serverGroups[s_index]?.server_group_name : null
                    }</p>
                    {member.username !== username && member.status !== 'offline' ? <TextButton action={poke} marginTop={15} name={"Poke"} /> : null}
                </div>
                <Loading loading={loading} />
            </div>
        </div>
        : null}
        </>
    )
}
