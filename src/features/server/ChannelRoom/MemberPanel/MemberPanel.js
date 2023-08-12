import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectCurrentMemberPanel, setSelectedMember } from './MemberPanelSlice';

import "./MemberPanel.css";
import { selectAccentColor, selectGlassColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Image } from '../../../../components/Image/Image';
import { selectServerGroups, selectServerMembers, throwServerError } from '../../ServerSlice';
import { TextButton } from '../../../../components/buttons/textButton/TextButton';
import { selectProfileBio, selectProfileColor, selectProfilePinnedMessage, selectShowCaseScreenShotsState, selectUsername, selectUsersScreenShots } from '../../../settings/appSettings/accountSettings/accountSettingsSlice';
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
import { AltMessageIcon } from '../../../../components/Icons/AltMessageIcon/AltMessageIcon';
import { PokeButton } from '../../../../components/buttons/PokeButton/PokeButton';
import { TextInput } from '../../../../components/inputs/TextInput/TextInput';
import { ScreenShotShowCase } from '../../../../components/ScreenShotShowCase/ScreenShotShowCase';

export const MemberPanel = () => {

    const dispatch = useDispatch();

    const [loading, toggleLoading] = React.useState(false);

    const [poking, togglePoking] = React.useState(false);

    const [member, setMember] = React.useState({});

    const [bio, setBio] = React.useState("");

    const [color, setColor] = React.useState(false);

    const [message, setMessage] = React.useState({});

    const [timeStamp, setTimeStamp] = React.useState("");

    const [pokeMessage, setPokeMessage] = React.useState("Hey Wake Up");

    const [screenShots, setScreenShots] = React.useState([]);

    const userColor = useSelector(selectProfileColor);

    const selectedMember = useSelector(selectCurrentMemberPanel);

    const members = useSelector(selectServerMembers);

    const username = useSelector(selectUsername);
    
    const primaryColor = useSelector(selectPrimaryColor);

    const glassColor = useSelector(selectGlassColor);

    const textColor = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const serverGroups = useSelector(selectServerGroups);

    const showCaseScreenShots = useSelector(selectShowCaseScreenShotsState);

    const local_screenShots = useSelector(selectUsersScreenShots);

    const s_index = serverGroups.findIndex(s => s._id === member.server_group)

    const userbio = useSelector(selectProfileBio);

    const pinned_message = useSelector(selectProfilePinnedMessage);

    const accentColor = useSelector(selectAccentColor);

    const closePanel = (e) => {

        dispatch(setSelectedMember(""))
    }
    const poke = async () => {

        if (poking) return;

        togglePoking(true);

        await socket.request('poke', {member_id: member._id, message: pokeMessage, type: 'poke'})
        .catch(error => {
            dispatch(throwServerError({errorMessage: error}));
        });
        
        setTimeout(() => {

            togglePoking(false);
        
        }, 2000)
        
    }

    const handleOpenDirectMessage = () => {
        console.log(member)
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

               setScreenShots(local_screenShots);
                
            } else if (members[u_index]?.username) {

                if (members[u_index]?.color) setColor(members[u_index]?.color);

                setTimeStamp(GetTimeDifference(members[u_index]?.last_online))

                timeout = setTimeout(() => {
                    FetchMemberDetails(members[u_index]?.username)
                    .then(user => {
                        if (user.error) return dispatch(throwServerError({error: true, errorMessage: "Fatal Error Fetching Member Details"}))
                        
                        if (user.bio) setBio(user.bio);

                        setScreenShots(user.screenShots)
                        
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

            setScreenShots([]);
        }

    }, [selectedMember, members, pinned_message])
    
    const setCustomPokeMessage = (value) => {
        if (value.length > 100) return;

        setPokeMessage(value);
    }

    return (
        <>
        <AnimatePresence>
            {selectedMember ?
            <motion.div 
            key={'member-panel-' + member.username}
            initial={{top: '-100%'}}
            animate={{top: '0%'}}
            exit={{top: '100%'}}
            style={{backgroundColor: color || secondaryColor}} className='outer-member-panel-container'>
                <div onClick={closePanel} style={{backgroundColor: accentColor}} className='close-member-panel-button'>
                    <CloseIcon />
                </div>
                <div className='member-panel-banner-container'>    
                    <div className='inner-member-banner'>
                        <Image disableErr={true} imgHeight='calc(80%)' objectFit='cover' image={member.user_banner} />
                        <div style={{height: '20%', flexShrink: 0, width: '100%', boxShadow: `0 0 200px 200px ${color}`, position: 'absolute', bottom: 0}}></div>
                    </div>
                </div>
                <div 
                style={{backgroundColor: color || secondaryColor}}
                className='member-panel-container'>
                    <div className='member-panel-image-container'>
                        
                        <div style={{borderRadius: member.profile_picture_shape === 'square' ? '5px' : '50%'}} className='member-panel-profile-picture'>
                            <Image image={member.user_image} />
                        </div>
                    </div>
                    <div  className='member-panel-info-container'>
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
                            <TextInput action={setCustomPokeMessage} inputValue={pokeMessage} />
                            <PokeButton active_background={accentColor} description={poking ? 'On Timeout' : null} active={poking} action={poke} width={30} height={30} padding={5} margin={"0px 5px"} background={primaryColor} />
                            <TextButton action={handleOpenDirectMessage} name={"Send Message"} icon={<AltMessageIcon />} />
                        </div>
                        : null}
                        <div style={{backgroundColor: primaryColor}} className='server-user-details-wrapper-container'>
                            <h4 style={{color: textColor, marginBottom: 10}}>Status</h4>
                            <div className='member-panel-user-status-wrapper'>
                                {member?.status_icon ? 
                                <div className='member-panel-status-icon'>
                                    <Image  objectFit='contain' image={member?.status_icon} />
                                </div>
                                : null}
                                <p style={{color: textColor, margin: '0 0 0 5px'}}>{member?.status === 'offline' && timeStamp !== "" ? 'Last Online: ' + timeStamp : member.status}</p>
                            </div>
                            <h4 style={{color: textColor, margin: '10px 0'}}>Member Since</h4>
                            <p style={{color: textColor, margin: '0 0 0 5px'}}>{member?.join_date?.split('T')[0]}</p>
                            <h4 style={{color: textColor, margin: '10px 0'}}>Server Group</h4>
                            <p style={{color: textColor, margin: '0 0 0 5px'}}>{
                                s_index !== -1 ? serverGroups[s_index]?.server_group_name : null
                            }</p>
                        </div>
                        <UserBio loading={loading} bio={bio} margin={'5px 0px'} />
                        <ScreenShotShowCase marginTop={0} screenShots={screenShots} />
                        <PinnedProfileMessage loading={loading} message={message} />   
                    </div>
                </div>
            </motion.div>
            : null}
        </AnimatePresence>
        </>
    )
}
