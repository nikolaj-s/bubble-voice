import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectCurrentMemberPanel, selectPanelLeftPos, setSelectedMember } from './MemberPanelSlice';

import "./MemberPanel.css";
import { selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Image } from '../../../../components/Image/Image';
import { selectServerGroups, selectServerMembers, throwServerError } from '../../ServerSlice';
import { TextButton } from '../../../../components/buttons/textButton/TextButton';
import { selectProfileBio, selectUsername } from '../../../settings/appSettings/accountSettings/accountSettingsSlice';
import { Loading } from '../../../../components/LoadingComponents/Loading/Loading';
import { socket } from '../../ServerBar/ServerBar';
import { ScoreButton } from '../../../../components/buttons/ScoreButton/ScoreButton';
import { openDirectMessage } from '../../../Messages/MessagesSlice';
import { UserBio } from '../../../../components/UserBio/UserBio';
import { FetchMemberDetails } from '../../../../util/FetchMemberDetails';

export const MemberPanel = () => {

    const dispatch = useDispatch();

    const [loading, toggleLoading] = React.useState(false);

    const [member, setMember] = React.useState({});

    const [bio, setBio] = React.useState("");

    const selectedMember = useSelector(selectCurrentMemberPanel);

    const members = useSelector(selectServerMembers);

    const username = useSelector(selectUsername);
    
    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const serverGroups = useSelector(selectServerGroups);

    const s_index = serverGroups.findIndex(s => s._id === member.server_group)

    const leftPost = useSelector(selectPanelLeftPos);

    const userbio = useSelector(selectProfileBio);

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

    const handleOpenDirectMessage = () => {
        
        dispatch(openDirectMessage(member));

        dispatch(setSelectedMember(""));
    }

    React.useEffect(() => {

        toggleLoading(true);

        if (selectedMember) {
            const u_index = members.findIndex(u => (u._id === selectedMember || u.username === selectedMember));

            if (u_index === -1) return;

            setMember(members[u_index]);

            if (members[u_index].username === username) {
                setBio(userbio);

                toggleLoading(false);
            } else if (members[u_index]?.username) {

                FetchMemberDetails(members[u_index]?.username)
                .then(user => {
                    if (user.error) return dispatch(throwServerError({error: true, errorMessage: "Fatal Error Fetching Member Details"}))
                    
                    if (user.bio) setBio(user.bio);
                    
                    toggleLoading(false);
                })

            }
        }

       

        return () => {
            setBio("");

            setMember({});
        }

    }, [selectedMember, members])
    
    return (
        <>
        {selectedMember ?
        <div onClick={closePanel} className='outer-member-panel-container'>
            <div 
            style={{backgroundColor: primaryColor, left: leftPost}}
            className='member-panel-container'>
                <div className='member-panel-image-container'>
                    <Image position='absolute' image={member.user_banner} />
                    <div style={{borderRadius: member.profile_picture_shape === 'square' ? '5px' : '50%'}} className='member-panel-profile-picture'>
                        <Image image={member.user_image} />
                    </div>
                </div>
                <div style={{backgroundColor: secondaryColor}} className='member-panel-info-container'>
                    <div>
                        <h3 style={{color: textColor}}>{member.display_name}</h3>
                        <h4 style={{color: textColor, opacity: 0.8}}>#{member.username}</h4>
                        <div className='member-score-container'>
                            <ScoreButton description={"Server Score"} padding={3} width={15} height={15}  />
                            <p style={{color: textColor}}>{member.server_score}</p>
                        </div>
                    </div>
                    
                    <div style={{height: 2, width: '100%', backgroundColor: textColor, margin: '15px 0', flexShrink: 0}}></div>
                    <div className='member-panel-button-wrapper'>
                        {member.username !== username && member.status !== 'offline' ? <TextButton action={poke} name={"Poke"} /> : null}
                        {member.username !== username && member.status !== 'offline' ? <TextButton action={handleOpenDirectMessage} name={"Send Message"} /> : null}
                    </div>
                    <h3 style={{color: textColor, marginBottom: 10, fontSize: '1.4rem'}}>Status</h3>
                    <p style={{color: textColor, margin: '0 0 0 5px'}}>{member?.status}</p>
           
                    <h3 style={{color: textColor, margin: '10px 0', fontSize: '1.4rem'}}>Member Since</h3>
                    <p style={{color: textColor, margin: '0 0 0 5px'}}>{member?.join_date?.split('T')[0]}</p>
                    <h3 style={{color: textColor, margin: '10px 0', fontSize: '1.4rem'}}>Server Group</h3>
                    <p style={{color: textColor, margin: '0 0 0 5px'}}>{
                        s_index !== -1 ? serverGroups[s_index]?.server_group_name : null
                    }</p>
                    
                    {bio.length > 0 ? <h3 style={{color: textColor, margin: '10px 0', fontSize: '1.4rem'}}>Bio</h3> : null}
                    <UserBio bio={bio} margin={'5px 0px'} />
                   
                </div>
                <Loading loading={loading} />
            </div>
        </div>
        : null}
        </>
    )
}
