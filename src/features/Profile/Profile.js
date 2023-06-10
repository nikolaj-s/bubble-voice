import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCreatePostMenuOpen, selectProfileTabOpen, toggleCreatePostMenu } from './ProfileSlice'

import "./Profile.css";
import { selectPrimaryColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Image } from '../../components/Image/Image';
import { selectProfileBio, selectProfileColor, selectUserBanner, selectUserImage } from '../settings/appSettings/accountSettings/accountSettingsSlice';

import { UserStatusMenu } from '../../components/UserStatusMenu/UserStatusMenu';
import { UserBio } from '../../components/UserBio/UserBio';
import { selectServerId } from '../server/ServerSlice';
import { TextButton } from '../../components/buttons/textButton/TextButton';


export const Profile = () => {

    const dispatch = useDispatch();

    const visible = useSelector(selectProfileTabOpen);

    const profileColor = useSelector(selectProfileColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const userBanner = useSelector(selectUserBanner);

    const userImage = useSelector(selectUserImage);

    const bio = useSelector(selectProfileBio);

    const serverId = useSelector(selectServerId);

    return (
        <AnimatePresence>
            {visible ?
            <motion.div 
            initial={{opacity: 0, left: '-600px'}}
            animate={{opacity: 1, left: 55}}
            exit={{opacity: 0, left: '-600px'}}
            style={{backgroundColor: profileColor}}
            className='profile-tab-container'>
                <div style={{marginBottom: serverId ? null : 5}} className='profile-tab-picture-wrappper'>
                    <Image position='absolute' width='100%' image={userBanner} />
                    <div className='profile-picture-tab-container'>
                        <Image image={userImage} />
                    </div>
                    
                </div>
                {serverId ?
                <UserStatusMenu/>
                : null}
                <UserBio margin={'5px 0px 0px 0px'} bio={bio} />
            </motion.div>
            : null}
        </AnimatePresence>
    )
}
