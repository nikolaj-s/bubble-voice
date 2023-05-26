import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectCurrentMemberPanel, selectPanelLeftPos, setSelectedMember } from './MemberPanelSlice';

import "./MemberPanel.css";
import { selectGlassColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Image } from '../../../../components/Image/Image';
import { selectServerGroups, selectServerMembers, throwServerError } from '../../ServerSlice';
import { TextButton } from '../../../../components/buttons/textButton/TextButton';
import { selectProfileBio, selectProfileColor, selectUsername } from '../../../settings/appSettings/accountSettings/accountSettingsSlice';
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

    const [color, setColor] = React.useState(false);

    const [transparentColor, setTransparentColor] = React.useState(false);

    const userColor = useSelector(selectProfileColor);

    const selectedMember = useSelector(selectCurrentMemberPanel);

    const members = useSelector(selectServerMembers);

    const username = useSelector(selectUsername);
    
    const primaryColor = useSelector(selectPrimaryColor);

    const glassColor = useSelector(selectGlassColor);

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

                setColor(userColor);
                
                setTransparentColor(userColor.split('1)')[0] + '0.5)');
            } else if (members[u_index]?.username) {

                FetchMemberDetails(members[u_index]?.username)
                .then(user => {
                    if (user.error) return dispatch(throwServerError({error: true, errorMessage: "Fatal Error Fetching Member Details"}))
                    
                    if (user.bio) setBio(user.bio);

                    if (user.color) setColor(user.color);

                    if (user.color) setTransparentColor(user.color.split('1)')[0] + '0.5)');
                    
                    toggleLoading(false);
                })

            }
        }

       

        return () => {
            setBio("");

            setColor(false);

            setMember({});

            setTransparentColor(false);
        }

    }, [selectedMember, members])
    
    return (
        <>
        {selectedMember ?
        <div style={{backgroundColor: transparentColor || glassColor}} onClick={closePanel} className='outer-member-panel-container'>
            <div 
            style={{backgroundColor: primaryColor, left: leftPost}}
            className='member-panel-container'>
                <div className='member-panel-image-container'>
                    <Image disableErr={true} position='absolute' image={member.user_banner} />
                    <div style={{borderRadius: member.profile_picture_shape === 'square' ? '5px' : '50%'}} className='member-panel-profile-picture'>
                        <Image image={member.user_image} />
                    </div>
                </div>
                <div style={{backgroundColor: color ? color : secondaryColor}} className='member-panel-info-container'>
                    <div style={{backgroundColor: primaryColor}} className='username-wrapper-container'>
                        <h3 style={{color: textColor}}>{member.display_name}</h3>
                        <h4 style={{color: textColor, opacity: 0.8}}>#{member.username}</h4>
                        <div className='member-score-container'>
                            <ScoreButton description={"Server Score"} padding={3} width={15} height={15}  />
                            <p style={{color: textColor}}>{member.server_score}</p>
                        </div>
                    </div>
                    {member.username !== username && member.status !== 'offline' ? 
                    <div className='member-panel-button-wrapper'>
                        <TextButton id={'member-panel-poke-button'} action={poke} name={"Poke"} /> 
                        <TextButton action={handleOpenDirectMessage} name={"Send Message"} />
                    </div>
                    : null}
                    <div style={{backgroundColor: primaryColor}} className='server-user-details-wrapper-container'>
                        <h3 style={{color: textColor, marginBottom: 10, fontSize: '1.4rem'}}>Status</h3>
                        <p style={{color: textColor, margin: '0 0 0 5px'}}>{member?.status}</p>
            
                        <h3 style={{color: textColor, margin: '10px 0', fontSize: '1.4rem'}}>Member Since</h3>
                        <p style={{color: textColor, margin: '0 0 0 5px'}}>{member?.join_date?.split('T')[0]}</p>
                        <h3 style={{color: textColor, margin: '10px 0', fontSize: '1.4rem'}}>Server Group</h3>
                        <p style={{color: textColor, margin: '0 0 0 5px'}}>{
                            s_index !== -1 ? serverGroups[s_index]?.server_group_name : null
                        }</p>
                    </div>
                    <UserBio bio={bio} margin={'5px 0px'} />
                   
                </div>
                <Loading loading={loading} />
            </div>
        </div>
        : null}
        </>
    )
}
