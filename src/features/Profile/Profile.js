import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCreatePostMenuOpen, selectProfileTabOpen, toggleCreatePostMenu } from './ProfileSlice'

import "./Profile.css";
import { selectGlassColor, selectGlassState, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Image } from '../../components/Image/Image';
import { selectProfileBio, selectProfileColor, selectUserBanner, selectUserImage } from '../settings/appSettings/accountSettings/accountSettingsSlice';
import { AddButton } from '../../components/buttons/AddButton/AddButton';
import { StatusButton } from '../../components/buttons/StatusButton/StatusButton';
import { UserStatusMenu } from '../../components/UserStatusMenu/UserStatusMenu';
import { UserBio } from '../../components/UserBio/UserBio';


export const Profile = () => {

    const dispatch = useDispatch();

    const [changeStatusMenu, toggleChangeStatusMenu] = React.useState(false);

    const createPostMenuOpen = useSelector(selectCreatePostMenuOpen);

    const visible = useSelector(selectProfileTabOpen);

    const textColor = useSelector(selectTextColor);

    const profileColor = useSelector(selectProfileColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const glassState = useSelector(selectGlassState);

    const glassColor = useSelector(selectGlassColor);

    const userBanner = useSelector(selectUserBanner);

    const userImage = useSelector(selectUserImage);

    const bio = useSelector(selectProfileBio);

    const handleToggleCreatePostMenu = () => {
        dispatch(toggleCreatePostMenu(!createPostMenuOpen));
    } 

    const handleToggleChangeStatusMenu = () => {
        toggleChangeStatusMenu(!changeStatusMenu);
    }

    return (
        <AnimatePresence>
            {visible ?
            <motion.div 
            initial={{opacity: 0, left: '-600px'}}
            animate={{opacity: 1, left: 55}}
            exit={{opacity: 0, left: '-600px'}}
            style={{backgroundColor: profileColor}}
            className='profile-tab-container'>
                <div className='profile-tab-picture-wrappper'>
                    <Image position='absolute' width='100%' image={userBanner} />
                    <div className='profile-picture-tab-container'>
                        <Image image={userImage} />
                    </div>
                    
                </div>
                <div style={{backgroundColor: primaryColor}} className='profile-nav-bar'>
                    <StatusButton action={handleToggleChangeStatusMenu} width={20} height={20} description={"Change Status"} />
                {//   <AddButton  width={20} height={20} description={'Add Post'} margin={'0px 5px'} /> 
                }
                </div>
                <UserBio bio={bio} />
                <>
                {changeStatusMenu ? <UserStatusMenu close={() => {toggleChangeStatusMenu(false)}} /> : null}
                </>
            </motion.div>
            : null}
        </AnimatePresence>
    )
}
