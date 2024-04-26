import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCreatePostMenuOpen, selectProfileTabOpen, toggleCreatePostMenu, toggleProfileTab } from './ProfileSlice'

import "./Profile.css";
import { selectPrimaryColor, selectSecondaryColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Image } from '../../components/Image/Image';
import { selectCurrentDecoration, selectProfileBio, selectProfileColor, selectProfilePictureShape, selectProfilePinnedMessage, selectUserBanner, selectUserImage, selectUsersScreenShots } from '../settings/appSettings/accountSettings/accountSettingsSlice';

import { UserStatusMenu } from '../../components/UserStatusMenu/UserStatusMenu';
import { UserBio } from '../../components/UserBio/UserBio';
import { selectServerId } from '../server/ServerSlice';
import {PinnedProfileMessage } from '../../components/PinnedProfileMessage/PinnedProfileMessage';
import { ScreenShotShowCase } from '../../components/ScreenShotShowCase/ScreenShotShowCase';
import { Decoration } from '../../components/Decoration/Decoration';

export const Profile = () => {

    const dispatch = useDispatch();

    const visible = useSelector(selectProfileTabOpen);

    const profileColor = useSelector(selectProfileColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const pinnedMessage = useSelector(selectProfilePinnedMessage);

    const profileShape = useSelector(selectProfilePictureShape);

    const userBanner = useSelector(selectUserBanner);

    const userImage = useSelector(selectUserImage);

    const bio = useSelector(selectProfileBio);

    const serverId = useSelector(selectServerId);

    const usersScreenShots = useSelector(selectUsersScreenShots);

    const decoration = useSelector(selectCurrentDecoration);

    const close = () => {
        dispatch(toggleProfileTab(false))
    }

    return (
        <AnimatePresence>
            {visible ?
            <div onClick={close} className='profile-tab-outer-container'>
                <motion.div 
                onClick={(e) => {e.stopPropagation()}}
                initial={{opacity: 0,}}
                animate={{opacity: 1,}}
                exit={{opacity: 0,}}
                transition={{duration: 0.1}}
                style={{backgroundColor: (profileColor || secondaryColor), border: `solid 4px ${(profileColor || secondaryColor)}`}}
                className='profile-tab-container'>
                    <div style={{marginBottom: serverId ? null : 5}} className='profile-tab-picture-wrappper'>
                        <Image position='absolute' width='100%' image={userBanner} />
                        <div className='profile-picture-tab-container'>
                            <Image borderRadius={profileShape === 'square' ? '5px' : '50%'} image={userImage} />
                            <Decoration decoration={decoration} width={85} height={85} />
                        </div>
                        
                    </div>
                    {serverId ?
                    <UserStatusMenu/>
                    : null}
                    <UserBio margin={'5px 0px 5px 0px'} bio={bio} />
                    <ScreenShotShowCase marginTop={0} screenShots={usersScreenShots} />
                    <PinnedProfileMessage margin={'0px 0px'} message={pinnedMessage} />
                </motion.div>
            </div>
            : null}
        </AnimatePresence>
    )
}
