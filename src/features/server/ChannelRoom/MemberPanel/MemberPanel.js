import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectCurrentMemberPanel, setSelectedMember } from './MemberPanelSlice';

import "./MemberPanel.css";
import { selectGlassColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Image } from '../../../../components/Image/Image';
import { selectServerGroups, selectServerMembers, throwServerError } from '../../ServerSlice';
import { TextButton } from '../../../../components/buttons/textButton/TextButton';
import { selectProfileBio, selectProfileColor, selectProfilePinnedMessage, selectUsername } from '../../../settings/appSettings/accountSettings/accountSettingsSlice';
import { Loading } from '../../../../components/LoadingComponents/Loading/Loading';
import { socket } from '../../ServerBar/ServerBar';
import { ScoreButton } from '../../../../components/buttons/ScoreButton/ScoreButton';
import { openDirectMessage } from '../../../Messages/MessagesSlice';
import { UserBio } from '../../../../components/UserBio/UserBio';
import { FetchMemberDetails } from '../../../../util/FetchMemberDetails';
import { CloseIcon } from '../../../../components/Icons/CloseIcon/CloseIcon';
import { AnimatePresence, motion } from 'framer-motion';
import { PinnedProfileMessage } from '../../../../components/PinnedProfileMessage/PinnedProfileMessage';
import { GetTimeDifference } from '../../../../util/GetTimeDifference';
import { PokeIcon } from '../../../../components/Icons/PokeIcon/PokeIcon';
import { SocialIcon } from '../../../../components/Icons/SocialIcon/SocialIcon'

export const MemberPanel = () => {

    const dispatch = useDispatch();

    const [loading, toggleLoading] = React.useState(false);

    const [member, setMember] = React.useState({});

    const [bio, setBio] = React.useState("");

    const [color, setColor] = React.useState(false);

    const [message, setMessage] = React.useState({});

    const [timeStamp, setTimeStamp] = React.useState("");

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

    const userbio = useSelector(selectProfileBio);

    const pinned_message = useSelector(selectProfilePinnedMessage);

    const closePanel = (e) => {

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

    let timeout;

    React.useEffect(() => {

        clearTimeout(timeout);

        toggleLoading(true);

        if (selectedMember) {
            const u_index = members.findIndex(u => (u._id === selectedMember || u.username === selectedMember));

            if (u_index === -1) return;

            setMember(members[u_index]);

            if (members[u_index].username === username) {
                setBio(userbio);

                toggleLoading(false);

                setColor(userColor);

                setMessage(pinned_message);
                
            } else if (members[u_index]?.username) {

                if (members[u_index]?.color) setColor(members[u_index]?.color);

                setTimeStamp(GetTimeDifference(members[u_index]?.last_online))

                timeout = setTimeout(() => {
                    FetchMemberDetails(members[u_index]?.username)
                    .then(user => {
                        if (user.error) return dispatch(throwServerError({error: true, errorMessage: "Fatal Error Fetching Member Details"}))
                        
                        if (user.bio) setBio(user.bio);

                        
                        
                        if (user.pinned_message) setMessage(user.pinned_message);

                        toggleLoading(false);
                    })
                }, 600)

            }
        }

       

        return () => {

            clearTimeout(timeout);

            setBio("");

            setColor(false);

            setMember({});

            setMessage({});
        }

    }, [selectedMember, members, pinned_message])
    
    return (
        <>
        <AnimatePresence>
            {selectedMember ?
            <motion.div 
            key={'member-panel-' + member.username}
            initial={{top: '-100%'}}
            animate={{top: '0%'}}
            exit={{top: '100%'}}
            style={{backgroundColor: primaryColor}} onClick={closePanel} className='outer-member-panel-container'>
                <div onClick={closePanel} className='close-member-panel-button'>
                    <CloseIcon />
                </div>
                <div 
                onClick={(e) => {e.stopPropagation()}}
                style={{backgroundColor: primaryColor}}
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
                            <TextButton id={'member-panel-poke-button'} action={poke} name={"Poke"} icon={<PokeIcon />} /> 
                            <TextButton action={handleOpenDirectMessage} name={"Send Message"} icon={<SocialIcon />} />
                        </div>
                        : null}
                        <div style={{backgroundColor: primaryColor}} className='server-user-details-wrapper-container'>
                            <h3 style={{color: textColor, marginBottom: 10}}>Status</h3>
                            <p style={{color: textColor, margin: '0 0 0 5px'}}>{member?.status === 'offline' && timeStamp !== "" ? 'Last Online: ' + timeStamp : member.status}</p>
                
                            <h3 style={{color: textColor, margin: '10px 0'}}>Member Since</h3>
                            <p style={{color: textColor, margin: '0 0 0 5px'}}>{member?.join_date?.split('T')[0]}</p>
                            <h3 style={{color: textColor, margin: '10px 0'}}>Server Group</h3>
                            <p style={{color: textColor, margin: '0 0 0 5px'}}>{
                                s_index !== -1 ? serverGroups[s_index]?.server_group_name : null
                            }</p>
                        </div>
                        <UserBio loading={loading} bio={bio} margin={'5px 0px'} />
                        <PinnedProfileMessage loading={loading} message={message} />   
                    </div>
                </div>
            </motion.div>
            : null}
        </AnimatePresence>
        </>
    )
}
